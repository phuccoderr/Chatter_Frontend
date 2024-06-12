import toast from "react-hot-toast";

export const useToastMessage = () => {
  const toastLoading = (MESSAGE: string) =>
    toast.loading(MESSAGE, {
      id: "register",
    });

  const toastSuccess = (MESSAGE: string) =>
    toast.success(MESSAGE, {
      id: "register",
    });

  const toastError = (MESSAGE: string) =>
    toast.error(MESSAGE, {
      id: "register",
    });

  return { toastLoading, toastSuccess, toastError };
};
