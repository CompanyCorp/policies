import { styled, Tab, Tabs } from "@mui/material";

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
))(({ theme }) => ({
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
}));

interface StyledTabProps {
  label: string;
  value: number | string;
}

export const NavigationTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  marginRight: theme.spacing(1),
  textTransform: "uppercase",
  fontSize: theme.typography.pxToRem(18),
  fontWeight: theme.typography.fontWeightBold,
  "&.Mui-selected": {
    color: "#fff",
  },
}));
