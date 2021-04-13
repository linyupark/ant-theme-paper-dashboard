import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";

import "./button.style.less";

interface PDButtonProps extends Omit<ButtonProps, "type" | "size"> {
  type?: "primary" | "info" | "success" | "warning" | "danger";
  size?: "sm" | "lg";
}

const PDButton = (props: PDButtonProps) => {
  const type = props?.type ?? "";
  const size = props?.size ?? "";

  return (
    <Button
      className={`PDButton${type ? " " + type : ""}${size ? " " + size : ""}`}
      shape={props.shape}
      icon={props.icon}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

export default PDButton;
