import { useEffect, useMemo, useState } from "react";

const isDev = process.env.NODE_ENV === "development";

export default function useCDNLoader(cdn: string, globalName: string) {
  const [ready, setReady] = useState(false);

  const cdnUrl = useMemo(() => {
    return cdn.replace(".js", isDev ? ".js" : ".min.js");
  }, [cdn]);

  // script 方式导入
  useEffect(() => {
    const isLoaded = document.querySelector(`script[src="${cdnUrl}"]`);

    if (isLoaded) {
      const waitForReady = setInterval(() => {
        if (window[globalName]) {
          setReady(true);
          clearInterval(waitForReady);
        }
      }, 500);

      return;
    }

    const js = document.createElement("script");

    js.async = true;
    js.src = cdnUrl;
    js.onload = () => {
      setReady(true);
    };
    document.body.appendChild(js);
  }, [cdnUrl]);

  return { ready, echarts: window[globalName], cdnUrl };
}
