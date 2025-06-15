import { NextResponse } from "next/server";
import { TParamsLogin } from "@/schema/main_schema";
import client from "@/api/api_main";
import { EAPIStatusCodes } from "@/enum/main_enum";

export async function POST(req: Request) {
  try {
    const body: TParamsLogin = await req.json();
    const response = await client.mainLogin(body);

    return NextResponse.json(response?.data, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { status: EAPIStatusCodes.servererror, message: e.message },
      { status: EAPIStatusCodes.servererror },
    );
  }
}
