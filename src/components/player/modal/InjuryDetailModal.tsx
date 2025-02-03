import React from "react";
import ModalForm from "@/components/common/modal/modalForm";
import { InjuryInfoType } from "@/types/player";
import { MuscleImgMap, MuscleUtils } from "@/utils";
import Api from "@/api/injuryProgress";
import { PostInjuryRecoveryResponseType } from "@/types/injuryProgress";
import { useRecoilState } from "recoil";
import { playerDetailSelector } from "@/recoil/player/playerState";
import { EmptyImageView } from "@/components/injuryProgress";
import { styled } from "@mui/material";
import MuscleFrontBodyImg from "@/components/muscleSvg/integration/MuscleFrontBodyImg";

interface Props {
  data: InjuryInfoType;
  onClose: () => void;
}

const InjuryDetailModal = ({ data, onClose }: Props) => {
  const [playerDetail, setPlayerDetail] = useRecoilState(playerDetailSelector);
  const recoveryString = data.recoveryYn ? "_완치완료" : "_진행중";

  /** API: 선수 부상 완치하기 */
  const postInjuryRecovery = async (injuryId: number) => {
    await Api.v2PostInjuryRecovery([injuryId]).then((res) => {
      const { data } = res;
      if (data as PostInjuryRecoveryResponseType) {
        const { status, message } = data;
        if (status) {
          // API 호출 대신 바뀐 것만 업데이트
          const { injuryInfo } = playerDetail;
          const newInjuryInfo = injuryInfo.map((injury) => {
            if (injury.id == injuryId) {
              return { ...injury, recoveryYn: true };
            }

            return injury;
          });
          setPlayerDetail({ ...playerDetail, injuryInfo: newInjuryInfo });
        } else {
          alert(message);
        }
      }
    });
  };

  const handleRecovery = async (injuryId: number) => {
    // TODO: 완치 후 리프레시
    if (confirm("선택하신 부상을 완치하시겠습니까?")) {
      await postInjuryRecovery(injuryId);
    }
  };

  const distinctionType = MuscleUtils.distinctionTypeToKor(
    data.distinctionType ?? "",
  );
  const bodyPart = MuscleUtils.bodyPartToKor(data.bodyPart ?? "");
  const muscleType = data.muscleType;
  console.log(bodyPart, muscleType);
  const MuscleImage =
    bodyPart && muscleType
      ? MuscleImgMap[`${distinctionType}_${bodyPart}`][muscleType]
      : EmptyImageView;

  return (
    <ModalForm onClickEvent={onClose}>
      <div className="w-[720px] px-10">
        <div className="flex items-end gap-2.5">
          <span className="font-bold text-xl text-black">
            {MuscleUtils.getMuscleName(data.muscleType ?? "")}
          </span>
          <span>{recoveryString}</span>
          {!data.recoveryYn && (
            <button
              className={[
                "border-[1px] border-tertiary rounded-full py-1 px-3",
                "font-bold text-black text-xs",
              ].join(" ")}
              onClick={() => handleRecovery(data.id)}
            >
              완치하기
            </button>
          )}
        </div>
        <div>
          <div className={"w-[370px] h-[400px]"}>
            <MuscleFrontBodyImg width={370} height={400} muscleType={""} />
          </div>
        </div>
      </div>
    </ModalForm>
  );
};

export default InjuryDetailModal;
