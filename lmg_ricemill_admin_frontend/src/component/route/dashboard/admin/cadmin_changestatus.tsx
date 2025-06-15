import useV1EditAdmin from "@/hooks/api_hooks/usev1editadmin";
import { TAdminClassification, TDataGetAdmin } from "@/schema/main_schema";
import React from "react";
import ReactDOM from "react-dom";

const CEditAdminModal = (props: {
  setEditAdminModal: (value: React.SetStateAction<boolean>) => void;
  admin: TDataGetAdmin;
  getV1GetAdmin: () => Promise<void>;
}) => {
  const { setEditAdminModal, admin, getV1GetAdmin } = props;

  const { getV1EditAdmin, roles, payload, setPayload } = useV1EditAdmin();

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Edit role</h3>
        <form className="space-y-3">
          <select
            className="w-full p-2 border rounded "
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
        </form>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              getV1EditAdmin({ username: admin.username }, getV1GetAdmin);
            }}
          >
            Save
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 cursor-pointer"
            onClick={() => {
              setEditAdminModal(false);
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

export default CEditAdminModal;
