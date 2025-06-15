import { NextResponse } from "next/server";
import {
  TParamsOrderGenerateBarcode,
  TUserSession,
} from "@/schema/main_schema";
import { EAPIStatusCodes, EParamsDefault } from "@/enum/main_enum";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/next_auth";
import { getRequestConfig } from "@/utils/main_utils";

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  return Buffer.from(buffer).toString("base64"); // Convert buffer to base64 using Node.js Buffer
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw new Error();
    }

    const config = getRequestConfig({
      session: (session as unknown as { user: TUserSession }).user.token,
    });

    const body: TParamsOrderGenerateBarcode = await req.json();

    const apiResponse = await fetch(
      `${EParamsDefault.IPAddress}:3001/v9/order_item_generate_barcode`,
      {
        method: "POST",
        headers: {
          Authorization: `${config.headers.Authorization}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const imageBuffer = await apiResponse.arrayBuffer();

    const base64Image = arrayBufferToBase64(imageBuffer);

    return NextResponse.json({
      status: 200,
      image: `data:image/png;base64,${base64Image}`,
    });
  } catch (e: any) {
    return NextResponse.json(
      { status: EAPIStatusCodes.servererror, message: e.message },
      { status: EAPIStatusCodes.servererror },
    );
  }
}
