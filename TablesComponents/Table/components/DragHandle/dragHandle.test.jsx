import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import DragHandle from "./DragHandle";

describe("DragHandle component", () => {
  it("should be rendered ", () => {
    const { container } = render(<DragHandle />);
    expect(container).toMatchSnapshot();
  });

  it("should be rendered selectable ", () => {
    const { container } = render(<DragHandle isSelectable={true} />);
    expect(container).toMatchSnapshot();
  });
});
