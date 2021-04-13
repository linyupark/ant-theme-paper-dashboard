import { useEffect, useRef } from "react";
import useCDNLoader from "../../utils/useCDNLoader";
import "./bar.style.less";

const defaultCDN = "https://cdn.jsdelivr.net/npm/echarts@5.0.1/dist/echarts.js";

interface EchartsBarPercentProps {
  value: number;
  name?: string;
  size?: number;
  color?: string;
  textColor?: string;
  textSize?: number;
  bgColor?: string;
  loading?: React.ReactNode;
}

const EchartsBarPercent = (props: EchartsBarPercentProps) => {
  const size = props?.size ?? 150;
  const color = props?.color ?? "#51bcda";
  const textColor = props?.textColor ?? "#000";
  const textSize = props?.textSize ?? 18;
  const bgColor = props?.bgColor ?? "#f5f5f5";
  const { ready, echarts } = useCDNLoader(defaultCDN, "echarts");
  const domRef = useRef(null);

  useEffect(() => {
    if (!ready) return;
    const chart = echarts.init(domRef.current);

    chart.on("mouseover", function (params) {
      if (params.data.value === undefined) {
        chart.dispatchAction({
          type: "downplay",
        });
      }
    });
    const option = {
      title: {
        text: `${props.value ?? "--"}%`,
        textStyle: {
          color: textColor,
          fontSize: textSize,
          fontWeight: 400,
        },
        left: "center",
        top: "53%",
      },
      angleAxis: {
        max: 100, // 满值
        clockwise: true,
        // 隐藏刻度线
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      radiusAxis: {
        type: "category",
        // 隐藏刻度线
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      polar: {
        center: ["50%", "50%"],
        radius: "150%", // 图形大小
      },
      series: [
        {
          type: "bar",
          data: [
            {
              name: props.name,
              value: props.value ?? 0,
              itemStyle: {
                color: {
                  // 完成的圆环的颜色
                  colorStops: [
                    {
                      offset: 0,
                      color, // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color, // 100% 处的颜色
                    },
                  ],
                },
              },
            },
          ],
          coordinateSystem: "polar",
          roundCap: true,
          barWidth: 10,
          barGap: "-100%", // 两环重叠
          z: 2,
        },
        {
          // 灰色环
          type: "bar",
          data: [
            {
              value: 100,
              itemStyle: {
                color: {
                  // 完成的圆环的颜色
                  colorStops: [
                    {
                      offset: 0,
                      color: bgColor, // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: bgColor, // 100% 处的颜色
                    },
                  ],
                },
              },
            },
          ],
          coordinateSystem: "polar",
          barWidth: 10,
          barGap: "-100%", // 两环重叠
          z: 1,
        },
      ],
    };

    chart.setOption(option);
  }, [ready]);

  if (!ready) {
    return (
      <div
        className="echarts bar loading"
        style={{
          width: size,
          height: size,
        }}
      >
        {props?.loading ?? "Loading"}
      </div>
    );
  }

  return (
    <div className="echarts bar percent">
      <div
        className="chart"
        ref={domRef}
        style={{
          width: size,
          height: size,
        }}
      ></div>
      <div
        className="title"
        style={{
          color: textColor,
          fontSize: textSize + 4,
        }}
      >
        {props.name ?? ""}
      </div>
    </div>
  );
};

export default EchartsBarPercent;
