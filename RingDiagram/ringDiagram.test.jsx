import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import RingDiagram from "./RingDiagram.jsx";

describe("RingDiagram", () => {
  const chartData = [
    {
      value: 100,
      color: "#D9DFE8",
    },
    {
      value: 50,
      color: "#727272",
    },
  ];

  const config = {
    strokeWidth: 5,
    radius: 24,
    start: "top",
  };

  it("should be rendered", () => {
    const { container } = render(<RingDiagram chartData={chartData} config={config} />);
    expect(container).toMatchSnapshot();
  });
});
