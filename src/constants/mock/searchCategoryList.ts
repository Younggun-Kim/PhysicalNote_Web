export type SearchCategoryKey = "ALL" | "FIRST" | "SECOND" | "INJURED";

export const searchCategoryMap: Record<SearchCategoryKey, string> = {
  ALL: "전체",
  FIRST: "1군",
  SECOND: "2군",
  INJURED: "부상자",
};

export const searchCategoryList = [
  { key: "ALL", value: "전체" },
  { key: "FIRST", value: "1군" },
  { key: "SECOND", value: "2군" },
  { key: "INJURED", value: "부상자" },
];

export const searchFilterList = [
  { key: "name", value: "선수이름" },
  { key: "position", value: "포지션" },
];

export const belongtoList = [
  { key: "FIRST", value: "1군" },
  { key: "SECOND", value: "2군" },
  { key: "INJURED", value: "부상자" },
];
