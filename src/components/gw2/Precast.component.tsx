import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
} from "@mui/material";
import { WeaponSequence } from "./WeaponSequence.component.tsx";
import PrecastConfigJson from "../../configs/precasts.json" with {
  type: "json",
};
import { getRotation, Precast, Skill } from "../../data/utils.ts";
import { PrecastOptions } from "../../gw2/type.ts";
import { NoteComponent } from "./Notes.component.tsx";

export const PrecastComponent = (
  { precasts, scale }: {
    precasts: Precast<PrecastOptions>[];
    scale: number;
  },
) => {
  const [includeNotes, setIncludeNotes] = useState(false);
  const PrecastConfig = PrecastConfigJson as Record<PrecastOptions, {
    id: string;
    name: string;
    skills: Skill[];
    notes?: string[];
  }>;
  const rotations = precasts.map((precast) => {
    const id = typeof precast === "object" ? precast.id : precast;
    return getRotation([{
      skills: PrecastConfig[id].skills,
      phaseName: id,
      lastPhase: false,
      notes: PrecastConfig[id].notes,
    }]);
  }).map((rotation) => rotation[0]);

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

        {rotations.map((precast, index) => {
          const video = precasts.find((p) =>
            typeof p === "object" && p.id === precast.phaseName
          );

          return (
            <Stack direction="column" sx={{ px: 2 }}>
              <CardHeader
                sx={{ px: 0 }}
                subheader={PrecastConfig[precast.phaseName as PrecastOptions]
                  .name}
              />
              <Stack sx={{ flexDirection: "row" }}>
                <WeaponSequence skills={precast["skills"]} sizes={sizes} />
              </Stack>
              {includeNotes && precast.notes && (
                precast.notes.map((note) => <NoteComponent notes={note} />)
              )}
              {includeNotes && typeof video === "object" && video.videos && (
                video.videos.map((v) => {
                  if (v.includes("youtube")) {
                    return (
                      <CardMedia
                        component="iframe"
                        src={v}
                        controls
                        key={v}
                        sx={{ mt: 1, height: 360, width: "100%" }}
                      />
                    );
                  }
                  return (
                    <CardMedia
                      component="video"
                      src={v}
                      controls
                      key={v}
                    />
                  );
                })
              )}
              {index < rotations.length - 1 && <Divider sx={{ my: 1 }} />}
            </Stack>
          );
        })}
      </CardContent>
    </Card>
  );
};
