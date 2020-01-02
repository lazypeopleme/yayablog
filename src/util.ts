import app from "./index";

export const notification = function(
  type: any = "success",
  message: string = "操作成功"
) {
  let title = "";
  let info = "";
  switch (type) {
    case "error":
      title = "错误";
      info = "操作失败";
      break;
    case "warning":
      title = "警告";
      break;
    case "info":
      title = "提示";
      break;
    default:
      title = "成功";
      break;
  }
  app.$notify({
    type,
    title,
    message: info || message,
    position: "bottom-right"
  });
};
