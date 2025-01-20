import { Stack, Typography } from "@mui/material";
import Layout from "../components/layout.component.tsx";

const HomePage = () => {
  return (
    <Layout>
      <Stack>
        <Typography>Home Page</Typography>
        <Typography>Welcome to the home page!</Typography>
      </Stack>
    </Layout>
  );
};

export default HomePage;
