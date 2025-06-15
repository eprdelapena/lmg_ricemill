import { NextResponse } from "next/server";
import { TUserSession } from "@/schema/main_schema";
import client from "@/api/api_main";
import { EAPIStatusCodes } from "@/enum/main_enum";
import authOptions from "@/utils/next_auth";
import { getServerSession } from "next-auth";
import { getRequestConfig } from "@/utils/main_utils";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw new Error();
    }

    const config = getRequestConfig({
      session: (session as unknown as { user: TUserSession }).user.token,
    });

    const response: any = await client.mainDownloadProductTable(config);
    const csvData = response.data;

    return new Response(csvData, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="listing.csv"',
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { status: EAPIStatusCodes.servererror, message: e.message },
      { status: EAPIStatusCodes.servererror },
    );
  }
}
