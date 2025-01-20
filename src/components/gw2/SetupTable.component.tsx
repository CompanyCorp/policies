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
  { skillIds, relicId, sigilIds, consumablesIds, weaponName }:
    & TemplateConfig
    & { weaponName?: string },
) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Relic</TableCell>
            {sigilIds && <TableCell>Sigils</TableCell>}
            <TableCell>Food & Utility</TableCell>
            {skillIds && <TableCell>{weaponName} Setup</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Item id={relicId} />
            </TableCell>
            {sigilIds && <LoadoutCell ids={sigilIds} />}
            <LoadoutCell ids={consumablesIds} />
            {skillIds && <WeaponCell ids={skillIds} />}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SetupTable;
