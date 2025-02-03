// 근육 타입
export const MuscleType: string[] = [
  "NONE",
  "ADDUCTOR_LONGUS", // 장내전근
  "ADDUCTOR_MAGNUS", // 대내전근
  "BICEPS", // 이두근
  "SEMIMEMBRANOSUS", // 반건반막양근
  "BRACHIALIS", // 상완근
  "BRACHIORADIALIS", // 완요골근
  "DELTOID", // 삼각근
  "EXTENSOR_DIGITORUM", // 충지신근
  "EXTENSOR_HALLUCIS_LONGUS", // 장모지신근
  "EXTENSOR_DIGITORUM_LONGUS", // 장지신근
  "EXTERNAL_OBLIQUE", // 외복사근
  "ANCONEUS", // 주근
  "GLUTE", // 둔근
  "GASTROCNEMIUS", // 비복근
  "ILIACUS", // 장골근
  "CORACOBRACHIALIS", // 오훼완근
  "RECTUS_FEMORIS", // 대퇴직근
  "VASTUS_LATERALIS", // 외측광근
  "LATISSIMUS_DORSI", // 광배근
  "VASTUS_MEDIALIS", // 내측광근
  "TERES_MINOR", // 소원근
  "EXTENSOR_CARPI_ULNARIS", // 척측수근신근
  "PECTORALIS_MAJOR", // 대흉근
  "FIBULARIS_LONGUS", // 장비골근
  "VASTUS_INTERMEDIUS", // 중간광근
  "PRONATOR_TERES", // 원회내근
  "PSOAS_MAJOR", // 대요근
  "PECTINEUS", // 치골근
  "TERES_MAJOR", // 대원근
  "RECTUS_ABDOMINIS", // 복직근
  "BICEPS_FEMORIS", // 대퇴이두근
  "SOLEUS", // 가자미근
  "IT_BAND", // 장경인대
  "ERECTOR_SPRINAE", // 척추기립근
  "PALMARIS_LONGUS", // 장장근
  "GRACILIS", // 박근
  "EXTENSOR_CARPI_RADIALIS_LONGUS", // 요측수근신근
  "TENSOR_FASCIAE_LATAE", // 대퇴근막장근
  "SARTORIUS", // 봉공근
  "TIBIALIS_ANTERIOR", // 전경골근
  "TRAPEZIUS", // 승모근
  "TRICEPS", // 삼두근
] as const;

export type MuscleTypeKey = (typeof MuscleType)[number];
