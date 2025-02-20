import {
  CategoryListType,
  CheckboxType,
  PlayerSimpleDataType,
  PlayerSimpleListType,
} from "@/types/schedule";
import { atom, RecoilEnv, selector } from "recoil";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const recordDateState = atom<Date>({
  key: "recordDateState",
  default: new Date(),
});

const recordDateSelector = selector<Date>({
  key: "recordDateSelector",
  get: ({ get }) => {
    return get(recordDateState);
  },
  set: ({ set }, newValue) => {
    set(recordDateState, newValue);
  },
});

const dailyDateState = atom<Date>({
  key: "dailyDateState",
  default: new Date(),
});

const dailyDateSelector = selector<Date>({
  key: "dailyDateSelector",
  get: ({ get }) => {
    return get(dailyDateState);
  },
  set: ({ set }, newValue) => {
    set(dailyDateState, newValue);
  },
});

const categoryState = atom<CategoryListType>({
  key: "categoryState",
  default: {
    id: -1,
    name: "",
    colorCode: "",
    colorCodeValue: "",
  },
});

const categorySelector = selector<CategoryListType>({
  key: "categorySelector",
  get: ({ get }) => {
    return get(categoryState);
  },
  set: ({ set }, newValue) => {
    set(categoryState, newValue);
  },
});

const playerCheckState = atom<CheckboxType[]>({
  key: "playerCheckState",
  default: [
    {
      id: 0,
      name: "",
      check: false,
    },
  ],
});

const playerCheckSelector = selector<CheckboxType[]>({
  key: "playerCheckSelector",
  get: ({ get }) => {
    return get(playerCheckState);
  },
  set: ({ set }, newValue) => {
    set(playerCheckState, newValue);
  },
});

const selectCategoryState = atom<number>({
  key: "selectCategoryState",
  default: -1,
});

const selectCategorySelector = selector<number>({
  key: "selectCategorySelector",
  get: ({ get }) => {
    return get(selectCategoryState);
  },
  set: ({ set }, newValue) => {
    set(selectCategoryState, newValue);
  },
});

const imageFiles = atom<File[]>({
  key: "imageFileState",
  default: [],
});

const imageFilesSelector = selector<File[]>({
  key: "imageFileSelector",
  get: ({ get }) => {
    return get(imageFiles);
  },
  set: ({ set }, newValue) => {
    set(imageFiles, newValue);
  },
});

const imageUrlsState = atom<string[]>({
  key: "imageUrlsState",
  default: [],
});

const imageUrlsSelector = selector<string[]>({
  key: "imageUrlsSelector",
  get: ({ get }) => {
    return get(imageUrlsState);
  },
  set: ({ set }, newValue) => {
    set(imageUrlsState, newValue);
  },
});

export interface ImageDataType {
  url: string;
  file?: File;
}

export const urlsToImageDataTypes = (urls: string[]): ImageDataType[] => {
  return urls.map((url) => ({ url }));
};

export const getImageUrlsFromImageDataType = (
  items: ImageDataType[],
): string[] => {
  return items.filter((item) => item.file == undefined).map((item) => item.url);
};

const imageDatasState = atom<ImageDataType[]>({
  key: "imageDatasState",
  default: [],
});

const imageDataSelector = selector<ImageDataType[]>({
  key: "imageDataSelector",
  get: ({ get }) => {
    return get(imageDatasState);
  },
  set: ({ set }, newValue) => {
    set(imageDatasState, newValue);
  },
});

const initSchedulePlayersState = {
  items: [],
  currentPage: 0,
  totalLength: 0,
  pageLength: 10,
  checkedPlayers: [],
};

const schedulePlayersState = atom<PlayerSimpleListType>({
  key: "schedulePlayersState",
  default: initSchedulePlayersState,
});

/** 일정에 등록된 선수 목록 */
const schedulePlayersSelector = selector<PlayerSimpleListType>({
  key: "scheduelPlayersSelector",
  get: ({ get }) => {
    return get(schedulePlayersState);
  },
  set: ({ set }, newValue) => {
    set(schedulePlayersState, newValue);
  },
});

/** 선수 Id 목록 */
export const getPlayerIds = (players: PlayerSimpleDataType[]): number[] => {
  return players.map((player) => player.id);
};

export {
  recordDateState,
  recordDateSelector,
  dailyDateState,
  dailyDateSelector,
  categoryState,
  categorySelector,
  playerCheckState,
  playerCheckSelector,
  selectCategoryState,
  selectCategorySelector,
  imageFiles,
  imageFilesSelector,
  imageUrlsState,
  imageUrlsSelector,
  imageDatasState,
  imageDataSelector,
  initSchedulePlayersState,
  schedulePlayersState,
  schedulePlayersSelector,
};
