import "./card.style.less";

interface PDCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  footer: React.ReactNode;
}

/**
 * 卡片组件
 */

const PDCard = (props: PDCardProps) => {
  return (
    <div className="PDCard">
      <div className="body">
        <i className="icon">{props.icon}</i>
        <div className="info">
          <p className="title">{props.title}</p>
          <p className="value">{props.value}</p>
        </div>
      </div>
      <div className="footer">
        <hr />
        <div className="state">{props.footer}</div>
      </div>
    </div>
  );
};

export default PDCard;
