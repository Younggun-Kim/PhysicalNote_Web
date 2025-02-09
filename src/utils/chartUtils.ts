/**
 * yAxis Grid 좌표 가져오기
 * @param height 차트의 높이
 * @param tickCount yAxis의 tick 개수
 * @param gridOffset
 */
export const getHorizontalCoordinates = (
  height: number,
  tickCount: number,
  gridOffset: number,
): number[] => {
  const maxCnt = tickCount + 1;
  const coordinates = [...Array(maxCnt)].map(
    (_, i) => (i / maxCnt) * height + gridOffset,
  );
  return coordinates.splice(1, maxCnt - 2);
};
