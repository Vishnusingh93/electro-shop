import toast from "react-hot-toast";

export const showToast = (msg, type = "success", id) => {
  if (id) {
    toast[type]?.(msg, { id, style: { minWidth: "200px" } }) || toast(msg, { id });
  } else {
    toast[type]?.(msg, { style: { minWidth: "200px" } }) || toast(msg);
  }
};