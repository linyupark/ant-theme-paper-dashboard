import "./icon.style.less";

const MessageIcon = ({ status }) => {
  return (
    <div className="MessageIcon">
      {status === "success" && (
        <div
          className={`swal2-icon swal2-${status} swal2-animate-${status}-icon`}
        >
          <div className={`swal2-${status}-circular-line-left`}></div>
          <span className={`swal2-${status}-line-tip`}></span>
          <span className={`swal2-${status}-line-long`}></span>
          <div className={`swal2-${status}-ring`}></div>
          <div className={`swal2-${status}-circular-line-right`}></div>
        </div>
      )}
      {status === "error" && (
        <div
          className={`swal2-icon swal2-${status} swal2-animate-${status}-icon`}
        >
          <div className={`swal2-${status}-circular-line-left`}></div>
          <div className={`swal2-${status}-ring`}></div>
          <span className="swal2-x-mark">
            <span className="swal2-x-mark-line-left"></span>
            <span className="swal2-x-mark-line-right"></span>
          </span>
          <div className={`swal2-${status}-circular-line-right`}></div>
        </div>
      )}
      {status === "warning" && (
        <div className="swal2-icon swal2-warning swal2-animate-warning-icon">
          <div className={"swal2-warning-circular-line-left"}></div>
          <div className={"swal2-warning-ring"}></div>
          <div className={"swal2-warning-circular-line-right"}></div>
        </div>
      )}
    </div>
  );
};

export default MessageIcon;
