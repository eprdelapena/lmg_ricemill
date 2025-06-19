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
  productid: string;
  title: string;
  category: string;
  price: string;
  quantity: number;
};

export type TParamsGetInstallment = {
  transactionid: string;
};

export type TDataGetInstallment = {
  id: number;
  transactionid: string;
  installment: string;
  description: string;
  installmentdate: string;
};

export type TParamsEditAdmin = {
  estatustype: TAdminClassification;
  username: string;
};

export type TParamsPostProduct = {
  title: string;
  category: string;
  price: string;
  quantity: number;
};

export type TDataViewOrderItem = {
  id: number;
  productid: string;
  quantity: number;
  productname: string;
};

export type TParamsViewOrderItem = {
  transactionid: string;

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
  productid: string;
  agentcode: string,
  title: string,
  price: string,
  isshow: boolean,
  category: string,
  quantity: number,
  regdate: string;
};

export type TParamsPostProductCategory = {
  category: string, 
}

export type TParamsDeleteProductCategory = {
  id: number,
}

export type TParamsGetProductCategory = {
  
}

export type TParamsDeleteProduct = {
  productid: string;
};

export type TParamsGetProducts = {
  searchType?: "category" | "productid" | "title";
  searchText?: string;
  skip?: number;
};

export type TDataGetProductCategory = {
  id: number,
  category: string,
  agentcode: string,
}

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
  fullname: string,
  spouse: string,
  address: string,
  mobile: string,
  description: string,
  currentpayment: string,
  totalcost: string,
  orders: TParamsPostOrders[];
};

export type TParamsDeleteOrderUser = {
  transactionid: string;
}

export type TParamsPostOrders = {
  productid: string;
  price: string;
  quantity: number,
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
  status?: "paid" | "notpaid";
  category?: "transactionid" | "fullname";
  skip?: number;
}

export type TParamsPostInstallment = {
  amount: string;
  transactionid: string;
  description: string;
};

export type TParamsDeleteInstallment = {
  id: number;
  transactionid: string;
};

export type TParamsEditInstallment = {
  installment: string;
  id: number;
  transactionid: string;
  description: string;
};

export type TParamsGenerateBarcode = {
  productid: number;
};

export type TDataGetOrderUser = {
  id: number,
  transactionid: string,
  fullname: string,
  agentcode: string,
  spouse: string,
  address: string,
  mobile: string,
  currentpayment: string,
  totalcost: string,
  transactiondate: string
};

// {
//   begin?: string,
//   end?: string,
//   username?: string,
//   estatustype?: string,
//   skip: number,
// }
