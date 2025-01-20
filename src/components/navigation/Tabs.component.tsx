import { Tab, Tabs, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";

interface StyledTabsProps {
  role: string;
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const NavigationTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))(({ theme }: {theme: Theme}) => ({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
  },
})) as typeof Tabs;

interface StyledTabProps {
  label: string;
  value: number | string;
}

export const NavigationTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }: {theme: Theme}) => ({
  marginRight: 8,
  textTransform: "uppercase",
  fontSize: theme.typography.pxToRem(18),
  fontWeight: theme.typography.fontWeightBold,
  "&.Mui-selected": {
    color: "#fff",
  },
})) as typeof Tab;
