import type { NextPage } from "next";
import Image from "next/image";
import React from "react";

const Custom404: NextPage = () => {
  const handleGoDashboard = async () => {
    window.location.replace("/dashboard");
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <Image
          src="/images/background_left.svg"
          width={1137}
          height={804}
          className="fixed top-0 left-0 -z-10"
          alt="왼쪽 상단 배경 이미지"
        />
        <Image
          src="/images/background_right.svg"
          width={1092}
          height={814}
          className="fixed bottom-0 right-0 -z-10"
          alt="오른쪽 상단 배경 이미지"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-h2-b">요청한 페이지를 찾을 수 없어요.</span>
          <button
            className="rounded-[10px] bg-tertiary text-body-b text-gray-1 px-[30px] py-2"
            onClick={handleGoDashboard}
          >
            홈으로 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
