import React from "react";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/next_auth";
import { TUserSession } from "@/schema/main_schema";
import { redirect } from "next/navigation";
import { EAdminRoutes } from "@/enum/main_enum";
import CPostOrderTable from "@/component/route/dashboard/postorder/CPostOrderTable";

const CDashboardPostOrder = async () => {
  const session = (await getServerSession(authOptions)) as {
    user: TUserSession;
  };

  if (!session?.user?.token) {
    redirect(EAdminRoutes.LOGIN);
  }

  return <CPostOrderTable userData={session?.user} />;
};

export default CDashboardPostOrder;
