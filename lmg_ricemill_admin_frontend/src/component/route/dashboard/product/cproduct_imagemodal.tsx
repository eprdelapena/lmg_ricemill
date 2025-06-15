import useV1PostOrderUser from "@/hooks/api_hooks/usev1postorderuser";
import { TDataGetProducts } from "@/schema/main_schema";
import React from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";

const CProductImageModal = (props: {
  setImageModal: React.Dispatch<React.SetStateAction<boolean>>;
  product: TDataGetProducts;
}) => {
  const { setImageModal, product } = props;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl relative max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl text-black font-semibold mb-4">
          Product image - {product.title}
        </h3>
        {product.image ? (
          <img src={product.image} />
        ) : (
          <>
            <p className="text-black">No content</p>
          </>
        )}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 cursor-pointer"
            onClick={() => {
              setImageModal(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default CProductImageModal;
