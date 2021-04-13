import { useEffect, useState } from "react";

const useIsMobile = (breakWidth) => {
  // 是否手机模式
  const [isMobile, setIsMobile] = useState(false);
  // 窗口变动自动调整table scroll y来确保头部固定
  const onWindowResize = () => {
    const w = document.body.scrollWidth;

    setIsMobile(w <= breakWidth);
  };

  useEffect(() => {
    onWindowResize();
    window.addEventListener("resize", onWindowResize, false);
    return () => {
      window.removeEventListener("resize", onWindowResize, false);
    };
  }, []);

  return { isMobile, refresh: onWindowResize };
};

export default useIsMobile;
