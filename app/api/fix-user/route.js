import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET() {

  const oldUserId =
    "066a1ed0-9577-429d-83c5-4a8b59f4f059";

  const newUserId =
    "user_3DqsCQ9ymVidVVlgVakn1VWxvfb";

  await db.transaction.updateMany({
    where: {
      userId: oldUserId,
    },
    data: {
      userId: newUserId,
    },
  });

  await db.account.updateMany({
    where: {
      userId: oldUserId,
    },
    data: {
      userId: newUserId,
    },
  });

  return NextResponse.json({
    success: true,
  });
}