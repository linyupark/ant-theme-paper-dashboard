const useSvgText = function (props) {
  const { size, fontSize, fontWeight, text, bgColor, style } = props;

  const width = size ?? "40";
  const height = size ?? "40";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width + "px"}
      height={height + "px"}
      viewBox={`0 0 ${size} ${size}`}
      version="1.1"
      style={{ color: "currentColor", ...(style ?? {}) }}
    >
      <rect
        fill={bgColor ?? "#fff"}
        cx="20"
        width={width}
        height={height}
        cy="20"
        r="20"
      />
      <text
        x="50%"
        y="50%"
        style={{
          color: "currentColor",
          lineHeight: 1,
        }}
        alignmentBaseline="middle"
        textAnchor="middle"
        fontSize={fontSize ?? "40"}
        fontWeight={fontWeight ?? "400"}
        dy=".1em"
        dominantBaseline="middle"
        fill="currentColor"
      >
        {text}
      </text>
    </svg>
  );
};

export default useSvgText;
