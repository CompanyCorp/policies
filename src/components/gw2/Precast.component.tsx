import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import { BellOWP } from "./precasts/BellOWP.component.tsx";
import { Brawler } from "./precasts/Brawler.component.tsx";

export const Precasts = () => {
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
      <CardHeader subheader="Bell OWP" />
      <CardContent sx={{ pt: 0 }}>
        <BellOWP />
      </CardContent>
      <Divider sx={{ mx: 2 }} />
      <CardHeader subheader="Brawler Relic Precast" />
      <CardContent sx={{ pt: 0 }}>
        <Brawler />
      </CardContent>
    </Card>
  );
};
