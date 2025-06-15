import { NextResponse } from "next/server";
import { TParamsRegister } from "@/schema/main_schema";
import client from "@/api/api_main";
import { EAPIStatusCodes } from "@/enum/main_enum";
import authOptions from "@/utils/next_auth";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw new Error();
    }

    const currentHeader = {
      headers: {
        "admin-key": `12345`,
        "Content-Type": "application/json",
      },
    };

    const body: TParamsRegister = await req.json();
    const response = await client.mainRegister(body, currentHeader);

    return NextResponse.json(response?.data, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { status: EAPIStatusCodes.servererror, message: e.message },
      { status: EAPIStatusCodes.servererror },
    );
  }
}
