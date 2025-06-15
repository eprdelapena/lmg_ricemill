import React from "react";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/next_auth";
import CClientLogin from "./cclientlogin";
import { TUserSession } from "@/schema/main_schema";
import { redirect } from "next/navigation";
import { EAdminRoutes } from "@/enum/main_enum";

const CServerLogin = async () => {
  const session = (await getServerSession(authOptions)) as {
    user: TUserSession;
  };

  if (session?.user?.token) {
    redirect(EAdminRoutes.DASHBOARDPRODUCT);
  }

  return (
    <>
      <CClientLogin />
    </>
  );
};

export default CServerLogin;
