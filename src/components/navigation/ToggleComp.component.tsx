import { ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import { CompType } from "../../data/utils.ts";
import { Attribute } from "@discretize/gw2-ui-new";

export type ToggleCompButtonsProps = {
  activeCompType: CompType;
  setCompType: (compType: CompType) => void;
  healDisabled?: boolean;
  noHealDisabled?: boolean;
};

export const ToggleCompButtons = (
  { activeCompType, setCompType, healDisabled, noHealDisabled }:
    ToggleCompButtonsProps,
) => {
  return (
    <ToggleButtonGroup
      size="small"
      exclusive
      color="secondary"
      value={activeCompType}
      onChange={(_, newCompType) => !!newCompType && setCompType(newCompType)}
    >
      <Tooltip title="Heal">
        <ToggleButton
          value={CompType.Heal}
          sx={{ p: 2 }}
          disabled={healDisabled}
        >
          <Attribute
            style={{ fontSize: "1.5rem" }}
            name="Healing Power"
            disableText={true}
            disableLink={true}
            disableTooltip={true}
          />
          {/* <Favorite /> */}
        </ToggleButton>
      </Tooltip>
      <Tooltip title="No Heal">
        <ToggleButton
          value={CompType.NoHeal}
          sx={{ p: 2 }}
          disabled={noHealDisabled}
        >
          <Attribute
            style={{ fontSize: "1.5rem" }}
            name="Power"
            disableText={true}
            disableLink={true}
            disableTooltip={true}
          />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
};
