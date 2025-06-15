export type TParamsGetLogTable = {
  begin: string | Date,
  end: string | Date,
  searchCategory: "itemid" | "fullname" | "mode" | "orderid",
  searchText: string,
  skip: number
}

export type TParamsDeleteLogTable = {
  itemid: string,
}

export type TParamsGetPendingOrders = {
  productid: number,
  skip: number,
  type: string,
}

export type TDataGetPendingOrders = {
  orderid: string,
  itemquantity: number,
}

export type TDataLogTable = {
  id: number,
  category: string,
  productid: number,
  itemid: string,
  title: string,
  price: string,
  cost: string,
  size: string,
  mode: string,
  orderid: string,
  logdate: string,
}

export type TParamsOrderGenerateBarcode = {
  productid: number,
  orderid: string,
  sizecategory: string,
}

export type TParamsEditProduct = {
  productid: number;
  title?: string;
  price?: string;
  cost?: string;
  category?: string;
  quantityxxs?: number;
  quantityxs?: number;
  quantittys?: number;
  quantitym?: number;
  quantityl?: number;
  quantityxl?: number;
  quantityxxl?: number;
  quantity5?: number;
  quantity55?: number;
  quantity6?: number;
  quantity65?: number;
  quantity7?: number;
  quantity75?: number;
  quantity8?: number;
  quantity85?: number;
  quantity9?: number;
  quantity95?: number;
  quantity100?: number;
  quantity105?: number;
  quantitty110?: number;
  quantity115?: number;
  quantity120?: number;
  quantitydefault?: number;
};

export type TParamsGetInstallment = {
  orderid: string;
};

export type TDataGetInstallment = {
  id: number;
  orderid: string;
  username: string;
  installment: string;
  installmentdate: string;
  description: string;
};

export type TParamsEditAdmin = {
  estatustype: TAdminClassification;
  username: string;
};

export type TParamsPostProduct = {
  title: string;
  price: string;
  category: string;
  cost: string;
  image?: string;
  quantityxxs: number;
  quantityxs: number;
  quantittys: number;
  quantitym: number;
  quantityl: number;
  quantityxl: number;
  quantityxxl: number;
  quantity5: number;
  quantity55: number;
  quantity6: number;
  quantity65: number;
  quantity7: number;
  quantity75: number;
  quantity8: number;
  quantity85: number;
  quantity9: number;
  quantity95: number;
  quantity100: number;
  quantity105: number;
  quantitty110: number;
  quantity115: number;
  quantity120: number;
  quantitydefault: number;
};

export type TDataViewOrderItem = {
  id: number;
  orderid: string;
  productid: number;
  username: string;
  price: string;
  title: string;
  category: string;
  orderquantity: number;
  orderdate: string;
  quantityxxs: number;
  quantityxs: number;
  quantitys: number;
  quantitym: number;
  quantityl: number;
  quantityxl: number;
  quantityxxl: number;
  quantity5: number;
  quantity55: number;
  quantity6: number;
  quantity65: number;
  quantity7: number;
  quantity75: number;
  quantity8: number;
  quantity85: number;
  quantity9: number;
  quantity95: number;
  quantity100: number;
  quantity105: number;
  quantity110: number;
  quantity115: number;
  quantity120: number;

  quantitydefault: number;
};
export type TParamsViewOrderItem = {
  orderid: string;
  skip: number;
};

export type TDataGetMonthlyIncome = {
  day: string;
  successincome: number;
  projectedincome: number;
  expense: number;
  memo?: string;
};
export type TParamsPostExpense = {
  username: string;
  memo?: string;
  expense: string;
};

export type TParamsGetAdmin = {
  skip: number;
};
export type TAdminClassification =
  | "customer"
  | "admin"
  | "admin_secretary"
  | "admin_viewer"
  | "admin_level_one"
  | "admin_level_two"
  | "admin_level_three";

export type TDataGetAdmin = {
  id: number;
  userid: number;
  firstname: string;
  middlename: string;
  lastname: string;
  username: string;
  mobile: string;
  email: string;
  eaccounttype: TAdminClassification;
  lastdate: string;
  lastip: string;
  lastdevice: string;
  lastlocation: string;
};
export type TParamsGetMonthlyIncome = {
  begin: string;
  end: string;
};

export type TDataGetProducts = {
  id: number;
  productid: number;
  cost: string;
  title: string;
  price: string;
  expense: string;
  earning: string;
  expected: string;
  image: string;
  imageone: string;
  imagetwo: string;
  imagethree: string;
  category: string;
  description: string;
  searchtag: string;
  totalorders: number;
  successorders: number;
  pendingorders: number;
  quantityxxs: number;
  quantityxs: number;
  quantitys: number;
  quantitym: number;
  quantityl: number;
  quantityxl: number;
  quantityxxl: number;
  quantity5: number;
  quantity55: number;
  quantity6: number;
  quantity65: number;
  quantity7: number;
  quantity75: number;
  quantity8: number;
  quantity85: number;
  quantity9: number;
  quantity95: number;
  quantity100: number;
  quantity105: number;
  quantity110: number;
  quantity115: number;
  quantity120: number;
  quantitydefault: number;
  regdate: string;
};

export type TParamsDeleteProduct = {
  productid: number;
};

export type TParamsGetProducts = {
  searchType?: "category" | "productid" | "title" | "searchtag";
  searchText?: string;
  skip?: number;
};

export type TRequestConfig = {
  headers: {
    Authorization: string;
    "Content-Type": string;
  };
};

export type TParamsEditStatusOrderUser = {
  orderid: string;
  estatustype: string;
};

export type TParamsDeleteUser = {
  username: string;
};

export type TParamsRegister = {
  firstname: string;
  middlename: string;
  lastname: string;
  mobile: string;
  email: string;
  password: string;
  username: string;
  estatustype: TAdminClassification;
};

export type TParamsPostOrderUser = {
  username: string;
  receiverfirstname: string;
  type: string;
  receiverlastname: string;
  receivermobile: string;
  region: string;
  province: string;
  municity: string;
  barangay: string;
  address: string;
  originsite: string;
  downpayment: string;
  totalcost: string;
  orders: TParamsPostOrders[];
};

export type TParamsDeleteOrderUser = {
  orderid: string;
};

export type TParamsPostOrders = {
  productId: number;
  price: string;
  quantityxxs: number;
  quantityxs: number;
  quantittys: number;
  quantitym: number;
  quantityl: number;
  quantityxl: number;
  quantityxxl: number;
  quantity5: number;
  quantity55: number;
  quantity6: number;
  quantity65: number;
  quantity7: number;
  quantity75: number;
  quantity8: number;
  quantity85: number;
  quantity9: number;
  quantity95: number;
  quantity100: number;
  quantity105: number;
  quantitty110: number;
  quantity115: number;
  quantity120: number;
  quantitydefault: number;
};

export type TUserSession = {
  firstname: string;
  middlename: string;
  username: string;
  token: string;
  mobile: string;
  email: string;
  eaccounttype: string;
  regdate: string;
  lastip: string;
  lastdevice: string;
  lastlocation: string;
  id: string;
};

export type TPostParams = {
  url: string;
  data?: any;
  config?: any;
};

export type TGetParams = {
  url: string;
  config?: any;
};

export type TResponseLogin = {
  firsname: string;
  middlename: string;
  lastname: string;
  username: string;
  token: string;
  mobile: string;
  email: string;
  eaccounttype: string;
  regdate: string;
  lastip: string;
  lastdevice: string;
  lastlocation: string;
};

export type TResponseMainAPI<T = undefined> = {
  status: number;
  message?: string;
  data?: T;
};

export type TParamsLogin = {
  username: string;
  password: string;
};

export type TParamsGetOrderUser = {
  begin?: string;
  end?: string;
  search?: string;
  category?: "username" | "orderid";
  type?: string;
  estatustype?: string;
  skip: number;
};

export type TParamsPostInstallment = {
  orderid: string;
  amount: string;
};

export type TParamsDeleteInstallment = {
  id: number;
  orderid: string;
};

export type TParamsEditInstallment = {
  installment?: string;
  id: number;
  orderid: string;
  description?: string;

};

export type TParamsGenerateBarcode = {
  productid: number;
};

export type TDataGetOrderUser = {
  id: number;
  orderid: string;
  username: string;
  receiverfirstname: string;
  receiverlastname: string;
  type: string;
  currentpayment: string;
  cuurentpayment: string;
  receivermobile: string;
  region: string;

  municity: string;
  barangay: string;

  address: string;
  estatustype: string;
  originsite: string;
  downpayment: string;
  totalcost: string;
  province: string;
  orderdate: string;
};

// {
//   begin?: string,
//   end?: string,
//   username?: string,
//   estatustype?: string,
//   skip: number,
// }
