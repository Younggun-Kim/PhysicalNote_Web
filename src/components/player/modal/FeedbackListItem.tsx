import { FeedBackInfoType } from "@/types/player";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import Button from "../../common/button";
import Api from "@/api/player";
import { getFullDateToString, showToast } from "@/utils";

interface Props {
  data: FeedBackInfoType;
  onUpdate: (data: FeedBackInfoType) => void;
}

const FeedbackListItem = ({ data, onUpdate }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [text, setText] = useState(data.content);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setText(value.slice(0, 300));
  };

  const handleSetEdit = () => {
    setText(data.content);
    setIsEdit(true);
  };

  const handleUpdate = async () => {
    if (data.content === text) {
      setIsEdit(false);
      return;
    }

    await Api.v2UpdateFeedback(data.id, {
      content: text,
      recordDate: getFullDateToString(new Date()),
    })
      .then((res) => {
        const { status } = res;
        if (status === 200 && res.data) {
          showToast("피드백이 수정되었습니다.");
          onUpdate(res.data);
          setIsEdit(false);
        }
      })
      .catch((error) => {
        showToast(error);
      });
  };

  return (
    <div className="w-full p-5 border-b-[1px] border-gray-2">
      {!isEdit && (
        <div className="flex items-center gap-5">
          <div className="flex-1 text-black text-sm leading-relaxed tracking-tighter whitespace-pre-wrap">
            {data.content}
          </div>
          <span className="text-black text-sm leading-relaxed tracking-tighter">
            {data.recordDate}
          </span>
          <button onClick={handleSetEdit}>
            <Image
              src={"/icons/pencil-alt.svg"}
              alt={"수정"}
              width={24}
              height={24}
            />
          </button>
        </div>
      )}
      {isEdit && (
        <div className="flex flex-col gap-4">
          <textarea
            className={[
              "w-full h-16 resize-none border-[1px] border-tertiary rounded-[10px] px-5 py-2.5",
              "font-normal text-black text-sm leading-relaxed tracking-tighter",
            ].join(" ")}
            value={text}
            onChange={handleInput}
          />
          <div className="w-full flex justify-end items-center gap-2.5">
            <Button
              type="button"
              text="취소"
              classnames="rounded-full shadow-none border-[1px] border-secondary text-gray-1 text-xs font-bold py-1 px-4"
              onClick={() => setIsEdit(false)}
            />
            <Button
              type="button"
              text="수정"
              classnames="rounded-full shadow-none bg-primary text-white text-xs font-bold py-1 px-4"
              onClick={handleUpdate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackListItem;
