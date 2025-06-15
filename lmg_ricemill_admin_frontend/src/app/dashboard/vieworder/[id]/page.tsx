import React from "react";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/next_auth";
import { TUserSession } from "@/schema/main_schema";
import { redirect } from "next/navigation";
import { EAdminRoutes } from "@/enum/main_enum";
import CViewOrderTable from "@/component/route/dashboard/vieworder/cvieworder_table";

const CDashboardViewOrder = async () => {
  const session = (await getServerSession(authOptions)) as {
    user: TUserSession;
  };

  if (!session?.user?.token) {
    redirect(EAdminRoutes.LOGIN);
  }

  if (
    session?.user?.eaccounttype !== "admin" &&
    session?.user?.eaccounttype !== "admin_viewer" &&
    session?.user?.eaccounttype !== "admin_secretary"
  ) {
    redirect(EAdminRoutes.DASHBOARDPRODUCT);
  }

  return <CViewOrderTable userData={session?.user} />;
};

export default CDashboardViewOrder;
