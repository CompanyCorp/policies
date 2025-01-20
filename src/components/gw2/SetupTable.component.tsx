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
        {ids.map((id) => <Item id={id} key={id} />)}
      </Stack>
    </TableCell>
  );
};

const WeaponCell = ({ ids }: { ids: number[] }) => {
  const style = { fontSize: "30px" };
  return (
    <TableCell>
      <Stack direction={"row"}>
        {ids.map((id) => <Skill id={id} key={id} disableText style={style} />)}
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
      case Specs.SLB:
        return "";
      case Specs.REN:
        return "";
      case Specs.HARB:
        return "Elixir";
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

  return (
    <TableContainer sx={{ flexGrow: 0, flexShrink: 1, flexBasis: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Relic</TableCell>
            {sigilIds && <TableCell>Sigils</TableCell>}
            <TableCell>Food & Utility</TableCell>
            {weaponIds && <TableCell>{weaponName} Setup</TableCell>}
            {skillIds && <TableCell>{utilityName} Setup</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Item id={relicId} />
            </TableCell>
            {sigilIds && <LoadoutCell ids={sigilIds} />}
            <LoadoutCell ids={consumablesIds} />
            {weaponIds && <WeaponCell ids={weaponIds} />}
            {skillIds && <WeaponCell ids={skillIds} />}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SetupTable;
