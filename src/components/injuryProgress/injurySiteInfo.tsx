/**
 * 부상 부위 정보
 */

import {MuscleTypeKey} from "@/types";
import {cls, MuscleUtils} from "@/utils";

export interface InjurySiteInfoProps {
    /** 근육 타입 */
    muscle: MuscleTypeKey;
    /** 부상 레벨 */
    injuryLevel: number;
    /** 부상날짜 */
    recordDate: string;
    /** 완치여부 */
    isRecovered: boolean;
    /** 부상타입 */
    injuryType: string;
}

export const InjurySiteInfo = ({
                                   muscle, injuryLevel, recordDate, isRecovered, injuryType
                               }: InjurySiteInfoProps) => {

    const muscleName: string = MuscleUtils.getMuscleName(muscle);
    return (
        <div className="flex justify-center items-center py-4">
            <div className="w-20 h-20 overflow-hidden mr-3">
                <img src="https://picsum.photos/200/300" alt={muscleName}/>
            </div>
            <div className="flex flex-col">
                <div className={'flex gap-1'}>
                    <span className='text-body-md-b'>{muscleName}</span>
                    <InjuryLevelBadge
                        level={injuryLevel}
                    />
                </div>
                <span className="text-body-sm">{injuryType}</span>
                <span className="text-body-sm text-gray-1">{recordDate}</span>
            </div>
        </div>
    )
};


interface InjuryLevelBadgeProps {
    level: number;
}


/** 부상 레벨 뱃지 */
export const InjuryLevelBadge = ({level}: InjuryLevelBadgeProps) => {
    const textColor = level > 2 ? 'text-white' : 'text-black';
    const bgColor = `bg-level-${level}`;
    return <div className={
        cls(
            "py-[2px] px-[6.5px] text-body-sm rounded-full text-center",
            textColor,
            bgColor,
        )
    }>
        {level}단계
    </div>
}