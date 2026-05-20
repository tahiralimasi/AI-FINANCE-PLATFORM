"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Groq from "groq-sdk";
import Tesseract from "tesseract.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const serializeAmount = (obj) => ({
  ...obj,
  amount: Number(obj.amount),
});

// CREATE TRANSACTION
export async function createTransaction(data) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    console.log("CLERK USER ID:", userId);
    console.log("DATABASE USER ID:", user.id);

    const transaction =
      await db.transaction.create({
        data: {
          ...data,
          userId: user.id,
        },
      });

    console.log(
      "CREATED TRANSACTION:",
      transaction
    );

    revalidatePath("/dashboard");

    return {
      success: true,
      data: serializeAmount(transaction),
    };
  } catch (error) {
    console.error(error);

    throw new Error(error.message);
  }
}

// UPDATE TRANSACTION
export async function updateTransaction(
  id,
  data
) {
  try {
    const transaction =
      await db.transaction.update({
        where: {
          id,
        },
        data,
      });

    revalidatePath("/dashboard");

    return {
      success: true,
      data: serializeAmount(transaction),
    };
  } catch (error) {
    console.error(error);

    throw new Error(error.message);
  }
}

// GET TRANSACTION
export async function getTransaction(id) {
  try {
    const transaction =
      await db.transaction.findUnique({
        where: {
          id,
        },
      });

    if (!transaction) {
      throw new Error(
        "Transaction not found"
      );
    }

    return serializeAmount(transaction);
  } catch (error) {
    console.error(error);

    throw new Error(error.message);
  }
}

// GET USER TRANSACTIONS
export async function getUserTransactions() {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const transactions =
      await db.transaction.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          date: "desc",
        },
      });

    return {
      success: true,
      data: transactions,
    };
  } catch (error) {
    console.error(error);

    throw new Error(error.message);
  }
}

// SCAN RECEIPT
export async function scanReceipt(file) {
  try {
    // OCR USING TESSERACT
    const {
      data: { text },
    } = await Tesseract.recognize(
      file,
      "eng"
    );

    console.log("OCR TEXT:", text);

    if (!text || text.trim() === "") {
      throw new Error(
        "No text found in receipt"
      );
    }

    // GROQ PARSING
    const completion =
      await groq.chat.completions.create({
        model: "llama3-70b-8192",

        messages: [
          {
            role: "system",

            content: `
Extract ONLY the TOTAL amount from the receipt.

Return ONLY valid JSON in this exact format:

{
  "amount": number
}
`,
          },

          {
            role: "user",
            content: text,
          },
        ],

        temperature: 0,
      });

    const result =
      completion.choices[0]?.message
        ?.content;

    console.log(
      "GROQ RESULT:",
      result
    );

    if (!result) {
      throw new Error(
        "No response from GROQ"
      );
    }

    const cleanedText = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let data = {};

    try {
      data = JSON.parse(cleanedText);
    } catch (err) {
      console.error(
        "JSON Parse Error:",
        cleanedText
      );

      throw new Error(
        "Invalid JSON from GROQ"
      );
    }

    // IMPORTANT:
    // Frontend expects all fields
    return {
      amount:
        parseFloat(data.amount) || 0,

      date: new Date(),

      description: "",

      category: "other-expense",

      merchantName: "",
    };
  } catch (error) {
    console.error(
      "Receipt Scan Error:",
      error
    );

    throw new Error(
      error.message ||
        "Failed to scan receipt"
    );
  }
}