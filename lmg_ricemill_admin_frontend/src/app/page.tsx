import React from "react";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/next_auth";
import { TUserSession } from "@/schema/main_schema";
import { redirect } from "next/navigation";
import { EAdminRoutes } from "@/enum/main_enum";

const CServerHome = async () => {
  const session = (await getServerSession(authOptions)) as {
    user: TUserSession;
  };

  if (session?.user?.token) {
    redirect(EAdminRoutes.DASHBOARDPRODUCT);
  } else {
    redirect(EAdminRoutes.LOGIN);
  }

  return <></>;
};

export default CServerHome;
