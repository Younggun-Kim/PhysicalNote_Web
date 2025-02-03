export interface MuscleSvgProps {
  color: string;
  width?: number;
  height?: number;
}

export const levelToColor = (level: number) => {
  switch (level) {
    case 0:
      return "#8DBE3D";
    case 1:
      return "#B7d487";
    case 2:
      return "#FBDD73";
    case 3:
      return "#FFC808";
    case 4:
      return "#F27C21";
    case 5:
      return "#FF0000";
    default:
      return "#ffffff";
  }
};
