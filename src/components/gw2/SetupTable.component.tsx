import {
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Item } from "@discretize/gw2-ui-new";

type SetupTableProps = {
  relicId: number;
  sigilIds: [number, number];
  consumablesIds: [number, number];
};

const SetupTable = ({ relicId, sigilIds, consumablesIds }: SetupTableProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Relic</TableCell>
            <TableCell>Sigils</TableCell>
            <TableCell>Food & Utility</TableCell>
            <TableCell>Hammer Setup</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Item id={relicId} />
            </TableCell>
            <TableCell>
              <Item id={sigilIds[0]} />
              <Item id={sigilIds[1]} />
            </TableCell>
            <TableCell>
              <Item id={consumablesIds[0]} />
              <Item id={consumablesIds[1]} />
            </TableCell>
            <TableCell>
              <Item id={consumablesIds[0]} />
              <Item id={consumablesIds[1]} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SetupTable;
