import { Card, CardContent, CardHeader } from "@mui/material";
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

const Phase = ({ skills, phaseName, lastPhase }: PhaseRotation) => {
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
        <WeaponSequence skills={skills} />
      </TimelineContent>
    </TimelineItem>
  );
};

export const Rotation = ({ rotation }: { rotation: PhaseRotation[] }) => {
  return (
    <Card variant="outlined" sx={{ flexGrow: 1 }}>
      <CardHeader title="Rotation" />
      <CardContent>
        <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.4,
            },
          }}
        >
          {rotation.map((phase) => <Phase {...phase} />)}
        </Timeline>
      </CardContent>
    </Card>
  );
};
