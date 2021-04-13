/**
 * 需要在最外层组件上通过 ConfigProvider 给 antd 设置全局的语言适配，并在 @/locales 下放语言模版文件
 * const PageLayout = (props) => {
  const { locale, inited } = useModel('locale', model => ({
    locale: model.langAnt,
    inited: model.inited,
  }))

  return (
    <ReactKeycloakProvider
      authClient={authClient}
      initOptions={KEYCLOAK.Keycloak}
      LoadingComponent={Loading({ error: false, isLoading: true })}
    >
      <ConfigProvider locale={locale}>
        防止首屏2次渲染
        {inited && props.children}
      </ConfigProvider>
    </ReactKeycloakProvider>
  )
}
 */

import { useCallback, useEffect, useState } from "react";

// 避免初始化乱码
import moment from "moment";
// import 'moment/locale/zh-tw'

// 用到幾個語言都預先加載
// import en_US from 'antd/lib/locale/en_US'
// import zh_TW from 'antd/lib/locale/zh_TW'

/**
 * ant 全局设置语言
 * 名称对照：https://ant-design.gitee.io/docs/react/i18n-cn
 */

const LocaleModel = () => {
  const storeName = process.env.STORE_KEY_LOCALE || "__locale__";

  const initState = {
    key: "zh-tw",
    text: "繁體中文",
    ant: "zh_TW",
    moment: "zh-tw",
  };

  // 语言选项
  const options = [
    {
      key: "zh-cn",
      text: "简体中文",
      ant: "zh_CN",
      moment: "zh-cn",
    },
    {
      key: "zh-tw",
      text: "繁體中文",
      ant: "zh_TW",
      moment: "zh-tw",
    },
    {
      key: "en-us",
      text: "English",
      ant: "en_US",
      moment: "uk",
    },
  ];

  const [state, setState] = useState(initState);

  const [langLocal, setLangLocal] = useState({});
  const [langAnt, setLangAnt] = useState(undefined);

  // 可用来控制避免因为初始化语言导致首次2次渲染
  const [inited, setInited] = useState(false);

  // 客戶端更新初始化數據
  useEffect(() => {
    let language = navigator.language.toLowerCase();

    if (~["zh-tw", "zh-hk"].indexOf(language)) {
      language = "zh-tw";
    } else if (!~["zh-tw", "zh-cn"].indexOf(language)) {
      language = "en-us";
    }
    const initKey = localStorage.getItem(storeName) || language;

    console.log("init model locale", initKey);
    setRegion(initKey, true);
  }, []);

  const tpl = (key: string | number, ...re: any[]) => {
    const str = langLocal[key] || key;
    const reg = /\$\{(\d)\}/g;

    if (re.length > 0 && re.length === str.match(reg).length) {
      let newStr = "";

      str.match(reg).forEach((k, i) => (newStr = str.replace(k, re[i])));
      return newStr;
    }
    return str;
  };

  const setRegion = useCallback(
    async (key, init?: boolean) => {
      const initData = options.find((opt) => opt.key === key);
      const _langLocal = (await import(`@/locales/${initData!.key}`)).default;
      const _langAnt = (await import(`antd/lib/locale/${initData!.ant}`))
        .default;

      await import(`moment/locale/${initData!.moment}.js`);
      moment.locale(initData!.moment);
      setLangLocal(_langLocal);
      setLangAnt(_langAnt);
      setState({ ...state, ...initData });
      localStorage.setItem(storeName, key);
      if (init) {
        setInited(true);
      } else {
        console.log("set model locale state", initData);
      }
    },
    [state.key]
  );

  return {
    state,
    langAnt,
    options,
    inited,
    tpl,
    setRegion,
  };
};

export default LocaleModel;
