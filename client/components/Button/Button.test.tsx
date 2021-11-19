import { shallow } from "enzyme";
import React from "react";
import Button from "components/Button/Button";
import { testComponentType } from "@types";

const setUp = (props: any) => shallow(<Button {...props} />);

let component: testComponentType;

describe("Test for Button", () => {
  beforeEach(() => {
    component = setUp({ children: "Submit" });
  });

  it("Render Button component", () => {
    expect(component).toMatchSnapshot();
  });
});
