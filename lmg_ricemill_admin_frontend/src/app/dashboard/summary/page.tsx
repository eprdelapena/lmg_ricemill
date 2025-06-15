import COrdersTable from "@/component/route/dashboard/orders/corders_ordertable";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/next_auth";
import { TUserSession } from "@/schema/main_schema";
import { redirect } from "next/navigation";
import { EAdminRoutes } from "@/enum/main_enum";
import CSummaryTable from "@/component/route/dashboard/summary/csummary_table";

const DashboardSummary = async () => {
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

  return <CSummaryTable />;
};

export default DashboardSummary;
