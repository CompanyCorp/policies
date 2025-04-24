// @deno-types="npm:@types/react@18"
import { useContext } from "react";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Item } from "@discretize/gw2-ui-new";
import { Skill } from "@discretize/gw2-ui-new";
import { TemplateConfig } from "../../data/utils.ts";
import { SpecContext } from "../../data/spec.context.tsx";
import { Specs } from "../../gw2/type.ts";

const LoadoutCell = ({ ids }: { ids: number[] }) => {
  return (
    <TableCell>
      <Stack direction={"column"}>
        {ids.map((id) => (
          <Typography variant="body1" key={id}>
            <Item id={id} style={{ fontSize: "inherit" }} />
          </Typography>
        ))}
      </Stack>
    </TableCell>
  );
};

const WeaponCell = ({ ids }: { ids: number[] }) => {
  return (
    <TableCell>
      <Stack direction={"row"} sx={{ flexWrap: "wrap" }}>
        {ids.map((id) => (
          <Typography variant="h3" key={id}>
            <Skill
              id={id}
              disableText
              style={{ fontSize: "inherit" }}
            />
          </Typography>
        ))}
      </Stack>
    </TableCell>
  );
};

const SetupTable = (
  { skillIds, relicId, sigilIds, consumablesIds, weaponIds }: TemplateConfig,
) => {
  const { activeSpec } = useContext(SpecContext);

  const getUtilityName = () => {
    switch (activeSpec) {
      case Specs.HARB:
        return "Elixir";
      default:
        return "Utility";
    }
  };

  const getWeaponName = () => {
    switch (activeSpec) {
      case Specs.SLB:
        return "Hammer";
      case Specs.REN:
        return "";
      case Specs.HARB:
        return "";
    }
  };

  const utilityName = getUtilityName();
  const weaponName = getWeaponName();

  const isBoth = !!weaponIds && !!skillIds;

  return (
    <TableContainer sx={{ flexGrow: 0, flexShrink: 1, flexBasis: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            {isBoth
              ? (
                <TableCell>
                  <Typography variant="h6">Equipment</Typography>
                </TableCell>
              )
              : (
                <>
                  <TableCell>
                    <Typography variant="h6">Relic</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Sigils</Typography>
                  </TableCell>
                </>
              )}
            <TableCell>
              <Typography variant="h6">Food & Utility</Typography>
            </TableCell>
            {weaponIds && (
              <TableCell>
                <Typography variant="h6">{weaponName} Setup</Typography>
              </TableCell>
            )}
            {skillIds && (
              <TableCell>
                <Typography variant="h6">{utilityName} Setup</Typography>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {isBoth
              ? (
                <TableCell>
                  {sigilIds && (
                    <LoadoutCell
                      ids={[...sigilIds, relicId]}
                    />
                  )}
                </TableCell>
              )
              : (
                <>
                  <LoadoutCell
                    ids={[relicId]}
                  />
                  {sigilIds && (
                    <LoadoutCell
                      ids={sigilIds}
                    />
                  )}
                </>
              )}
            <LoadoutCell ids={consumablesIds} />
            {weaponIds && (
              <WeaponCell
                ids={weaponIds}
              />
            )}
            {skillIds && <WeaponCell ids={skillIds} />}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SetupTable;
