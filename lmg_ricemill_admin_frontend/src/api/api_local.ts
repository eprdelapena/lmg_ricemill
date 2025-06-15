import {
  TDataGetAdmin,
  TDataGetInstallment,
  TDataGetMonthlyIncome,
  TDataGetOrderUser,
  TDataGetPendingOrders,
  TDataGetProducts,
  TDataLogTable,
  TDataViewOrderItem,
  TParamsDeleteInstallment,
  TParamsDeleteLogTable,
  TParamsDeleteOrderUser,
  TParamsDeleteProduct,
  TParamsDeleteUser,
  TParamsEditAdmin,
  TParamsEditInstallment,
  TParamsEditProduct,
  TParamsEditStatusOrderUser,
  TParamsGenerateBarcode,
  TParamsGetAdmin,
  TParamsGetInstallment,
  TParamsGetLogTable,
  TParamsGetMonthlyIncome,
  TParamsGetOrderUser,
  TParamsGetPendingOrders,
  TParamsGetProducts,
  TParamsLogin,
  TParamsOrderGenerateBarcode,
  TParamsPostExpense,
  TParamsPostInstallment,
  TParamsPostOrderUser,
  TParamsPostProduct,
  TParamsRegister,
  TParamsViewOrderItem,
  TResponseLogin,
  TResponseMainAPI,
} from "@/schema/main_schema";
import { AxiosService } from "./api_local_axios";

class CApiLocal extends AxiosService {
  async localLogin(
    payload: TParamsLogin,
  ): Promise<TResponseMainAPI<TResponseLogin>> {
    return await this.sendByPost({ url: "/api/admin/login", data: payload });
  }

  async localGetOrderUser(
    payload: TParamsGetOrderUser,
  ): Promise<TResponseMainAPI<TDataGetOrderUser[]>> {
    return await this.sendByPost({
      url: "/api/admin/get_order_user",
      data: payload,
    });
  }

  async localPostOrderUser(
    payload: TParamsPostOrderUser,
  ): Promise<TResponseMainAPI> {
    return await this.sendByPost({
      url: "/api/admin/post_order_user",
      data: payload,
    });
  }

  async localDeleteOrderUser(
    payload: TParamsDeleteOrderUser,
  ): Promise<TResponseMainAPI> {
    return await this.sendByPost({
      url: "/api/admin/delete_order_user",
      data: payload,
    });
  }

  async localEditStatusOrderUser(
    payload: TParamsEditStatusOrderUser,
  ): Promise<TResponseMainAPI> {
    return await this.sendByPost({
      url: "/api/admin/edit_status_order_user",
      data: payload,
    });
  }

  async localGetProduct(
    payload: TParamsGetProducts,
  ): Promise<TResponseMainAPI<TDataGetProducts[]>> {
    return await this.sendByPost({
      url: "/api/admin/get_product",
      data: payload,
    });
  }

  async localDeleteProduct(
    payload: TParamsDeleteProduct,
  ): Promise<TResponseMainAPI> {
    return await this.sendByPost({
      url: "/api/admin/delete_product",
      data: payload,
    });
  }

  async localPostProduct(
    payload: TParamsPostProduct,
  ): Promise<TResponseMainAPI> {
    return await this.sendByPost({
      url: "/api/admin/post_product",
      data: payload,
    });
  }

  async localEditProduct(
    payload: TParamsEditProduct,
  ): Promise<TResponseMainAPI> {
    return await this.sendByPost({
      url: "/api/admin/edit_product",
      data: payload,
    });
  }

  async localViewOrderItem(
    data: TParamsViewOrderItem,
  ): Promise<TResponseMainAPI<TDataViewOrderItem[]>> {
    return await this.sendByPost({
      url: "/api/admin/view_order_item",
      data,
    });
  }

  async localGetMonthlyIncome(
    data: TParamsGetMonthlyIncome,
  ): Promise<TResponseMainAPI<TDataGetMonthlyIncome[]>> {
    return await this.sendByPost({
      url: "/api/admin/get_monthly_income",
      data,
    });
  }

  async localPostExpense(data: TParamsPostExpense): Promise<TResponseMainAPI> {
    return await this.sendByPost({
      url: "/api/admin/post_expense",
      data,
    });
  }

  async localGetAdmin(
    data: TParamsGetAdmin,
  ): Promise<TResponseMainAPI<TDataGetAdmin[]>> {
    return await this.sendByPost({
      url: "/api/admin/get_admin",
      data,
    });
  }

  async localRegister(data: TParamsRegister): Promise<TResponseMainAPI> {
    return await this.sendByPost({
      url: "/api/admin/register",
      data,
    });
  }

  async localDeleteUser(data: TParamsDeleteUser): Promise<TResponseMainAPI> {
    return await this.sendByPost({
      url: "/api/admin/delete_user",
      data,
    });
  }

  async localEditAdmin(data: TParamsEditAdmin): Promise<TResponseMainAPI> {
    return await this.sendByPost({
      url: "/api/admin/edit_admin",
      data,
    });
  }

  async localGetInstallment(
    data: TParamsGetInstallment,
  ): Promise<TResponseMainAPI<TDataGetInstallment[]>> {
    return await this.sendByPost({
      url: "/api/admin/get_installment",
      data,
    });
  }

  async localPostInstallment(
    data: TParamsPostInstallment,
  ): Promise<TResponseMainAPI> {
    return await this.sendByPost({
      url: "/api/admin/post_installment",
      data,
    });
  }

  async localDeleteInstallment(
    data: TParamsDeleteInstallment,
  ): Promise<TResponseMainAPI> {
    return await this.sendByPost({
      url: "/api/admin/delete_installment",
      data,
    });
  }

  async localEditInstallment(
    data: TParamsEditInstallment,
  ): Promise<TResponseMainAPI> {
    return await this.sendByPost({
      url: "/api/admin/edit_installment",
      data,
    });
  }

  async localGenerateBarcode(data: TParamsGenerateBarcode): Promise<any> {
    return await this.sendByPost({
      url: "/api/admin/generate_barcode",
      data,
    });
  }

  async localOrderGenerateBarcode(data: TParamsOrderGenerateBarcode): Promise<any> {
    return await this.sendByPost({
      url: "/api/admin/order_item_generate_barcode",
      data,
    });
  }

  async localGetLog(data: Partial<TParamsGetLogTable>): Promise<TResponseMainAPI<TDataLogTable[]>> {
    return await this.sendByPost({
      url: "/api/admin/get_log",
      data,
    });
  }

  async localGetPendingOrders(data: TParamsGetPendingOrders): Promise<any> {
    return await this.sendByPost({
      url: "/api/admin/get_pendingorders",
      data,
    });
  }

  async localDeleteLog(data: TParamsDeleteLogTable): Promise<TResponseMainAPI> {
    return await this.sendByPost({
      url: "/api/admin/delete_log",
      data,
    });
  }

  async localDownloadInstallmentTable(): Promise<any> {
    return await this.sendByGet({
      url: "/api/admin/download_installmenttable",
    });
  }

  async localDownloadOrderTable(): Promise<any> {
    return await this.sendByGet({
      url: "/api/admin/download_ordertable",
    });
  }

  async localDownloadOrderUserTable(): Promise<any> {
    return await this.sendByGet({
      url: "/api/admin/download_orderusertable",
    });
  }

  async localDownloadProduttable(): Promise<any> {
    return await this.sendByGet({
      url: "/api/admin/download_producttable",
    });
  }
}

const Instance_ApiLocal = new CApiLocal();
export default Instance_ApiLocal;
