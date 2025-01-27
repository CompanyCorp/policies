import { Card, CardHeader } from "@mui/material";
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

const Phase = ({ skills, phaseName, lastPhase, scale }: PhaseRotation & { scale: number }) => {
  const sizes = {
    top: `h${scale+1}`,
    main: `h${scale}`,
  };

  return (
    <TimelineItem key={phaseName}>
      <TimelineOppositeContent color="textSecondary">
        {phaseName}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color="secondary" />
        {!lastPhase && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <WeaponSequence skills={skills} sizes={sizes}/>
      </TimelineContent>
    </TimelineItem>
  );
};

export const Rotation = ({ rotation }: { rotation: PhaseRotation[] }) => {
  const scale = 3;
  return (
    <Card variant="outlined" sx={{ flexGrow: 1 }}>
      <CardHeader title="Rotation" subheader={`Scale: ${scale}`}/>
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.4,
          },
        }}
      >
        {rotation.map((phase) => <Phase {...phase} scale={scale} />)}
      </Timeline>
    </Card>
  );
};
