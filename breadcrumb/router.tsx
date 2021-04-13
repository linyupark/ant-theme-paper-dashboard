import { Breadcrumb } from "antd";
import usePathname from "../utils/usePathname";
import { Link, useModel, Helmet, useLocation } from "umi";
interface RoutePathsBreadcrumbProps {
  basePath?: string;
  homePath?: string;
  handleKey?: string;
  role?: string | number;
  prefix?: any;
}

const initProps = {
  basePath: "/admin",
  homePath: "/home",
  handleKey: "_handle", // 增加 ?_handleKey=xxxx 操作類型麪包屑並提供返回
  role: "",
};

const RoutePathsBreadcrumb: React.FC<RoutePathsBreadcrumbProps> = (props) => {
  const { basePath, homePath, handleKey, role, prefix } = {
    ...initProps,
    ...props,
  };
  const { tpl } = useModel("locale", (model) => ({ tpl: model.tpl }));
  const pathnameList = usePathname();
  const { query }: any = useLocation();
  const title = pathnameList.slice(-1)[0].replace(basePath, "").slice(1);
  const moduleText = (m) => tpl(`mo.${m}${role ? "." + role : ""}`);
  const handleText = (o) => tpl(`op.${o}${role ? "." + role : ""}`);

  return (
    <div className="breadcrumb">
      <Helmet>
        <title>{moduleText(title)}</title>
      </Helmet>
      <Breadcrumb>
        {prefix}
        {pathnameList.map((path, i) => {
          const m = path.replace(basePath, "").slice(1);

          if (
            path.replace(basePath, "") === "" &&
            pathnameList[i + 1] &&
            !pathnameList[i + 1].includes(homePath)
          ) {
            return (
              <Breadcrumb.Item key={path}>
                {/* 首页特殊处理 */}
                <Link to={basePath + homePath}>
                  {moduleText(homePath.slice(1))}
                </Link>
              </Breadcrumb.Item>
            );
          }

          if (pathnameList.length - 1 === i && query[handleKey]) {
            // 有操作則倒數第一個模塊帶上鏈接
            return (
              <Breadcrumb.Item key={path}>
                <Link to={path}>{moduleText(m)}</Link>
              </Breadcrumb.Item>
            );
          }
          if (m !== "") {
            return (
              <Breadcrumb.Item key={path}>{moduleText(m)}</Breadcrumb.Item>
            );
          }
        })}
        {query[handleKey] && (
          <Breadcrumb.Item key={handleKey}>
            {handleText(query[handleKey])}
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </div>
  );
};

export default RoutePathsBreadcrumb;
