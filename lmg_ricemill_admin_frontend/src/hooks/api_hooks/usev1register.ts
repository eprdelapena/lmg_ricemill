import Instance_ApiLocal from "@/api/api_local";
import { EAPIStatusCodes } from "@/enum/main_enum";
import { TParamsRegister } from "@/schema/main_schema";
import { useState } from "react";
import Swal from "sweetalert2";
import { TAdminClassification } from "@/schema/main_schema";
const useV1Register = () => {
  const [payload, setPayload] = useState<Partial<TParamsRegister>>({
    firstname: undefined,
    middlename: undefined,
    lastname: undefined,
    mobile: undefined,
    email: undefined,
    password: undefined,
    username: undefined,
    estatustype: undefined,
  });

  const roles = [
    "admin",
    "admin_secretary",
    "admin_viewer",
    "admin_level_one",
    "admin_level_two",
    "admin_level_three",
  ];

  const getV1Register = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10,15}$/;

    for (const [key, value] of Object.entries(payload)) {
      if (!value) {
        await Swal.fire({
          icon: "error",
          title: "Missing Field",
          text: `Please fill up the "${key}" field.`,
        });
        return;
      }
    }

    if (payload.username?.includes(" ")) {
      await Swal.fire({
        icon: "error",
        title: "Invalid username",
        text: "Username must not contain any spaces",
      });
      return;
    }

    if (payload.password?.includes(" ")) {
      await Swal.fire({
        icon: "error",
        title: "Invalid username",
        text: "Password must not contain any spaces",
      });
      return;
    }

    if (!emailRegex.test(payload.email!)) {
      await Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return;
    }

    if (!mobileRegex.test(payload.mobile!)) {
      await Swal.fire({
        icon: "error",
        title: "Invalid Mobile",
        text: "Please enter a valid mobile number (10-15 digits).",
      });

      return;
    }
    Swal.fire({
      title: "Loading",
      text: "Please wait...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(); // Start the loader animation
      },
    });

    const response = await Instance_ApiLocal.localRegister({
      ...(payload as TParamsRegister),
    });
    Swal.close();
    if (response.status !== EAPIStatusCodes.success) {
      await Swal.fire({
        icon: "error",
        title: "Request error",
        text: "username or email already in used",
      });
      return;
    }

    await Swal.fire({
      icon: "success",
      title: "Registration successful",
      text: "Admin account successfully added",
    });
    window.location.reload();
    // alert('hello')
    return;
  };

  return {
    getV1Register,
    payload,
    setPayload,
    roles,
  };
};

export default useV1Register;
