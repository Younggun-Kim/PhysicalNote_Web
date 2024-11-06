import { cls } from "@/utils";
import React from "react";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  color?: string;
  size?: ButtonSize;
  classnames?: string;
  onClick?: () => void;
  disabled?: boolean;
}

// 사이즈별 스타일 정의
// 사이즈별 스타일 정의를 Record 타입으로 선언
const sizeStyles: Record<ButtonSize, string> = {
  sm: "body-b-sm py-1 px-3",
  md: "body-b-md py-[11px] px-[31px]",
  lg: "body-b-md py-[11px] px-[31px]",
} as const;

// 기본 버튼 스타일
const baseButtonStyles =
  "rounded-full bg-primary text-white shadow-[0_2px_10px_0px_rgba(0,0,0,0.25)] cursor-pointer";

export const RoundButton = ({
  text,
  type = "button",
  size,
  classnames,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cls(
        baseButtonStyles,
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
};
