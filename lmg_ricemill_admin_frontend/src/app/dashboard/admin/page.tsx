import COrdersTable from "@/component/route/dashboard/orders/corders_ordertable";
import { getServerSession } from "next-auth";
import authOptions from "@/utils/next_auth";
import { TUserSession } from "@/schema/main_schema";
import { redirect } from "next/navigation";
import { EAdminRoutes, EParamsDefault } from "@/enum/main_enum";
import CAdminTable from "@/component/route/dashboard/admin/cadmin_table";

const DashboardAdmin = async () => {
  const session = (await getServerSession(authOptions)) as {
    user: TUserSession;
  };

  if (!session?.user?.token) {
    redirect(EAdminRoutes.LOGIN);
  }

  if (session?.user?.eaccounttype !== "admin") {
    redirect(EAdminRoutes.DASHBOARDORDERS);
  }

  return <CAdminTable userData={session.user} />;
};

export default DashboardAdmin;
