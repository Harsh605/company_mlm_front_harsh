import { format } from "date-fns";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export function getFromLocalStorage(key) {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key) {
  if (typeof sessionStorage !== "undefined") {
    return sessionStorage.getItem(key);
  }
  return null;
}

export const errorToast = (message) => {
  toast.error(message, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    zIndex: 9999, // Set a high zIndex value
  });
};
export const successToast = (message) => {
  toast.success(message, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const processResponse = (response) => {
  if (response?.statusCode == 500) {
    errorToast(response?.message);
    return;
  }
  if (response?.statusCode == 400) {
    response?.message.map((message) => {
      errorToast(message);
    });
    return;
  }
  if (response?.success) {
    successToast(response?.message);
    return;
  }
  if (!response?.success) {
    errorToast(response?.message);
    return;
  }
};

export const itemDeleteHandler = (item, funcHandler) => {
  Swal.fire({
    title: "Do you want to Delete?",
    showCancelButton: true,
    confirmButtonText: "Delete",
    cancelButtonText: `Cancel`,
  }).then((result) => {
    if (result.isConfirmed) {
      funcHandler(item);
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
};

export const statusValueHandler = (data, options) => {
  let newData = options.find((item) => item.value == data);

  return newData;
};

export const dateFormater = (date) => {
  if (!date) return null;

  let newDate = format(new Date(date), "yyyy-MM-dd");

  return newDate;
};
