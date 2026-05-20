"use server";

import { db } from "@/lib/prisma";
import { groq } from "@/lib/groq";

export async function generateAIInsights(userId) {

  console.log("USER ID:", userId);

  // DEBUG: check all transactions
  const allTransactions = await db.transaction.findMany();

  console.log("ALL TRANSACTIONS:", allTransactions);

  // TEMP FIX: fetch all transactions
  const transactions = await db.transaction.findMany({
    orderBy: {
      date: "desc",
    },
  });

  console.log("FILTERED TRANSACTIONS:", transactions);

  const formattedTransactions = transactions.map((t) => ({
    type: t.type,
    amount: Number(t.amount),
    category: t.category,
    description: t.description,
    date: t.date,
  }));

  // Handle empty transactions
  if (formattedTransactions.length === 0) {
    return `
No transactions found.

Add some income and expense transactions to get AI insights.
    `;
  }

  const prompt = `
You are a smart finance AI assistant.

Analyze the user's transactions and provide:

1. Financial Overview
2. Top Expenses
3. Saving Tips
4. Important Alerts

Rules:
- Keep response short
- Use simple English
- Make it easy to read
- Use bullet points
- Use very few emojis
- Avoid long paragraphs
- Avoid too many numbers
- Give practical advice

Example Format:

📊 Financial Overview

• Income looks stable
• Food spending is slightly high
• Shopping expenses increased recently

💸 Top Expenses

• Food & Groceries
• Shopping
• Healthcare

💡 Saving Tips

• Reduce unnecessary shopping
• Set a monthly food budget
• Try saving 20% of income

🚨 Important Alerts
 
• Healthcare spending was unusually high

Transactions:
${JSON.stringify(formattedTransactions)}
`;

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  return completion.choices[0].message.content;
}