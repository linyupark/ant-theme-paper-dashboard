import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, history, useModel } from "umi";
import { DashboardOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import SvgText from "../utils/useSvgText";

/** UMI 项目中 建立 src/models/locale 引入 utils/models/locale.ts 该组件才能生效 */

export interface MenuProps {
  url: string;
  icon?: string;
  childList?: MenuProps[];
  miniTitle?: string;
}

export const MkText = (name) => (
  <SvgText
    size={20}
    fontSize={14}
    text={name}
    style={{ margin: "0 14px 0 5px", verticalAlign: "middle" }}
  />
);

const iconMap = {
  "nc-icon dashboard": <DashboardOutlined />,
};

const Menu = (props: MenuProps) => {
  const { tpl } = useModel("locale", (model) => ({ tpl: model.tpl }));
  const baseUrl = "/admin";
  const miniTitle = props?.miniTitle ?? "";
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState(false);

  // 是否激活状态
  const isActive = useMemo(() => {
    const path = pathname.replace(baseUrl, "");

    return path.startsWith(props.url);
  }, [pathname]);

  // 标题
  const title = useMemo(() => tpl(props.url.replace("/", "mo.")), []);

  useEffect(() => {
    // 默认当前是否需要展开
    setExpanded(isActive);
  }, []);

  return (
    <li className={`menu${isActive ? " active" : ""}`}>
      <div
        className="link"
        onClick={() => {
          if (props.childList) {
            setExpanded(!expanded);
            return;
          }
          history.push(`${baseUrl}${props.url}`);
        }}
      >
        {miniTitle === "" ? (
          <>
            <i className={props.icon}>{iconMap[props.icon ?? -1]}</i>
            <p>
              {title}
              {/* 有子菜单展示箭头 */}
              {props.childList && (
                <b className={`caret${expanded ? " expanded" : ""}`}></b>
              )}
            </p>
          </>
        ) : (
          <>
            <span className="mini-icon">{MkText(miniTitle)}</span>
            <Tooltip
              title={title.split("").length > 17 ? title : ""}
              placement="right"
            >
              <span className="sub-title">{title}</span>
            </Tooltip>
          </>
        )}
      </div>
      {props.childList && (
        <div
          className={`collapse${expanded ? " show" : ""}`}
          style={{
            maxHeight: (expanded ? props.childList.length * 37 : 0) + "px",
          }}
        >
          <ul className="nav">
            {props.childList.map((menu) => {
              return <Menu key={menu.url} {...menu} />;
            })}
          </ul>
        </div>
      )}
    </li>
  );
};

export default Menu;
