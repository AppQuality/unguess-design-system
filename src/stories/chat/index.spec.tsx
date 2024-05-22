import { test, expect } from "@playwright/experimental-ct-react";
import {Menus, defaultArgs} from "./index.stories";

test.describe("Thumbnail container", () => {
  test("should render", async ({
    page,
    mount,
  }) => {
    const component = await mount(<Menus {...defaultArgs} />);
    expect(component).not.toBeNull();
  });
});