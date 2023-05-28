import { message, Modal } from "antd";
import { TYPE_MESSAGE } from "./constants";

const showMessage = (type, msg, duration = 2) => {
  switch (type) {
    case TYPE_MESSAGE.Success:
      message.success(msg, duration);
      break;
    case TYPE_MESSAGE.Error:
      message.error(msg, duration);
      break;
    case TYPE_MESSAGE.Exception:
    case TYPE_MESSAGE.Warning:
      Modal.warning({
        content: msg,
        okText: "Aceptar",
        duration,
      });
      break;
    case TYPE_MESSAGE.Required:
      message.info(msg, duration);
      break;
    default:
      message.info(msg, duration);
      break;
  }
};

export const show = (data, duration) => {
  showMessage(data.type, data.message, duration);
};

export const showError = (message, duration) => {
  showMessage(TYPE_MESSAGE.Error, message, duration);
};

export const showSuccess = (message, duration) => {
  showMessage(TYPE_MESSAGE.Success, message, duration);
};

export const showInfo = (message, duration) => {
  showMessage(TYPE_MESSAGE.Required, message, duration);
};

export const showWarning = (message, duration) => {
  showMessage(TYPE_MESSAGE.warning, message, duration);
};

export const confirm = ({
  okText = "Sí",
  cancelText = "No",
  title = "Confirmar",
  ...rest
}) =>
  Modal.confirm({
    okText,
    cancelText,
    title,
    ...rest,
  });

export default showMessage;
