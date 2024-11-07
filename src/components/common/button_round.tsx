import { cls } from "@/utils";
import React from "react";

type ButtonSize = "sm" | "md" | "lg" | "wide";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  color?: string;
  size?: ButtonSize;
  classnames?: string;
  onClick?: () => void;
  disabled?: boolean;
  isSelected?: boolean;
}

// 사이즈별 스타일 정의
// 사이즈별 스타일 정의를 Record 타입으로 선언
const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-body-sm-b py-[5px] px-[13px]",
  md: "text-body-b py-[11px] px-[31px]",
  lg: "text-body-b py-[11px] px-[31px]",
  wide: "text-body-b py-[11px] px-[18.5px]",
} as const;

// 기본 버튼 스타일
const baseButtonStyles =
  "rounded-full shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] cursor-pointer";
const selectedStyle = "bg-primary text-white";
const unSelectedStyle = "bg-white text-black";

export const RoundButton = ({
  text,
  type = "button",
  size,
  classnames,
  onClick,
  disabled,
  isSelected = true,
}: ButtonProps) => {
  const textStyle = isSelected ? selectedStyle : unSelectedStyle;
  return (
    <button
      type={type}
      onClick={onClick}
      className={cls(
        baseButtonStyles,
        textStyle,
        sizeStyles[size ?? "md"],
        classnames || ""
      )}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

// Factory 함수들
export const RoundButtonFactory = {
  sm: (props: Omit<ButtonProps, "size">) => (
    <RoundButton {...props} size="sm" />
  ),

  md: (props: Omit<ButtonProps, "size">) => (
    <RoundButton {...props} size="md" />
  ),

  lg: (props: Omit<ButtonProps, "size">) => (
    <RoundButton {...props} size="lg" />
  ),

  wide: (props: Omit<ButtonProps, "size">) => (
    <RoundButton {...props} size="wide" />
  ),
};
