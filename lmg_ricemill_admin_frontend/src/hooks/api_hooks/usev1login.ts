import { EParamsDefault } from "@/enum/main_enum";
import { TParamsLogin } from "@/schema/main_schema";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

const useV1Login = () => {
  const [credentials, setCredentials] = useState<TParamsLogin>({
    username: EParamsDefault.emptystring as string,
    password: EParamsDefault.emptystring as string,
  });

  const getV1Login = async () => {
    const { username, password } = credentials;

    Swal.fire({
      title: "Logging in...",
      text: "Please wait while we authenticate you.",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(); // Start the loader animation
      },
    });

    const result = await signIn("user-credentials", {
      userId: username,
      password,
      redirect: false,
    });

    if (result?.error !== null) {
      await Swal.fire({
        title: "Error",
        text: "Invalid username or password",
        icon: "error",
        confirmButtonText: "Try again",
      });

      return;
    }

    Swal.close();
    await Swal.fire({
      title: "Success!",
      text: "You have been successfully authenticated.",
      icon: "success",
      confirmButtonText: "Confirm",
    });

    window.location.reload();
    return;
  };

  return {
    getV1Login,
    credentials,
    setCredentials,
  };
};

export default useV1Login;
