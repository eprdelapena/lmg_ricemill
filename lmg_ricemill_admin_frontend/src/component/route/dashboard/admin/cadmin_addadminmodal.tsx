import useV1AddToCart from "@/hooks/api_hooks/usev1addtocart";
import useV1PostOrderUser from "@/hooks/api_hooks/usev1postorderuser";
import useV1Register from "@/hooks/api_hooks/usev1register";
import { UserDataContext } from "@/hooks/context/main_context";
import {
  TAdminClassification,
  TDataGetProducts,
  TParamsPostOrders,
  TUserSession,
} from "@/schema/main_schema";
import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";

const CAddAdminModal = (props: {
  setAddAdminModal: (value: React.SetStateAction<boolean>) => void;
}) => {
  const { setAddAdminModal } = props;
  const { getV1Register, payload, setPayload, roles } = useV1Register();

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4 text-black">Add admin</h3>
        <form className="space-y-3">
          <input
            className="w-full p-2 text-black border-solid border-black border-[1px]"
            value={payload?.username || ""}
            placeholder="input username..."
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                username: e.target.value,
              }));
            }}
          />

          <input
            className="w-full p-2 text-black border-solid border-black border-[1px]"
            value={payload?.password || ""}
            placeholder="input password..."
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
          />

          <select
            className="w-full p-2 text-black border-solid border-black border-[1px] "
            value={payload?.estatustype || ""}
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                estatustype: e.target.value as TAdminClassification,
              }));
            }}
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <input
            className="w-full p-2 text-black border-solid border-black border-[1px]"
            value={payload?.firstname || ""}
            placeholder="input first name..."
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                firstname: e.target.value,
              }));
            }}
          />
          <input
            className="w-full p-2 text-black border-solid border-black border-[1px]"
            value={payload?.middlename || ""}
            placeholder="input middle name..."
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                middlename: e.target.value,
              }));
            }}
          />
          <input
            className="w-full p-2 text-black border-solid border-black border-[1px]"
            value={payload?.lastname || ""}
            placeholder="input last name..."
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                lastname: e.target.value,
              }));
            }}
          />
          <input
            className="w-full p-2 text-black border-solid border-black border-[1px]"
            value={payload?.email || ""}
            placeholder="input email..."
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />

          <input
            className="w-full p-2 text-black border-solid border-black border-[1px]"
            value={payload?.mobile || ""}
            placeholder="input mobile number..."
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                mobile: e.target.value,
              }));
            }}
          />
        </form>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              getV1Register();
            }}
          >
            Save
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 cursor-pointer"
            onClick={() => {
              setAddAdminModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CAddAdminModal;
