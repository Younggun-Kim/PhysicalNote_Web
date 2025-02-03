import React from "react";
import ModalForm from "@/components/common/modal/modalForm";
import { getInjuryPeriod, InjuryInfoType } from "@/types/player";
import { MuscleGroupImgMap, MuscleUtils } from "@/utils";
import Api from "@/api/injuryProgress";
import { PostInjuryRecoveryResponseType } from "@/types/injuryProgress";
import { useRecoilState } from "recoil";
import { playerDetailSelector } from "@/recoil/player/playerState";
import { formatInjuryType, MuscleTypeKey } from "@/types";
import IntergrationMuscleProps from "@/components/muscleSvg/integration/IntergrationMuscleProps";
import InjuryDetailFieldName from "@/components/player/modal/InjuryDetailFieldName";
import InjuryDetailFieldValue from "@/components/player/modal/InjuryDetailFieldValue";
import InjuryLevelBadge from "@/components/common/InjuryLevelBadge";

interface Props {
  data: InjuryInfoType;
  onClose: () => void;
  onRecoverySuccess: () => void;
}

const EmptyImageView = ({ width, height }: IntergrationMuscleProps) => {
  return <div className={`w-[${width}px] h-[${height} px] bg-gray-1`}></div>;
};

const InjuryDetailModal = ({ data, onClose, onRecoverySuccess }: Props) => {
  const [playerDetail, setPlayerDetail] = useRecoilState(playerDetailSelector);
  const recoveryString = data.recoveryYn ? "_완치완료" : "_진행중";

  /** API: 선수 부상 완치하기 */
  const postInjuryRecovery = async (injuryId: number) => {
    await Api.v2PostInjuryRecovery([injuryId]).then((res) => {
      const { data } = res;
      if (data as PostInjuryRecoveryResponseType) {
        const { status, message } = data;
        if (status) {
          onRecoverySuccess();
        } else {
          alert(message);
        }
      }
    });
  };

  const handleRecovery = async (injuryId: number) => {
    if (confirm("선택하신 부상을 완치하시겠습니까?")) {
      await postInjuryRecovery(injuryId);
    }
  };

  const muscleType = data.muscleType as MuscleTypeKey;
  const MuscleImage =
    MuscleGroupImgMap[`${data.distinctionType}_${data.bodyPart}`] ??
    EmptyImageView;

  return (
    <ModalForm onClickEvent={onClose}>
      <div className="w-[800px] px-10">
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
        <div className="flex justify-start items-start">
          <div className={"w-[370px] h-[400px] flex items-center"}>
            <MuscleImage
              width={370}
              height={400}
              muscleType={muscleType}
              color="#E4FAC1"
            />
          </div>
          <div
            className={
              "flex-1 h-full flex flex-col gap-2.5 justify-start items-start"
            }
          >
            <div className="flex items-center">
              <InjuryDetailFieldName text="종류" />
              <InjuryDetailFieldValue
                text={formatInjuryType(data.injuryType)}
              />
            </div>
            <div className="flex items-center">
              <InjuryDetailFieldName text="위치" />
              <InjuryDetailFieldValue
                text={`${MuscleUtils.bodyPartToKor(data.bodyPart)}_${MuscleUtils.getMuscleName(data.muscleType)}`}
              />
            </div>
            <div className="flex items-center">
              <InjuryDetailFieldName text="정도" />
              <InjuryLevelBadge injuryLevelType={data.injuryLevelType ?? ""} />
              <div className="w-2.5"></div>
              <InjuryDetailFieldValue
                text={formatInjuryType(
                  data.injuryLevelType ? `${data.injuryLevelType}_SIMPLE` : "",
                )}
              />
            </div>
            <div className="flex items-center">
              <InjuryDetailFieldName text="통증" />
              <InjuryDetailFieldValue
                text={data.painCharacteristicList?.join(",") ?? "-"}
              />
            </div>
            <div className="flex items-center">
              <InjuryDetailFieldName text="시기" />
              <InjuryDetailFieldValue text={getInjuryPeriod(data) ?? "-"} />
            </div>
            <div className="flex items-center">
              <InjuryDetailFieldName text="경위" />
              <InjuryDetailFieldValue text={data.comment ?? "-"} />
            </div>
          </div>
        </div>
      </div>
    </ModalForm>
  );
};

export default InjuryDetailModal;
