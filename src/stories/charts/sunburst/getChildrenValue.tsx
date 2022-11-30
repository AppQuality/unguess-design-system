import { SunburstData } from "./_types";
const getChildrenValue = (data: SunburstData): number => {
  if (data.value) {
    return data.value;
  }

  if (data.children) {
    return data.children.reduce((acc, item) => {
      return acc + getChildrenValue(item);
    }, 0);
  }
  return 0;
};

export { getChildrenValue };
