import { Box, Paper, Stack } from "@mui/material";
import { Skill } from "@discretize/gw2-ui-new";
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
          {skills.map((skill) => (
            <>
              <Stack
                direction={"column"}
                key={skill.main}
                spacing={-1}
                sx={{
                  alignItems: "center",
                  justifyContent: "end",
                  py: 0,
                  my: 0,
                }}
              >
                {skill?.top && (
                  <Skill disableText id={skill.top} style={topSkillStyle} />
                )}
                {skill.main !== 0 && (
                  <Skill disableText id={skill.main} style={mainSkillStyle} />
                )}
              </Stack>
              {skill.main === 0 && <WeaponSwapIcon />}
            </>
          ))}
        </Stack>
      </TimelineContent>
    </TimelineItem>
  );
};

export const Rotation = ({ rotation }: { rotation: PhaseRotation[] }) => {
  return (
    <Paper sx={{ flexShrink: 1 }} variant="outlined">
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        {rotation.map((phase) => <Phase {...phase} />)}
      </Timeline>
    </Paper>
  );
};
