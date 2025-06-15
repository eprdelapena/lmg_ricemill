import { TUserSession } from "@/schema/main_schema";
import { createContext } from "react";

export const UserDataContext = createContext<TUserSession | undefined>(
  undefined,
);
