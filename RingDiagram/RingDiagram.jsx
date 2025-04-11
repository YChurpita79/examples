import React, { memo } from "react";
import PropTypes from "prop-types";

const RingDiagram = memo(({ config, chartData }) => {
  const offsetRatio = {
    top: 0.25,
    right: 0,
    left: 0.5,
    bottom: -0.25,
  };

  const strokeWidth = config.strokeWidth || 5;
  const radiusValue = config.radius || 100;
  const radius = radiusValue - strokeWidth / 2;
  const fullSize = 2 * radiusValue;
  const length = 2 * Math.PI * radius;
  let startPoint = config.start in offsetRatio ? config.start : "top";
  const chartOffset = length * offsetRatio[startPoint];
  const sectors = [];

  chartData.forEach((sectorData, sectorIndex) => {
    const width = (length * sectorData.value) / 100;
    let offset = chartOffset;

    if (sectorIndex > 0) {
      let prevSector = sectors[sectorIndex - 1];
      offset = prevSector.offset - prevSector.width;
    }

    sectors.push({
      ...sectorData,
      width,
      offset,
    });
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox={`0 0 ${fullSize} ${fullSize}`}
      fill={"none"}
      width={fullSize}
      height={fullSize}
    >
      {sectors?.map((sector, index) => {
        return (
          <circle
            key={index}
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            strokeDasharray={`${sector.width} ${length - sector.width}`}
            strokeDashoffset={sector.offset}
            stroke={sector.color}
            strokeLinecap={"round"}
            strokeWidth={strokeWidth}
          />
        );
      })}
    </svg>
  );
});

RingDiagram.propTypes = {
  config: PropTypes.object,
  chartData: PropTypes.array,
};
export default RingDiagram;
