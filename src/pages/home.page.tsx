import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Element } from "react";

const HomePage = ({ children }: Element) => {
  return (
    <Stack>
      <Card>
        <CardContent>
          <Typography>Welcome to the home page!</Typography>
          {children}
        </CardContent>
      </Card>
    </Stack>
  );
};

export default HomePage;
