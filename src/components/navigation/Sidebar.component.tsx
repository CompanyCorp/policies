import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { CMId, condiFights, powerFights } from "../gw2/cms.ts";
import { alpha, styled } from "@mui/material";
import { treeItemClasses } from "@mui/x-tree-view";

const RichStyledTree = styled(RichTreeView)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    borderRadius: 0,
    borderLeft: `1px solid ${alpha(theme.palette.text.primary, 0.4)}`,
  },
  [`& .${treeItemClasses.label}`]: {
    fontSize: "1.2rem",
    fontWeight: 500,
  },
  [`& .${treeItemClasses.content}.${treeItemClasses.expanded}`]: {
    borderRadius: 0,
    borderLeft: `0px solid ${theme.palette.secondary.main}`,
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 10,
    paddingLeft: 18,
    [`& .${treeItemClasses.selected}`]: {
      borderLeft: `1px solid ${theme.palette.secondary.main}`,
    },
  },
}));

const ChallengeModeTreeView = (
  { isPower, isCondi }: { isPower: boolean; isCondi: boolean },
) => {
  if (isPower && isCondi) {
    return (
      <RichStyledTree
        items={[...powerFights, ...condiFights]}
        defaultExpandedItems={[
          CMId.Nightmare,
          CMId.ShatteredObservatory,
          CMId.SunquaPeak,
        ]}
      />
    );
  }
  if (isPower) {
    return (
      <RichStyledTree
        items={powerFights}
        defaultExpandedItems={[CMId.Nightmare, CMId.ShatteredObservatory]}
      />
    );
  }
  if (isCondi) {
    return (
      <RichStyledTree
        items={condiFights}
        defaultExpandedItems={[CMId.SunquaPeak, CMId.SilentSurf]}
      />
    );
  }
};

export default ChallengeModeTreeView;
