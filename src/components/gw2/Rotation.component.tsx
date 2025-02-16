import React, { useState } from "react";
import {
  Card,
  CardHeader,
  FormControlLabel,
  Stack,
  Switch,
} from "@mui/material";
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
import { NoteComponent } from "./Notes.component.tsx";

const Phase = (
  { skills, phaseName, lastPhase, scale, bossPhase, notes }:
    & PhaseRotation
    & {
      scale: number;
      notes?: string[];
    },
) => {
  const sizes = {
    top: `h${scale + 1}`,
    main: `h${scale}`,
  };

  return (
    <TimelineItem key={phaseName}>
      <TimelineOppositeContent
        sx={{
          fontWeight: "medium",
          color: bossPhase ? "text.primary" : "text.secondary",
        }}
      >
        {phaseName}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color={bossPhase ? "secondary" : "info"} />
        {!lastPhase && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent sx={{ flexWrap: "wrap", pb: 4, mt: -2 }}>
        <Stack
          direction={"row"}
          spacing={0.3}
          sx={{ flexWrap: "wrap" }}
        >
          <WeaponSequence skills={skills} sizes={sizes} />
        </Stack>

        {notes && notes.length > 0 && (
          notes.map((note) => <NoteComponent notes={note} />)
        )}
      </TimelineContent>
    </TimelineItem>
  );
};

export const Rotation = (
  { rotation, scale }: { rotation: PhaseRotation[]; scale: number },
) => {
  const [includeNotes, setIncludeNotes] = useState(false);

  return (
    <Card variant="outlined" sx={{ flexGrow: 1 }}>
      <CardHeader title="Rotation" />
      <FormControlLabel
        sx={{ px: 2 }}
        control={
          <Switch
            color="secondary"
            // @ts-ignore <type is right, deno is wrong lol>
            checked={includeNotes}
            onChange={() => setIncludeNotes(!includeNotes)}
            inputProps={{ "aria-label": "include-notes", role: "switch" }}
          />
        }
        label="Include notes"
        slotProps={{
          typography: {
            variant: "body2",
            color: "text.secondary",
          },
        }}
      />
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        {rotation.map((phase, index) => (
          <Phase
            {...phase}
            scale={scale}
            key={`phase-${index}`}
            notes={includeNotes && phase.notes}
          />
        ))}
      </Timeline>
    </Card>
  );
};
