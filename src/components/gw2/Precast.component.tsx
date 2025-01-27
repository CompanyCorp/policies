import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import { WeaponSequence } from "./WeaponSequence.component.tsx";
import PrecastConfigJson from "../../configs/precasts.json" with {
  type: "json",
};
import { getRotation, Skill } from "../../data/utils.ts";
import { Precasts } from "../../gw2/type.ts";

export const PrecastComponent = ({ precasts, scale }: { precasts: Precasts[], scale: number }) => {
  const PrecastConfig = PrecastConfigJson as Record<Precasts, Skill[]>;
  const rotations = precasts.map((precast) =>
    getRotation([{
      skills: PrecastConfig[precast],
      phaseName: precast,
      lastPhase: false,
    }])
  ).map((rotation) => rotation[0]);

  const convertPrecastToHeader = (precast: string) => {
    switch (precast) {
      case Precasts.BELLOWP:
        return "Bell OWP";
      case Precasts.BRAWLER:
        return "Brawler Relic Precast";
      case Precasts.EXEAXE:
        return "Executioner Axe Entry";
      case Precasts.CLAW:
        return "Claw Relic Precast";
      default:
        return "Unknown";
    }
  };

  const sizes = {
    top: `h${scale+1}`,
    main: `h${scale}`,
  };

  return (
    <Card
      variant="outlined"
      sx={{
        flexBasis: "auto",
        flexShrink: 1,
        height: "fit-content",
        width: "100%",
      }}
    >
      <CardHeader title="Precasts" />
      {rotations.map((precast, index) => (
        <>
          <CardHeader subheader={convertPrecastToHeader(precast.phaseName)} />
          <CardContent sx={{ pt: 0 }}>
            <WeaponSequence skills={precast["skills"]} sizes={sizes}/>
          </CardContent>
          {index < rotations.length - 1 && <Divider sx={{ mx: 2 }} />}
        </>
      ))}
    </Card>
  );
};
