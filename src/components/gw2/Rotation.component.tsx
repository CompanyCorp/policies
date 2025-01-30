import { Card, CardHeader, Stack } from "@mui/material";
import { PhaseRotation } from "../../data/utils.ts";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineSeparator,
} from "@mui/lab";
import { WeaponSequence } from "./WeaponSequence.component.tsx";

const Phase = (
  { skills, phaseName, lastPhase, scale, bossPhase }: PhaseRotation & {
    scale: number;
  },
) => {
  const sizes = {
    top: `h${scale + 1}`,
    main: `h${scale}`,
  };

  return (
    <TimelineItem key={phaseName}>
      <TimelineOppositeContent

        sx={{ fontWeight: "medium", color: bossPhase ? "text.primary" : "text.secondary" }}
      >
        {phaseName}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color={bossPhase ? "secondary" : "info"} />
        {!lastPhase && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent
        /* @ts-ignore */
        as={Stack}
        direction={"row"}
        spacing={0.3}
        sx={{ flexWrap: "wrap", pb: 4, mt: -2 }}
      >
        <WeaponSequence skills={skills} sizes={sizes} />
      </TimelineContent>
    </TimelineItem>
  );
};

export const Rotation = (
  { rotation, scale }: { rotation: PhaseRotation[]; scale: number },
) => {
  return (
    <Card variant="outlined" sx={{ flexGrow: 1 }}>
      <CardHeader title="Rotation" />
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        {rotation.map((phase, index) => (
          <Phase {...phase} scale={scale} key={`phase-${index}`} />
        ))}
      </Timeline>
    </Card>
  );
};
