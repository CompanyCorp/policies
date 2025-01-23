import { Box, Card, CardContent, CardHeader, Stack } from "@mui/material";
import { Item, Skill, Trait } from "@discretize/gw2-ui-new";
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
import { Symbols } from "../../gw2/type.ts";
const WeaponSwapIcon = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignSelf: "end",
        height: "100%",
        paddingBottom: "12px",
      }}
    >
      <img src="/policies/weaponswap.png" height="24px" />
    </Box>
  );
};

const RotationItem = (
  { type, id, style }: {
    type: Symbols;
    id: number;
    style: Record<string, string>;
  },
) => {
  if ([Symbols.RELIC, Symbols.CONSUMABLE, Symbols.SIGIL].includes(type)) {
    return <Item disableText id={id} style={style} />;
  }
  if (type === Symbols.TRAIT) {
    return <Trait disableText id={id} style={style} />;
  }
  return <Skill disableText id={id} style={style} />;
};

const Phase = ({ skills, phaseName, lastPhase }: PhaseRotation) => {
  const mainSkillStyle = { fontSize: "30px", padding: "0px" };
  const topSkillStyle = { fontSize: "20px" };

  return (
    <TimelineItem>
      <TimelineOppositeContent color="textSecondary">
        {phaseName}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color="secondary" />
        {!lastPhase && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Stack direction={"row"} spacing={0.5} sx={{ flexWrap: "wrap" }}>
          {skills.map(({ top, main }) => (
            <>
              <Stack
                direction={"column"}
                key={main.id}
                spacing={-1}
                sx={{
                  alignItems: "center",
                  justifyContent: "end",
                  py: 0,
                  my: 0,
                }}
              >
                {top && (
                  <RotationItem
                    type={top.type}
                    id={top.id}
                    style={topSkillStyle}
                  />
                )}
                {main.id !== 0 && (
                  <RotationItem
                    type={main.type}
                    id={main.id}
                    style={mainSkillStyle}
                  />
                )}
              </Stack>
              {main.id === 0 && <WeaponSwapIcon />}
            </>
          ))}
        </Stack>
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
              flex: 0.2,
            },
          }}
        >
          {rotation.map((phase) => <Phase {...phase} />)}
        </Timeline>
      </CardContent>
    </Card>
  );
};
