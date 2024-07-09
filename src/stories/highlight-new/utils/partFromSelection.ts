import { Attrs } from "@tiptap/pm/model";

export const partFromSelection = (from: Attrs, to: Attrs) => {
  const selectionPart = {
    from: Math.min(
      Number.parseFloat(from["data-start"]),
      Number.parseFloat(to["data-start"])
    ),
    to: Math.max(
      Number.parseFloat(from["data-end"]),
      Number.parseFloat(to["data-end"])
    ),
  };

  return selectionPart;
};
