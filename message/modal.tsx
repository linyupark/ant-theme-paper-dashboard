import React from "react";
import { Modal } from "antd";
import { ModalProps } from "antd/lib/modal";

import "./modal.style.less";

interface PDModalProps extends ModalProps {
  icon?: React.ReactNode;
  title?: string;
  text?: string;
  children?: any;
}

// 内容相关的属性
const excludeProps = ["icon", "title", "text"];

// 过滤对象key
const objectFilter = (obj: any, excludeKeys: string[]) => {
  const returnObj = {};

  Object.keys(obj)
    .filter((key) => !~excludeKeys.indexOf(key))
    .map((key) => (returnObj[key] = obj[key]));

  return returnObj;
};

const PDModal = (props: PDModalProps) => {
  const modalProps = objectFilter(props, excludeProps);

  return (
    <Modal className="PaperModal" footer={null} {...modalProps}>
      {excludeProps.map((col) => {
        return (
          props[col] && (
            <div key={col} className={col}>
              {props[col]}
            </div>
          )
        );
      })}
      {props.children}
    </Modal>
  );
};

export default PDModal;
