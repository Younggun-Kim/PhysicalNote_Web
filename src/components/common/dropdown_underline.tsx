import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { searchCategoryList } from "@/constants/mock/searchCategoryList";
import { DropDownProps, SearchCategoryType } from "@/types/common";
import { cls } from "@/utils";

const DropDownUnderLine = ({
  defaultText,
  text,
  isSize,
  dropDownList,
  changeText,
  hasUnderLine = true,
  ...props
}: DropDownProps) => {
  const menuInput = useRef<HTMLInputElement>(null);
  const menuWrap = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(text || defaultText || "구분");
  const [list, setList] =
    useState<Array<SearchCategoryType>>(searchCategoryList);

  const clickWrap = (e: MouseEvent) => {
    if (
      document.activeElement !== menuInput.current &&
      !menuWrap.current?.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const changeItem = (item: SearchCategoryType) => {
    setTitle(item.value);
    if (changeText) changeText(item.key);
    setIsOpen(false);
  };

  /// 선택처리
  useEffect(() => {
    setTitle(text || "구분");
  }, [text]);

  useEffect(() => {
    document.addEventListener("click", clickWrap);
    dropDownList ? setList(dropDownList) : setList(searchCategoryList);

    return () => {
      document.removeEventListener("click", clickWrap);
    };
  }, [dropDownList]);

  return (
    <div
      ref={menuWrap}
      className={cls(
        `border-b ${hasUnderLine ? "border-black" : "border-none"} flex flex-col justify-center relative py-0 text-black`,
        isSize && isSize === "small"
          ? "w-[140px] h-[44px]"
          : "w-[160px] h-[36px]",
      )}
      {...props}
    >
      <button
        className={cls(
          "h-[1.875rem] flex flex-row justify-center items-center relative pr-12 pl-10 bg-transparent border-none text-body-md",
          isSize && isSize === "small" ? "text-[12px]" : "text-[15px]",
        )}
        onClick={() => setIsOpen((open) => !open)}
      >
        {title}
        <Image
          src={`${!isOpen ? "/icons/chevron-down.svg" : "/icons/chevron-up.svg"}`}
          width={13}
          height={13}
          alt="DropDown Button"
          className={cls(
            "absolute right-[13px]",
            isSize && isSize === "small"
              ? "w-[11px] h-[11px] top-[7px]"
              : "w-[13px] h-[13px] top-[10px]",
          )}
          priority
        />
      </button>
      {isOpen ? (
        <div
          className={cls(
            "bg-[#fff] flex flex-col absolute rounded-[5px] py-[5px] border-[#ededed] z-10 overflow-y-auto shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]",
            isSize && isSize === "small"
              ? "w-[140px] max-h-[160px] top-[35px]"
              : "w-[160px] max-h-[160px] top-[45px]",
          )}
        >
          {list.map((item) => {
            return (
              <div
                key={item.key}
                onClick={() => changeItem(item)}
                className={cls(
                  "flex justify-center text-body-md px-[5px] py-[7px] hover:bg-tertiary cursor-pointer",
                )}
              >
                {item.value}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default DropDownUnderLine;
