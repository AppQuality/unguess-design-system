import { SunburstData } from "./_types";

const flatten = (data: SunburstData[]) =>
  data.reduce((acc: SunburstData[], item: SunburstData): SunburstData[] => {
    if (item.children) {
      return [...acc, item, ...flatten(item.children)];
    }

    return [...acc, item];
  }, []);

const findChildrenByName = (data: SunburstData, name: string) => {
  if (!data.children) return undefined;
  return flatten(data.children).find(
    (searchedName) => searchedName.name === name
  );
};

export default findChildrenByName;
