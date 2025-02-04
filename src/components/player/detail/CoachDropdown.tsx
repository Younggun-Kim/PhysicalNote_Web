import { useEffect, useState } from "react";
import TeamApi from "@/api/team/team";
import PlayerApi from "@/api/player";
import { SearchCategoryType } from "@/types/common";
import { GetTeamCoachesResponseDto } from "@/api/team";
import { showToast } from "@/utils";
import { useRecoilValue } from "recoil";
import { playerDetailSelector } from "@/recoil/player/playerState";
import DropDownUnderLine from "@/components/common/dropdown_underline";

const CoachDropdown = () => {
  const [coaches, setCoaches] = useState<SearchCategoryType[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<string>("");
  const playerData = useRecoilValue(playerDetailSelector);

  const getTeamCoaches = async () => {
    await TeamApi.v2GetTeamCoaches().then((res) => {
      const { data } = res;
      if (data && (data as GetTeamCoachesResponseDto[])) {
        const items = data as GetTeamCoachesResponseDto[];
        const dropDownItems = items.map(
          (e) =>
            ({
              key: `${e.id}`,
              value: e.name,
            }) as SearchCategoryType,
        );

        const newSelectedCoach = items.find(
          (item) => item.mainYn === true,
        )?.name;
        if (newSelectedCoach) {
          setSelectedCoach(newSelectedCoach);
        }

        setCoaches(dropDownItems);
      }
    });
  };

  const updateCoach = async (coachId: number) => {
    await PlayerApi.v2UpdatePlayerCoach(playerData.userInfo.id, coachId)
      .then((res) => {
        const { status } = res;
        if (status === 200) {
          showToast("담당 코치가 변경되었습니다.");
        }
      })
      .catch((error) => {
        showToast(error);
      });
  };

  const handleChange = (coach: string) => {
    setSelectedCoach(coaches.find((c) => `${c.key}` === coach)?.value ?? "");
    updateCoach(parseInt(coach));
  };

  useEffect(() => {
    getTeamCoaches();
  }, []);
  return (
    <DropDownUnderLine
      dropDownList={coaches}
      isSize="small"
      defaultText={selectedCoach}
      text={selectedCoach}
      changeText={handleChange}
      hasUnderLine={false}
    />
  );
};
export default CoachDropdown;
