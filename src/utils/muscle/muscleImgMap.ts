import { ComponentType } from "react";
import { MuscleTypeKey } from "@/types";
import {
  FrontBodyExternalOblique,
  FrontBodyPectoralisMajor,
  FrontBodyRectusAbdominis,
  FrontBodyTrapezius,
  FrontLeftArmBiceps,
  FrontLeftArmBrachialis,
  FrontLeftArmBrachioradialis,
  FrontLeftArmDeltoid,
  FrontLeftArmPronatorTeres,
  FrontLeftArmPalmarisLongus,
  FrontLeftArmTriceps,
  FrontLeftLegExtensorDigitorumLongus,
  FrontLeftLegSartorius,
  FrontLeftLegSoleus,
  FrontLeftLegTensorFasciaeLatae,
  FrontRightArmBiceps,
  FrontRightArmBrachialis,
  FrontRightArmBrachioradialis,
  FrontRightArmDeltoid,
  FrontRightArmPronatorTeres,
  FrontRightArmTriceps,
  FrontRightLegAdductorLongus,
  FrontRightLegAdductorMagnus,
  FrontRightLegExtensorDigitorumLongus,
  FrontRightLegGracilis,
  FrontRightLegIliacus,
  FrontRightLegPsoasMajor,
  FrontRightLegSartorius,
  FrontRightLegSoleus,
  FrontRightLegTensorFasciaeLatae,
  FrontRightLegTibialisAnterior,
  BackLeftArmBrachioradialis,
  BackLeftArmDeltoid,
  BackLeftArmExtensorCarpiUlnaris,
  BackLeftArmTriceps,
  BackRightArmBrachioradialis,
  BackRightArmDeltoid,
  BackRightArmExtensorCarpiUlnaris,
  BackRightArmTriceps,
  BackLeftLegSoleus,
  BackLeftLegGluteus,
  BackLeftLegGracilis,
  BackLeftLegBicepsFemoris,
  BackLeftLegAdductorMagnus,
  BackRightLegAdductorMagnus,
  BackRightLegBicepsFemoris,
  BackRightLegGluteus,
  BackRightLegGracilis,
  BackRightLegSoleus,
  FrontRightArmPalimarisLongus,
  FrontLeftLegExtensorHallucisLongus,
  FrontLeftLegItBand,
  FrontLeftLegRectusFemoris,
  FrontLeftLegTibialisAnterior,
  FrontLeftLegFibularisLongus,
  FrontLeftLegGastrocnemius,
  FrontLeftLegVastusIntermedius,
  FrontLeftLegVastusMedialis,
  FrontLeftLegGracilis,
  FrontLeftLegAdductorMagnus,
  FrontLeftLegAdductorLongus,
  FrontLeftLegPsoasMajor,
  FrontLeftLegPectineus,
  FrontLeftLegIliacus,
  FrontRightLegGlute,
  FrontRightLegVastusLateralis,
  FrontLeftLegVastusLateralis,
  FrontRightLegRectusFemoris,
  FrontRightLegItBand,
  FrontRightLegFibularisLongus,
  FrontRightLegExtensorHallucisLongus,
  FrontRightLegGastrocnemius,
  FrontRightLegVastusIntermedius,
  FrontRightLegVastusMedialis,
  FrontRightLegPectineus,
  BackBodyLatissimusDorsi,
  BackBodyTeresMinor,
  BackBodyTeresMajor,
  BackBodyErectorSprinae,
  BackLeftArmExtensorDigitorum,
  BackLeftArmAnconeus,
  BackLeftArmExtensorCarpiRadialisLongus,
  BackRightArmExtensorCarpiRadialisLongus,
  BackRightArmExtensorDigitorum,
  BackRightArmAnconeus,
  BackLeftLegItBand,
  BackLeftLegSemimembranosus,
  BackRightLegItBand,
  BackRightLegGastrocnemius,
  BackRightLegSemimembranosus,
} from "@/components/muscleSvg";
import { MuscleSvgProps } from "@/components/muscleSvg/muscleSvgProps";
import FrontLeftArmCoracobrachialis from "@/components/muscleSvg/front/leftArm/coracobrachialis";
import FrontRightArmCoracobrachialis from "@/components/muscleSvg/front/rightArm/coracobrachialis";
import FrontLeftLegGlute from "@/components/muscleSvg/front/leftLeg/glute";
import { BackLeftLegGastrocnemius } from "@/components/muscleSvg/back/leftLeg/gastrocnemius";
import MuscleFrontBodyImg from "@/components/muscleSvg/integration/MuscleFrontBodyImg";
import IntergrationMuscleProps from "@/components/muscleSvg/integration/IntergrationMuscleProps";
import MuscleFrontLeftArmImg from "@/components/muscleSvg/integration/MuscleFrontLeftArmImg";
import MuscleFrontRightArmImg from "@/components/muscleSvg/integration/MuscleFrontRightArmImg";
import MuscleFrontLeftLegImg from "@/components/muscleSvg/integration/MuscleFrontLeftLegImg";
import MuscleFrontRightLegImg from "@/components/muscleSvg/integration/MuscleFrontRightLegImg";
import MuscleBackBody from "@/components/muscleSvg/integration/MuscleBackBody";
import MuscleBackLeftArm from "@/components/muscleSvg/integration/MuscleBackLeftArm";
import MuscleBackRightArm from "@/components/muscleSvg/integration/MuscleBackRightArm";
import MuscleBackLeftLeg from "@/components/muscleSvg/integration/MuscleBackLeftLeg";
import MuscleBackRightLeg from "@/components/muscleSvg/integration/MuscleBackRightLeg";

const FrontBody: Record<MuscleTypeKey, ComponentType<MuscleSvgProps>> = {
  TRAPEZIUS: FrontBodyTrapezius,
  PECTORALIS_MAJOR: FrontBodyPectoralisMajor,
  EXTERNAL_OBLIQUE: FrontBodyExternalOblique,
  RECTUS_ABDOMINIS: FrontBodyRectusAbdominis,
};

const FrontLeftArm: Record<MuscleTypeKey, ComponentType<MuscleSvgProps>> = {
  CORACOBRACHIALIS: FrontLeftArmCoracobrachialis,
  TRICEPS: FrontLeftArmTriceps,
  BRACHIALIS: FrontLeftArmBrachialis,
  PRONATOR_TERES: FrontLeftArmPronatorTeres,
  DELTOID: FrontLeftArmDeltoid,
  BICEPS: FrontLeftArmBiceps,
  BRACHIORADIALIS: FrontLeftArmBrachioradialis,
  PALMARIS_LONGUS: FrontLeftArmPalmarisLongus,
};

const FrontRightArm: Record<MuscleTypeKey, ComponentType<MuscleSvgProps>> = {
  CORACOBRACHIALIS: FrontRightArmCoracobrachialis,
  TRICEPS: FrontRightArmTriceps,
  BRACHIALIS: FrontRightArmBrachialis,
  PRONATOR_TERES: FrontRightArmPronatorTeres,
  DELTOID: FrontRightArmDeltoid,
  BICEPS: FrontRightArmBiceps,
  BRACHIORADIALIS: FrontRightArmBrachioradialis,
  PALMARIS_LONGUS: FrontRightArmPalimarisLongus,
};

const FrontLeftLeg: Record<MuscleTypeKey, ComponentType<MuscleSvgProps>> = {
  GLUTE: FrontLeftLegGlute,
  TENSOR_FASCIAE_LATAE: FrontLeftLegTensorFasciaeLatae,
  SARTORIUS: FrontLeftLegSartorius,
  VASTUS_LATERALIS: FrontLeftLegVastusLateralis,
  RECTUS_FEMORIS: FrontLeftLegRectusFemoris,
  IT_BAND: FrontLeftLegItBand,
  EXTENSOR_DIGITORUM_LONGUS: FrontLeftLegExtensorDigitorumLongus,
  TIBIALIS_ANTERIOR: FrontLeftLegTibialisAnterior,
  FIBULARIS_LONGUS: FrontLeftLegFibularisLongus,
  EXTENSOR_HALLUCIS_LONGUS: FrontLeftLegExtensorHallucisLongus,
  SOLEUS: FrontLeftLegSoleus,
  GASTROCNEMIUS: FrontLeftLegGastrocnemius,
  VASTUS_INTERMEDIUS: FrontLeftLegVastusIntermedius,
  VASTUS_MEDIALIS: FrontLeftLegVastusMedialis,
  GRACILIS: FrontLeftLegGracilis,
  ADDUCTOR_MAGNUS: FrontLeftLegAdductorMagnus,
  ADDUCTOR_LONGUS: FrontLeftLegAdductorLongus,
  PECTINEUS: FrontLeftLegPectineus,
  PSOAS_MAJOR: FrontLeftLegPsoasMajor,
  ILIACUS: FrontLeftLegIliacus,
};

const FrontRightLeg: Record<MuscleTypeKey, ComponentType<MuscleSvgProps>> = {
  GLUTE: FrontRightLegGlute,
  TENSOR_FASCIAE_LATAE: FrontRightLegTensorFasciaeLatae,
  SARTORIUS: FrontRightLegSartorius,
  VASTUS_LATERALIS: FrontRightLegVastusLateralis,
  RECTUS_FEMORIS: FrontRightLegRectusFemoris,
  IT_BAND: FrontRightLegItBand,
  EXTENSOR_DIGITORUM_LONGUS: FrontRightLegExtensorDigitorumLongus,
  TIBIALIS_ANTERIOR: FrontRightLegTibialisAnterior,
  FIBULARIS_LONGUS: FrontRightLegFibularisLongus,
  EXTENSOR_HALLUCIS_LONGUS: FrontRightLegExtensorHallucisLongus,
  SOLEUS: FrontRightLegSoleus,
  GASTROCNEMIUS: FrontRightLegGastrocnemius,
  VASTUS_INTERMEDIUS: FrontRightLegVastusIntermedius,
  VASTUS_MEDIALIS: FrontRightLegVastusMedialis,
  GRACILIS: FrontRightLegGracilis,
  ADDUCTOR_MAGNUS: FrontRightLegAdductorMagnus,
  ADDUCTOR_LONGUS: FrontRightLegAdductorLongus,
  PECTINEUS: FrontRightLegPectineus,
  PSOAS_MAJOR: FrontRightLegPsoasMajor,
  ILIACUS: FrontRightLegIliacus,
};

const BackBody: Record<MuscleTypeKey, ComponentType<MuscleSvgProps>> = {
  TERES_MINOR: BackBodyTeresMinor,
  TERES_MAJOR: BackBodyTeresMajor,
  LATISSIMUS_DORSI: BackBodyLatissimusDorsi,
  ERECTOR_SPRINAE: BackBodyErectorSprinae,
};

const BackLeftArm: Record<MuscleTypeKey, ComponentType<MuscleSvgProps>> = {
  DELTOID: BackLeftArmDeltoid,
  BRACHIORADIALIS: BackLeftArmBrachioradialis,
  EXTENSOR_CARPI_RADIALIS_LONGUS: BackLeftArmExtensorCarpiRadialisLongus,
  EXTENSOR_DIGITORUM: BackLeftArmExtensorDigitorum,
  TRICEPS: BackLeftArmTriceps,
  ANCONEUS: BackLeftArmAnconeus,
  EXTENSOR_CARPI_ULNARIS: BackLeftArmExtensorCarpiUlnaris,
};

const BackRightArm: Record<MuscleTypeKey, ComponentType<MuscleSvgProps>> = {
  DELTOID: BackRightArmDeltoid,
  BRACHIORADIALIS: BackRightArmBrachioradialis,
  EXTENSOR_CARPI_RADIALIS_LONGUS: BackRightArmExtensorCarpiRadialisLongus,
  EXTENSOR_DIGITORUM: BackRightArmExtensorDigitorum,
  TRICEPS: BackRightArmTriceps,
  ANCONEUS: BackRightArmAnconeus,
  EXTENSOR_CARPI_ULNARIS: BackRightArmExtensorCarpiUlnaris,
};

const BackLeftLeg: Record<MuscleTypeKey, ComponentType<MuscleSvgProps>> = {
  GLUTE: BackLeftLegGluteus,
  IT_BAND: BackLeftLegItBand,
  BICEPS_FEMORIS: BackLeftLegBicepsFemoris,
  GASTROCNEMIUS: BackLeftLegGastrocnemius,
  SOLEUS: BackLeftLegSoleus,
  SEMIMEMBRANOSUS: BackLeftLegSemimembranosus,
  GRACILIS: BackLeftLegGracilis,
  ADDUCTOR_MAGNUS: BackLeftLegAdductorMagnus,
};

const BackRightLeg: Record<MuscleTypeKey, ComponentType<MuscleSvgProps>> = {
  GLUTE: BackRightLegGluteus,
  IT_BAND: BackRightLegItBand,
  BICEPS_FEMORIS: BackRightLegBicepsFemoris,
  GASTROCNEMIUS: BackRightLegGastrocnemius,
  SOLEUS: BackRightLegSoleus,
  SEMIMEMBRANOSUS: BackRightLegSemimembranosus,
  GRACILIS: BackRightLegGracilis,
  ADDUCTOR_MAGNUS: BackRightLegAdductorMagnus,
};

export const MuscleImgMap: Record<
  string,
  Record<MuscleTypeKey, ComponentType<MuscleSvgProps>>
> = {
  앞_몸통: FrontBody,
  앞_왼팔: FrontLeftArm,
  앞_오른팔: FrontRightArm,
  "앞_왼쪽 다리": FrontLeftLeg,
  "앞_오른쪽 다리": FrontRightLeg,

  뒤_몸통: BackBody,
  뒤_왼팔: BackLeftArm,
  뒤_오른팔: BackRightArm,
  "뒤_왼쪽 다리": BackLeftLeg,
  "뒤_오른쪽 다리": BackRightLeg,
};

export const MuscleGroupImgMap: Record<
  string,
  ComponentType<IntergrationMuscleProps>
> = {
  FRONT_TORSO: MuscleFrontBodyImg,
  FRONT_ARM_LEFT: MuscleFrontLeftArmImg,
  FRONT_ARM_RIGHT: MuscleFrontRightArmImg,
  FRONT_LEG_LEFT: MuscleFrontLeftLegImg,
  FRONT_LEG_RIGHT: MuscleFrontRightLegImg,

  BACK_TORSO: MuscleBackBody,
  BACK_ARM_LEFT: MuscleBackLeftArm,
  BACK_ARM_RIGHT: MuscleBackRightArm,
  BACK_LEG_LEFT: MuscleBackLeftLeg,
  BACK_LEG_RIGHT: MuscleBackRightLeg,
};
