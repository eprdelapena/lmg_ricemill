import Instance_ApiLocal from "@/api/api_local";
import Swal from "sweetalert2";

const useV1DownloadInstallmentTable = () => {
  const getV1DownloadInstallmentTable = async () => {
    Swal.fire({
      title: "Loading",
      text: "Please wait while we prepare your file...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading(); // Start the loader animation
      },
    });
    const response = await Instance_ApiLocal.localDownloadInstallmentTable();
    // response is the CSV string already
    Swal.close();
    const blob = new Blob([response], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "installmenttable.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(url);

    return;
  };

  return {
    getV1DownloadInstallmentTable,
  };
};

export default useV1DownloadInstallmentTable;
