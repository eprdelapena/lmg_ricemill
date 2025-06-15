import { EParamsDefault } from "@/enum/main_enum";
import {
  TDataGetAdmin,
  TDataGetInstallment,
  TDataGetMonthlyIncome,
  TDataGetOrderUser,
  TDataGetPendingOrders,
  TDataGetProducts,
  TDataLogTable,
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
  TRequestConfig,
  TResponseLogin,
  TResponseMainAPI,
} from "@/schema/main_schema";
import axios, { Axios, AxiosResponse } from "axios";

class NextClient {
  client: Axios;
  constructor() {
    const instance = axios.create({
      baseURL: `${EParamsDefault.IPAddress}:3001`,
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin":
          process.env.NEXT_PUBLIC_ENV === "PRODUCTION" ? "*" : "*",
        "Access-Control-Allow-Methods":
          "GET, DELETE, PATCH, POST, PUT, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
        "Content-Type": "application/json",
      },
    });
    this.client = instance;
  }

  public async mainLogin(
    payload: TParamsLogin,
  ): Promise<TResponseMainAPI<TResponseLogin>> {
    return await this.client.post("/v9/login", payload);
  }

  public async mainGetOrderUser(
    payload: TParamsGetOrderUser,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI<TDataGetOrderUser[]>> {
    return await this.client.post("/v9/get/orderuser", payload, config);
  }

  public async mainPostOrderUser(
    payload: TParamsPostOrderUser,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI> {
    return await this.client.post("/v9/post/orderuser", payload, config);
  }

  public async mainDeleteOrderUser(
    payload: TParamsDeleteOrderUser,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI> {
    return await this.client.post("/v9/delete/orderuser", payload, config);
  }

  public async mainEditStatusOrderUser(
    payload: TParamsEditStatusOrderUser,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI> {
    return await this.client.post("/v9/edit/status_orderuser", payload, config);
  }

  public async mainGetProduct(
    payload: TParamsGetProducts,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI<TDataGetProducts>> {
    return await this.client.post("/v9/get/products", payload, config);
  }

  public async mainDeleteProduct(
    payload: TParamsDeleteProduct,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI> {
    return await this.client.post("/v9/delete/products", payload, config);
  }

  public async mainPostProduct(
    payload: TParamsPostProduct,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI> {
    return await this.client.post("/v9/post/products", payload, config);
  }

  public async mainEditProduct(
    payload: TParamsEditProduct,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI> {
    return await this.client.post("/v9/edit/products", payload, config);
  }

  public async mainViewOrderItem(
    payload: TParamsViewOrderItem,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI> {
    return await this.client.post("/v9/get/view_order_item", payload, config);
  }

  public async mainGetMonthlyIncome(
    payload: TParamsGetMonthlyIncome,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI<TDataGetMonthlyIncome[]>> {
    return await this.client.post("/v9/get/monthly_income", payload, config);
  }

  public async mainPostExpense(
    payload: TParamsPostExpense,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI> {
    return await this.client.post("/v9/post/expense", payload, config);
  }

  public async mainGetAdmin(
    payload: TParamsGetAdmin,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI<TDataGetAdmin>> {
    return await this.client.post("/v9/get/admin", payload, config);
  }

  public async mainRegister(
    payload: TParamsRegister,
    config: any,
  ): Promise<TResponseMainAPI> {
    return await this.client.post("/v9/register", payload, config);
  }

  public async deleteUser(
    payload: TParamsDeleteUser,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI> {
    return await this.client.post("/v9/delete/user", payload, config);
  }

  public async editAdmin(
    payload: TParamsEditAdmin,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI> {
    return await this.client.post("/v9/edit/admin", payload, config);
  }

  public async mainGetInstallment(
    payload: TParamsGetInstallment,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI<TDataGetInstallment[]>> {
    return await this.client.post("/v9/get/installment", payload, config);
  }

  public async mainPostInstallment(
    payload: TParamsPostInstallment,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI> {
    return await this.client.post("/v9/post/installment", payload, config);
  }

  public async mainDeleteInstallment(
    payload: TParamsDeleteInstallment,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI> {
    return await this.client.post("/v9/delete/installment", payload, config);
  }

  public async mainEditInstallment(
    payload: TParamsEditInstallment,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI> {
    return await this.client.post("/v9/edit/installment", payload, config);
  }

  public async mainGenerateBarcode(
    payload: TParamsGenerateBarcode,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI> {
    return await this.client.post("/v9/generate_barcode", payload, config);
  }

  public async mainOrderGenerateBarcode(
    payload: TParamsOrderGenerateBarcode,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI> {
    return await this.client.post("/v9/order_item_generate_barcode", payload, config);
  }

  public async mainGetLog(
    payload: TParamsGetLogTable,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI<TDataLogTable>> {
    return await this.client.post("/v9/get/log", payload, config);
  }

  public async mainGetPendingOrders(
    payload: TParamsGetPendingOrders,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI<TDataGetPendingOrders>> {
    return await this.client.post("/v9/get/pendingorders", payload, config);
  }

  public async mainDeleteLog(
    payload: TParamsDeleteLogTable,
    config: TRequestConfig,
  ): Promise<TResponseMainAPI> {
    return await this.client.post("/v9/delete/log", payload, config);
  }

  public async mainDownloadOrderTable(config: TRequestConfig): Promise<unknown> {
    return await this.client.get("/v9/download/ordertable", config);
  }

  public async mainDownloadOrderUserTable(config: TRequestConfig): Promise<unknown> {
    return await this.client.get("/v9/download/orderusertable", config);
  }

  public async mainDownloadProductTable(config: TRequestConfig): Promise<unknown> {
    return await this.client.get("/v9/download/producttable", config);
  }

  public async mainDownloadInstallmentTable(config: TRequestConfig): Promise<unknown> {
    return await this.client.get("/v9/download/installmenttable", config);
  }
}

const client = new NextClient();
export default client;
