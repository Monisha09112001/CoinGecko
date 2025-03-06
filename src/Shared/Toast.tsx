import { toast } from "react-toastify";

export const Toast = {
  success: (msg: string) => toast.success(msg),
  fail: (msg: string) => toast.error(msg),
};

export const ErrorMsg = "Failed to fetch data.Please try again.";
