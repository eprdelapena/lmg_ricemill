import CProductTable from "@/component/route/dashboard/product/cproduct_producttable";
import React from "react";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/next_auth";
import { TUserSession } from "@/schema/main_schema";
import { redirect } from "next/navigation";
import { EAdminRoutes } from "@/enum/main_enum";

const CDashboardProduct = async () => {
  const session = (await getServerSession(authOptions)) as {
    user: TUserSession;
  };

  if (!session?.user?.token) {
    redirect(EAdminRoutes.LOGIN);
  }

  return <CProductTable userData={session?.user} />;
};

export default CDashboardProduct;
