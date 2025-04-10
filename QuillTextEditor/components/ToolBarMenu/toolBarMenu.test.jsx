import React from "react";
import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import ToolBarMenu from "./ToolBarMenu";

describe("ToolBarMenu", () => {
  it("should be rendered", () => {
    const { container } = render(<ToolBarMenu toolBarId={"test-id"} />);
    expect(container).toMatchSnapshot();
  });
});
