import { test, expect } from "@playwright/experimental-ct-react";
import ThumbnailContainer from ".";

test.describe("Thumbnail container", () => {
  test("should render", async ({
    page,
    mount,
  }) => {
    const component = await mount(<ThumbnailContainer openLightbox={(file, index) => {alert("open lightbox file")}} />);
    expect(component).not.toBeNull();
  });
});