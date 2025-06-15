

export enum EParamsDefault {
  // IPAddress = "http://192.168.254.122",
  IPAddress = "http://localhost",
  admin = "admin",
  user = "user",
  emptystring = "",
  succesStatusCode = 200,
  success="success",
  ondelivery="ondelivery",
  pending="pending"
}

export enum EAccountType {
  admin = "admin",
  user = "user",
}

export enum EAdminRoutes {
  LOGIN = "/login",
  DASHBOARDORDERS = "/dashboard/orders",
  DASHBOARDPOSTORDER = "/dashboard/postorder",
  DASHBOARDPRODUCT = "/dashboard/product",
  DASHBOARDSUMMARY = "/dashboard/summary",
  DASHBOARDADMIN = "/dashboard/admin",
  DASHBOARDVIEWORDER = "/dashboard/vieworder",
}

export enum EAPIStatusCodes {
  success = 200,
  servererror = 500,
}
