import React, { useState } from "react";
import Image from "next/image";
import { cls } from "@/utils";

export interface DropDownItemType {
  key: string;
  value: string;
}

interface Props {
  className?: string;
  isSmall: boolean;
  items: DropDownItemType[];
  selectedItem?: DropDownItemType;
  onChanged: (item: DropDownItemType) => void;
}

const DropDown2 = ({
  className,
  isSmall,
  items,
  selectedItem,
  onChanged,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const btnTextStyle = isSmall ? "text-sm" : "text-base";
  const arrowImgSrc = isOpen
    ? "/images/arrow_down.svg"
    : "/images/arrow_up.svg";

  const toogleIsOpen = () => setIsOpen((open) => !open);

  const handleChanged = (item: DropDownItemType) => {
    onChanged(item);
    toogleIsOpen();
  };

  return (
    <div
      className={[
        "rounded-[5px] border-none flex flex-col justify-center relative py-0 text-[#B9B9C3] shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)]",
        className ? className : "w-[160px] h-[36px]",
      ].join(" ")}
    >
      <button
        className={[
          "h-[1.875rem] flex flex-row justify-center items-center relative pr-12 pl-10 bg-transparent border-none font-[400] text-[#000]",
          btnTextStyle,
        ].join(" ")}
        onClick={toogleIsOpen}
      >
        {selectedItem?.value ?? "구분"}
        <Image
          src={arrowImgSrc}
          width={13}
          height={13}
          alt="DropDown Button"
          className={cls(
            "absolute right-[13px]",
            isSmall
              ? "w-[11px] h-[11px] top-[7px]"
              : "w-[13px] h-[13px] top-[10px]",
          )}
          priority
        />
      </button>

      {isOpen && (
        <div
          className={cls(
            "bg-[#fff] flex flex-col absolute rounded-[5px] py-[5px] border-[#ededed] z-10 overflow-y-auto shadow-md",
            "scrollbar-hide",
            isSmall
              ? "w-[140px] max-h-[160px] top-[35px]"
              : "w-[160px] max-h-[160px] top-[45px]",
          )}
        >
          {items.map((item) => {
            return (
              <div
                key={item.key}
                onClick={() => handleChanged(item)}
                className={cls(
                  "flex justify-center text-[#000] px-[5px] py-[7px] hover:bg-[#D9D9D9] cursor-pointer",
                  isSmall ? "text-sm" : "text-base",
                )}
              >
                {item.value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropDown2;
