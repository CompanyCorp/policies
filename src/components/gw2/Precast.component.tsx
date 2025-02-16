import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
} from "@mui/material";
import { WeaponSequence } from "./WeaponSequence.component.tsx";
import PrecastConfigJson from "../../configs/precasts.json" with {
  type: "json",
};
import { getRotation, Precast } from "../../data/utils.ts";
import { Precasts } from "../../gw2/type.ts";
import { NoteComponent } from "./Notes.component.tsx";

export const PrecastComponent = (
  { precasts, scale }: { precasts: Precasts[]; scale: number },
) => {
  const [includeNotes, setIncludeNotes] = useState(false);
  const PrecastConfig = PrecastConfigJson as Record<Precasts, Precast>;
  const rotations = precasts.map((precast) =>
    getRotation([{
      skills: PrecastConfig[precast].skills,
      phaseName: precast,
      lastPhase: false,
      notes: PrecastConfig[precast].notes,
    }])
  ).map((rotation) => rotation[0]);

  const sizes = {
    top: `h${scale + 1}`,
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
      <CardContent sx={{ pt: 0 }}>
        <FormControlLabel
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

        {rotations.map((precast, index) => (
          <Stack direction="column">
            <CardHeader
              subheader={PrecastConfig[precast.phaseName as Precasts].name}
            />
            <Stack sx={{ flexDirection: "row", px: 2 }}>
              <WeaponSequence skills={precast["skills"]} sizes={sizes} />
            </Stack>
            {includeNotes && precast.notes && (
              precast.notes.map((note) => <NoteComponent notes={note} />)
            )}
            {index < rotations.length - 1 && <Divider sx={{ mx: 2 }} />}
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
};
