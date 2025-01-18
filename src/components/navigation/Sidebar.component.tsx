import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { ChallengeMode, CMFight, CMFightId, CMId } from "../gw2/cms.ts";
import { alpha, styled } from "@mui/material";
import { treeItemClasses } from "@mui/x-tree-view";

const power: TreeViewBaseItem[] = [
  {
    id: CMId.Nightmare,
    label: ChallengeMode.Nightmare,
    children: [
      { id: CMFightId.MAMA, label: CMFight.MAMA },
      { id: CMFightId.Siax, label: CMFight.Siax },
      { id: CMFightId.Ensolyss, label: CMFight.Ensolyss },
    ],
  },
  {
    id: CMId.ShatteredObservatory,
    label: ChallengeMode.ShatteredObservatory,
    children: [
      { id: CMFightId.Skorvald, label: CMFight.Skorvald },
      { id: CMFightId.Artsariiv, label: CMFight.Artsariiv },
      { id: CMFightId.Arkk, label: CMFight.Arkk },
    ],
  },
];

const condi: TreeViewBaseItem[] = [
  {
    id: CMId.SunquaPeak,
    label: ChallengeMode.SunquaPeak,
    children: [
      { id: CMFightId.ElementalAi, label: CMFight.ElementalAi },
      { id: CMFightId.DarkAi, label: CMFight.DarkAi },
    ],
  },
  {
    id: CMId.SilentSurf,
    label: ChallengeMode.SilentSurf,
  },
];

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
        items={[...power, ...condi]}
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
        items={power}
        defaultExpandedItems={[CMId.Nightmare, CMId.ShatteredObservatory]}
      />
    );
  }
  if (isCondi) {
    return (
      <RichStyledTree
        items={condi}
        defaultExpandedItems={[CMId.SunquaPeak]}
      />
    );
  }
};

export default ChallengeModeTreeView;
