import useV1PostExpense from "@/hooks/api_hooks/usev1postexpense";
import { UserDataContext } from "@/hooks/context/main_context";
import { TUserSession } from "@/schema/main_schema";
import React, { useContext } from "react";
import ReactDOM from "react-dom";

const CPostProductExpenseModal = (props: {
  setPostExpenseModal: (value: React.SetStateAction<boolean>) => void;
  // getV1GetProduct: () => Promise<void>;
}) => {
  const { setPostExpenseModal } = props;
  const userData = useContext(UserDataContext);
  const {} = userData as TUserSession;
  const { payload, getV1PostExpense, setPayload } = useV1PostExpense();

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4 text-black">
          Declare expenses
        </h3>
        <form className="space-y-3">
          <input
            className="w-full p-2 rounded text-black border-solid border-[1px] border-black"
            name="title"
            placeholder="Input incurred expenses"
            value={payload.expense}
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                expense: e.target.value,
              }));
            }}
          />
          <textarea
            className="w-full p-2 border rounded text-black min-h-[20em]"
            name="title"
            placeholder="Place description about the expenses (e.g. Product name - x Quantity - Product price)"
            value={payload.memo}
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                memo: e.target.value,
              }));
            }}
          />
        </form>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              // getV1PostProduct({ callBackFunction: getV1GetProduct });
              getV1PostExpense({ username: userData?.username as string });
              setPostExpenseModal(false);
            }}
          >
            Save
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 cursor-pointer"
            onClick={() => {
              setPostExpenseModal(false);
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

export default CPostProductExpenseModal;
