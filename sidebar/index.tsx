/**
 * 移植 https://demos.creative-tim.com/paper-dashboard-pro-angular 侧栏（仅支持2级菜单）
 */

import { useEffect, useMemo, useState } from "react";
import useIsMobile from "../utils/useIsMobile";
import Menu, { MenuProps } from "./menu";
import mitt from "mitt";
import "./sidebar.style.less";

interface PaperSidebarProps {
  width: number; // 菜单宽
  breakWidth?: number; // 切换成手机模式宽度
  title: string; // 菜单顶部标题
  logo: string | React.ReactNode; // 顶部菜单图标
  usermenu?: React.ReactNode; // 用户操作（可选）
  menuList: MenuProps[];
  role?: string;
}

export const Events = mitt();

const PaperSidebar = (props: PaperSidebarProps) => {
  // 切换手机自适应模式的临界宽度
  const breakWidth = props?.breakWidth ?? 990;

  // 收起的宽度
  const minWidth = 80;

  // 是否手机模式
  const { isMobile } = useIsMobile(breakWidth);

  // 是否展开中
  const [isExpand, setIsExpand] = useState(true);
  const [isMobileExpand, setIsMobileExpand] = useState(false);

  // 外部折叠的数据需要持久化避免 hover out 覆盖
  const [holdon, setHoldon] = useState(true);

  // 切换折叠
  const toggleExpand = (v) => {
    const state = v ?? !isExpand;

    // console.log('sidebar expand:', state)
    setIsExpand(state);
    setHoldon(state);
  };

  // 手机模式折叠
  const mobileExpandToggle = (v) => {
    const state = v ?? !isMobileExpand;

    setIsMobileExpand(state);
    Events.emit("mobileExpanded", state);
  };

  // 显示宽度
  const displayWidth = useMemo(() => {
    if (isMobileExpand) return props.width;
    if (isMobile) return 0;
    if (!isExpand || !holdon) return minWidth;
    return props.width;
  }, [isMobile, isExpand, isMobileExpand]);

  const isCollapsed = useMemo(() => {
    return !isExpand && !isMobileExpand;
  }, [isExpand, isMobileExpand]);

  useEffect(() => {
    Events.on("mobileExpand", mobileExpandToggle);
    return () => {
      Events.off("mobileExpand", mobileExpandToggle);
    };
  }, [isMobileExpand]);

  // 监听折叠
  useEffect(() => {
    Events.on("expand", toggleExpand);
    return () => {
      Events.off("expand", toggleExpand);
    };
  }, [isExpand]);

  useEffect(() => {
    Events.emit("width", displayWidth);
  }, [displayWidth]);

  return (
    <div
      onMouseEnter={() => {
        setIsExpand(true);
      }}
      onMouseLeave={() => setIsExpand(holdon)}
      className={`paper-sidebar${isMobile ? " mobile" : ""}${
        isCollapsed ? " collapsed" : ""
      } ${props?.role ?? ""}`}
      style={{
        width: `${!holdon && isExpand ? props.width : displayWidth}px`,
      }}
    >
      <div className="line">
        {/* LOGO */}
        <div className="logo">
          <span
            className="icon"
            style={{
              backgroundImage: `url(${props.logo})`,
            }}
          ></span>
          <span className="title">{props.title}</span>
        </div>
        <div className="scroller">
          {/* USERMENU */}
          {props.usermenu}
          {/* MENULIST */}
          <ul className="nav">
            {props.menuList.map((menu) => {
              return <Menu key={menu.url} {...menu} />;
            })}
          </ul>
        </div>
        <div className="line-r"></div>
      </div>
    </div>
  );
};

export default PaperSidebar;
