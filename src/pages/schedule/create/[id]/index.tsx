import React, { useState, useEffect, ChangeEvent } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Button from "@/components/common/button";
import {
  SearchCategoryKey,
  searchCategoryList,
  searchCategoryMap,
} from "@/constants/mock/searchCategoryList";
import { useRecoilState } from "recoil";
import { addressKeywordSelector } from "@/recoil/search/searchState";
import {
  AddressResponseType,
  PlayerSimpleResponseType,
  UserSimpleInfoType,
} from "@/types/schedule";
import DatePickerComponent from "@/components/common/datepicker";
import TimePickerComponent from "@/components/common/timepicker";
import Api from "@/api/schedule";
import SearchForm from "@/components/common/searchForm";
import CategoryForm from "@/components/schedule/create/categoryForm";
import PlayerForm from "@/components/schedule/create/playerForm";
import ImageForm from "@/components/schedule/create/imageForm";
import {
  categorySelector,
  getImageUrlsFromImageDataType,
  imageDataSelector,
  schedulePlayersSelector,
  urlsToImageDataTypes,
} from "@/recoil/schedule/scheduleState";
import { getFullDateToString } from "@/utils/dateFormat";
import { showToast } from "@/utils";
import useDebounce from "@/utils/hooks/useDebounce";
import { getTimeFormat } from "@/utils/strFormat";
import DropDown2, { DropDownItemType } from "@/components/common/DropDown2";

interface State {
  grade: SearchCategoryKey;
  name: string;
  recordDate: Date;
  startTime: string;
  endTime: string;
  content: string;
  isImportant: boolean;
}

const CreateSchedule: NextPage = () => {
  const router = useRouter();
  const { id, important } = router.query;
  const [searchKeyword, setSearchKeyword] = useRecoilState(
    addressKeywordSelector,
  );
  const [category, setCategory] = useRecoilState(categorySelector);
  const [schedulePlayers, setSchedulePlayers] = useRecoilState(
    schedulePlayersSelector,
  );

  const [isLoaded, setIsLoaded] = useState(false);
  const [imageDatas, setImageDatas] = useRecoilState(imageDataSelector);
  const [formState, setFormState] = useState<State>({
    grade: "ALL",
    name: "",
    recordDate: new Date(),
    startTime: "09:00",
    endTime: "09:00",
    content: "",
    isImportant: important === "true",
  });
  const [previewList, setPreviewList] = useState<Array<AddressResponseType>>(
    [],
  );

  const debouncedQuery = useDebounce(searchKeyword, 250);

  const init = () => {
    setImageDatas([]);
    setSearchKeyword("");
    setCategory({ id: -1, name: "", colorCode: "", colorCodeValue: "'" });
  };

  const handleChangeGrade = (item: DropDownItemType) => {
    setFormState({
      ...formState,
      grade: item.key as SearchCategoryKey,
    });

    setSchedulePlayers({
      ...schedulePlayers,
      checkedIds: [],
    });
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value.slice(0, 15);
    setFormState((state) => ({
      ...state,
      name,
    }));
  };

  const handleChangeStartTime = (startTime: string) => {
    setFormState((state) => ({
      ...state,
      startTime,
    }));
  };

  const handleChangeEndTime = (endTime: string) => {
    setFormState((state) => ({
      ...state,
      endTime,
    }));
  };

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setFormState((state) => ({
      ...state,
      content,
    }));
  };

  const handleClickImportant = () => {
    setFormState((state) => ({
      ...state,
      isImportant: !state.isImportant,
    }));
  };

  const handleSubmit = async () => {
    if (id && id != "0") {
      await editSchedule();
    } else {
      await addSchedule();
    }
  };

  const getSearchAddress = async () => {
    await Api.v1SearchAddress(debouncedQuery).then((res) => {
      const { items } = res.data;
      setPreviewList([...items]);
    });
  };

  const isValidationSchedule = (
    title: string,
    categoryId: number,
    playerIds: Array<number>,
  ) => {
    if (!title) {
      showToast("일정 이름을 입력하세요.");
      return false;
    }

    if (categoryId === -1) {
      showToast("목록 선택은 필수입니다.");
      return false;
    }

    // if (playerIds.length === 0) {
    //   showToast("선수를 선택해주세요.");
    //   return false;
    // }

    return true;
  };

  const createFormData = () => {
    const formData = new FormData();

    imageDatas
      .map(({ file }) => file)
      .filter((file) => file != undefined)
      .forEach((file) => {
        formData.append("file", file);
      });

    return formData;
  };

  const isFormDataEmpty = (formData: FormData) => {
    const entries = formData.entries();
    return entries.next().done;
  };

  const uploadImages = async () => {
    const formData = createFormData();

    if (isFormDataEmpty(formData)) {
      return [];
    }

    try {
      const res = await Api.v1UploadImage("schedule", formData);
      const { status, data } = res;

      if (status === 200 && data?.uploaded) {
        return data.url;
      }
    } catch {
      showToast("이미지 업로드 문제가 발생했습니다.");
    }

    return [];
  };

  const addSchedule = async () => {
    const newTitle = formState.name.trim();
    const playerIds = schedulePlayers.checkedIds;
    if (!isValidationSchedule(newTitle, category.id, playerIds)) return;

    const fileUrls = await uploadImages();
    const urls: string[] = [
      ...getImageUrlsFromImageDataType(imageDatas),
      ...fileUrls,
    ].filter((url) => url.trim() != "");

    const params = {
      name: formState.name,
      address: searchKeyword,
      calendarCategoryId: category.id,
      content: formState.content,
      recordDate: getFullDateToString(formState.recordDate),
      startTime: `${formState.startTime}:00`,
      endTime: `${formState.endTime}:00`,
      images: urls,
      importantYn: formState.isImportant,
      playerGrade: formState.grade,
      userIds: playerIds,
    };

    try {
      await Api.v1AddSchedule(params).then((res) => {
        const { status } = res;
        if (status == 200) {
          init();
          router.push("/schedule");
          showToast("일정이 정상 수정되었습니다.");
        }
      });
    } catch {
      showToast("일정 입력값을 확인해주세요.");
    }
  };

  const editSchedule = async () => {
    const newTitle = formState.name.trim();
    const playerIds = schedulePlayers.checkedIds;
    if (!isValidationSchedule(newTitle, category.id, playerIds)) return;

    const fileUrls = await uploadImages();
    const urls: string[] = [
      ...getImageUrlsFromImageDataType(imageDatas),
      ...fileUrls,
    ].filter((url) => url.trim() != "");

    const params = {
      name: formState.name,
      address: searchKeyword,
      calendarCategoryId: category.id,
      content: formState.content,
      recordDate: getFullDateToString(formState.recordDate),
      startTime: `${formState.startTime}:00`,
      endTime: `${formState.endTime}:00`,
      images: urls,
      importantYn: formState.isImportant,
      playerGrade: formState.grade,
      userIds: playerIds,
    };

    try {
      await Api.v1UpdateSchedule(Number(id), params).then((res) => {
        const { status } = res;
        if (status == 200) {
          init();
          router.push("/schedule");
          showToast("일정이 정상 수정되었습니다.");
        }
      });
    } catch {
      showToast("일정 입력값을 확인해주세요.");
    }
  };

  const deleteSchedule = async () => {
    try {
      await Api.v1DeleteSchedule(Number(id)).then((res) => {
        const { status } = res;
        if (status === 200) {
          showToast("일정이 삭제되었습니다.");
          router.replace("/schedule");
        }
      });
    } catch {
      showToast("일정 삭제에 실패하였습니다.");
    }
  };

  const getInitSchedule = async () => {
    if (!id || id == "0") {
      setIsLoaded(true);
      await getPlayers(true, "ALL", []);
      return;
    }

    const checkedIds: number[] = [];

    await Api.v1GetScheduleDetail(Number(id)).then(async (res) => {
      const {
        address,
        content,
        recordDate,
        startTime,
        endTime,
        images,
        name,
        userSimpleInfo,
        importantYn,
        categoryName,
        categoryColorCode,
        playerGrade,
      } = res.data;

      userSimpleInfo.map((item: UserSimpleInfoType) => {
        checkedIds.push(item.id);
      });

      const recordDateTimeStamp = Date.parse(recordDate);

      setFormState({
        grade: playerGrade,
        name: name,
        recordDate: new Date(recordDateTimeStamp),
        startTime: getTimeFormat(startTime),
        endTime: getTimeFormat(endTime),
        content: content,
        isImportant: importantYn,
      });

      setSearchKeyword(address);
      setImageDatas(urlsToImageDataTypes(images));

      setCategory({
        id: -1,
        name: categoryName,
        colorCode: "",
        colorCodeValue: categoryColorCode,
      });

      await getPlayers(true, getGrader(playerGrade), checkedIds);
    });

    setIsLoaded(true);
  };

  const getGrader = (grade: string) => {
    return grade !== "ALL" ? grade : "";
  };

  const getPlayers = async (
    isInit: boolean,
    grade: string,
    checkedIds: number[],
  ) => {
    const { currentPage, pageLength } = schedulePlayers;
    const page = isInit ? 0 : currentPage;

    await Api.v1GetPlayerList(grade, page, pageLength).then((response) => {
      const { content, totalElements } = response.data;

      const tempContent = content.map((item: PlayerSimpleResponseType) => {
        const { playerGrade, positions } = item;

        return {
          position: positions.join("/"),
          belongto: searchCategoryMap[playerGrade as SearchCategoryKey],
          ...item,
        };
      });

      setSchedulePlayers({
        ...schedulePlayers,
        items: tempContent,
        currentPage: currentPage,
        totalLength: totalElements,
        checkedIds: checkedIds,
      });
    });
  };

  // 선수 목록 페이지네이션
  useEffect(() => {
    if (!isLoaded) return;
    getPlayers(false, getGrader(formState.grade), schedulePlayers.checkedIds);
  }, [schedulePlayers.currentPage, formState.grade]);

  useEffect(() => {
    init();
    getInitSchedule();
  }, []);

  useEffect(() => {
    if (debouncedQuery) getSearchAddress();
  }, [debouncedQuery]);

  const getCheckedPlayerNames = (): string => {
    const { checkedIds } = schedulePlayers;
    return schedulePlayers.items
      .filter((item) => checkedIds.includes(item.id))
      .map((item) => item.name)
      .join(",");
  };
  return (
    <div className="min-w-[1900px]">
      <Layout>
        <div className="flex items-center space-x-[30px]">
          <h1 className="text-[28px] font-[700]">일정관리</h1>
          <DropDown2
            items={searchCategoryList}
            isSmall={false}
            selectedItem={searchCategoryList.find(
              (item) => item.key === formState.grade,
            )}
            onChanged={handleChangeGrade}
          />
        </div>
        <div className="flex mt-10 space-x-10">
          <div className="flex flex-col space-y-6 w-[624px]">
            <div className="flex items-center space-x-3">
              <h2 className="text-[20px] font-[700]">일정 기록하기</h2>
              <div className="cursor-pointer" onClick={handleClickImportant}>
                <Image
                  src={
                    formState.isImportant
                      ? "/images/star_checked.svg"
                      : "/images/star_unchecked.svg"
                  }
                  width={0}
                  height={0}
                  alt="like button"
                  style={{ width: "24px", height: "auto" }}
                />
              </div>
            </div>
            <CategoryForm />
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between space-x-6 relative">
                <span className="w-10 font-[700] text-[15px]">이름</span>
                <input
                  type="text"
                  value={formState.name}
                  placeholder="일정 이름을 입력하세요."
                  className="w-[684px] h-[36px] border-none placeholder:text-[#CBCCCD] placeholder:text-[12px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] focus:border-transparent focus:ring-0"
                  onChange={handleChangeName}
                  maxLength={15}
                />
                <div className="absolute right-4 bottom-2 text-[14px] text-[#B9B9C3] font-[400]">
                  <span>{formState.name.length}</span>
                  <span>/15</span>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-6">
                <span className="w-10 font-[700] text-[15px]">위치</span>
                <SearchForm
                  search={searchKeyword}
                  searchPreviewList={previewList}
                />
              </div>
              <div className="flex items-center justify-between space-x-6">
                <span className="w-10 font-[700] text-[15px]">시간</span>
                <div className="flex items-center space-x-2">
                  <DatePickerComponent
                    calendarType="free"
                    initDate={formState.recordDate}
                    // changeDate={setSearchDate}
                  />
                  <div className="flex items-center space-x-1">
                    <TimePickerComponent
                      initTime={formState.startTime}
                      onChange={handleChangeStartTime}
                    />
                    <span>~</span>
                    <TimePickerComponent
                      initTime={formState.endTime}
                      onChange={handleChangeEndTime}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-6">
                <span className="w-10 font-[700] text-[15px]">선수</span>
                <input
                  type="text"
                  value={getCheckedPlayerNames()}
                  placeholder="선수를 선택하세요."
                  className="w-[684px] h-[36px] border-none placeholder:text-[#CBCCCD] placeholder:text-[12px] rounded-[5px] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] focus:border-transparent focus:ring-0"
                  readOnly
                />
              </div>
              <ImageForm />
              <div className="flex flex-col space-y-4">
                <span className="font-[700] text-[15px]">훈련내용</span>
                <textarea
                  placeholder="훈련 내용을 입력하세요."
                  className="resize-none py-5 px-4 h-[324px] border-none shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] rounded-[5px] outline-none focus:border-transparent focus:ring-0 p-0 placeholder:text-[#CBCCCD]"
                  maxLength={1000}
                  value={formState.content}
                  onChange={handleChangeContent}
                ></textarea>
              </div>
              <div className="flex items-center space-x-2 justify-end py-4">
                <Button
                  type="submit"
                  text="삭제"
                  classnames="text-[#8DBE3D] text-[12px] font-[700]"
                  onClick={deleteSchedule}
                />
                <Button
                  type="submit"
                  text="등록"
                  classnames="text-[#8DBE3D] text-[12px] font-[700]"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
          <PlayerForm />
        </div>
      </Layout>
    </div>
  );
};

export default CreateSchedule;
