import { Menu, Dropdown } from "antd";
import { DownOutlined, GlobalOutlined } from "@ant-design/icons";
import { useModel } from "umi";

const LocaleSelector: React.FC = () => {
  const { state, setRegion, options } = useModel("locale");

  const onSelectLocale = ({ key }) => {
    setRegion(key);
  };

  return (
    <Dropdown
      overlay={
        <Menu onClick={onSelectLocale} selectedKeys={[state.key]}>
          {options.map((opt) => {
            return <Menu.Item key={opt.key}>{opt.text}</Menu.Item>;
          })}
        </Menu>
      }
      trigger={["click"]}
    >
      <span className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <GlobalOutlined />
        <span className="text">{state.text}</span>
        <DownOutlined />
      </span>
    </Dropdown>
  );
};

export default LocaleSelector;
