import toast, { Toaster } from "react-hot-toast";

const toastSuccess = (message: string) => {
  toast.success(message, {
    id: message,
    style: {
      border: "1px solid green",
      padding: "10px",
    },
  });
};

const toastFail = (message: string) => {
  toast.error(message, {
    id: message,
    style: {
      border: "1px solid red",
      padding: "10px",
    },
  });
};

const toastInfo = (message: string) => {
  toast(message, {
    id: message,
    style: {
      color: "#ffffff",
      border: "1px solid blue",
      padding: "8px",
      background: "#1034A6",
    },
  });
};

const toastPromise = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  promiseAction: any,
  _id: string,
  loadingMessage: string,
  errorMessage: string,
  successMessage: string
) => {
  toast.promise(promiseAction, {
    loading: loadingMessage ?? "saving...",
    error: errorMessage ?? "Error!",
    success: successMessage ?? "Success!",
  });
};

// eslint-disable-next-line react-refresh/only-export-components
export { Toaster, toastSuccess, toastFail, toastInfo, toastPromise };
