import { Typography } from "@mui/material";
import { RotationItem } from "./RotationItem.component.tsx";
import { getGw2Ids } from "../../gw2/utils.ts";

// Regex to match the words surrounded by <:word:> and other non-colon text

export const parseNotes = (
  note: string,
): { note: string; isEmbed: boolean }[] => {
  const regex = /(:[\w\.]+:)/g;
  const splitResult = note.trim().split(regex).filter((note) =>
    note !== "" && !!note
  );
  const result = splitResult.map((note) => {
    const isEmbed = /:[\w\.]+:/.test(note);
    return {
      note: isEmbed ? note.replaceAll(":", "") : note,
      isEmbed: isEmbed,
    };
  });
  return result;
};

type NoteProps = {
  notes: string;
};

export const NoteComponent = ({ notes }: NoteProps) => {
  const parsedNotes = parseNotes(notes);

  const childText = parsedNotes.map((note) => {
    if (note.isEmbed) {
      const skill = getGw2Ids(note.note);

      return <RotationItem type={skill.type} id={skill.ids[0]} />;
    } else {
      return note.note;
    }
  });
  return (
    <Typography color="text.secondary" variant="body2">
      {...childText}
    </Typography>
  );
};
