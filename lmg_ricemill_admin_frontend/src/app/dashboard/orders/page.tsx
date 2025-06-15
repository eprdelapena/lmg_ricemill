import COrdersTable from "@/component/route/dashboard/orders/corders_ordertable";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/next_auth";
import { TUserSession } from "@/schema/main_schema";
import { redirect } from "next/navigation";
import { EAdminRoutes } from "@/enum/main_enum";

const DashboardOrders = async () => {
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

  return <COrdersTable />;
};

export default DashboardOrders;
