import { toast, ToastContent, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
}

type ToastHandler = typeof toast.success | typeof toast.info | typeof toast.error;

function showToast(handler: ToastHandler, msg: ToastContent, options: ToastOptions = {}) {
  handler(msg, {...defaultOptions, ...options});
}

export function successToast(msg: ToastContent, options: ToastOptions = {}) {
  showToast(toast.success, msg, options);
}

export function infoToast(msg: ToastContent, options: ToastOptions = {}) {
  showToast(toast.info, msg, options);
}

export function errorToast(msg: ToastContent, options: ToastOptions = {}) {
  showToast(toast.error, msg, options);
}