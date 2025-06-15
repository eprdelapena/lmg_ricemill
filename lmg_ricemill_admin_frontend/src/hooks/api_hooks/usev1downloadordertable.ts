import Instance_ApiLocal from "@/api/api_local";
import Swal from "sweetalert2";

const useV1DownloadOrderTable = () => {
  const getV1DownloadOrderTable = async () => {
    Swal.fire({
      title: "Loading",
      text: "Please wait while we prepare your file...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(); // Start the loader animation
      },
    });
    const response = await Instance_ApiLocal.localDownloadOrderTable();
    // response is the CSV string already
    Swal.close();
    const blob = new Blob([response], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "ordertable.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);

    return;
  };

  return {
    getV1DownloadOrderTable,
  };
};

export default useV1DownloadOrderTable;
