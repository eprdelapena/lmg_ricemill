import { EParamsDefault } from "@/enum/main_enum";
import { TGetParams, TPostParams } from "@/schema/main_schema";
import axios, { AxiosInstance } from "axios";

export class AxiosService {
  protected client: AxiosInstance;
  public static token: string;

  constructor() {
    const baseURL =
      `${EParamsDefault.IPAddress}:3000`;

    const client = axios.create({
      baseURL: baseURL,
      headers: { "Content-Type": "application/json" },
    });

    client.interceptors.response.use(async (response) => response.data);

    this.client = client;
  }

  protected async sendByGet({ url, config = {} }: TGetParams) {
    try {
      const res = await this.client.get(url, config);
      return res;
    } catch (e) {
      return e;
    }
  }

  protected async sendByPost({
    url,
    data = {},
    config = {},
  }: TPostParams): Promise<any> {
    try {
      const res = await this.client.post(url, data, config);

      return res;
    } catch (e) {
      return e;
    }
  }
}
