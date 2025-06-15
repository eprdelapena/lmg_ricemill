import { NextResponse } from "next/server";
import {
  TParamsPostOrderUser,
  TParamsPostProduct,
  TUserSession,
} from "@/schema/main_schema";
import client from "@/api/api_main";
import { EAPIStatusCodes } from "@/enum/main_enum";
import authOptions from "@/utils/next_auth";
import { getServerSession } from "next-auth";
import { getRequestConfig } from "@/utils/main_utils";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw new Error();
    }

    const config = getRequestConfig({
      session: (session as unknown as { user: TUserSession }).user.token,
    });

    const body: TParamsPostProduct = await req.json();
    // console.log('body', body)
    const response = await client.mainPostProduct(body, config);

    return NextResponse.json(response?.data, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { status: EAPIStatusCodes.servererror, message: e.message },
      { status: EAPIStatusCodes.servererror },
    );
  }
}
