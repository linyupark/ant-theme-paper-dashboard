// 将 location pathname 解析成逐层路径的数组
// /a/b => [/a, /a/b]

import { useMemo } from "react";
import { useLocation } from "umi";

export default function usePathname(override?: string) {
  const { pathname } = useLocation();
  const realPathname = override || pathname;
  const splitPath = realPathname.split("/").filter((item) => item);

  return useMemo(() => {
    const result: string[] = [];
    let prevPath = "";

    for (const i in splitPath) {
      let current;

      if (prevPath) {
        current = `${prevPath}/${splitPath[i]}`;
      } else {
        current = `/${splitPath[i]}`;
      }
      result.push(current);
      prevPath = current;
    }
    return result;
  }, [realPathname]);
}
