import { Highlight } from "./base";

export const Active = Highlight.extend({
  name: "activeMark",

  addStorage() {
    return { color: "#0dd055" };
  },

  addOptions() {
    return {
      id: "",
      HTMLAttributes: {},
    };
  },
});
