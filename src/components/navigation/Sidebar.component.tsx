// @deno-types="npm:@types/react@18"
import { forwardRef, useContext } from "react";
import { Link as WouterLink } from "wouter";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeItem2, TreeItem2Props, treeItemClasses } from "@mui/x-tree-view";
import { useTreeItem2Utils } from "@mui/x-tree-view/hooks";
import {
  alpha,
  Link,
  styled,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { SpecContext } from "../../data/spec.context.tsx";
import { CMId, useCondiFights, usePowerFights } from "../../gw2/cms.ts";
import { SpecType } from "../../gw2/type.ts";

const RichStyledTree = styled(RichTreeView)(({ theme }: { theme: Theme }) => ({
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
})) as typeof RichTreeView;

interface LinkLabelProps {
  children: string;
  className: string;
  href?: string;
}

const LinkLabel = ({ children, className, href }: LinkLabelProps) => {
  const theme = useTheme();
  if (href) {
    return (
      <Link
        color={theme.palette.text.primary}
        component={WouterLink}
        href={href}
        className={className}
        underline="none"
        variant="body1"
      >
        {children}
      </Link>
    );
  }
  return (
    <div className={className}>
      <Typography>{children}</Typography>
    </div>
  );
};

const LinkTreeItem = forwardRef((
  props: Omit<TreeItem2Props, "ref">,
  ref: React.Ref<HTMLLIElement>,
) => {
  const { publicAPI } = useTreeItem2Utils({
    itemId: props.itemId,
    children: props.children,
  });

  const item = publicAPI.getItem(props.itemId);

  return (
    <TreeItem2
      {...props}
      ref={ref}
      slots={{
        label: LinkLabel,
      }}
      slotProps={{
        label: { href: item?.href } as LinkLabelProps,
      }}
    />
  );
});

const ChallengeModeTreeView = () => {
  const { specType } = useContext(SpecContext);
  const powerFights = usePowerFights();
  const condiFights = useCondiFights();

  if (specType === SpecType.BOTH) {
    return (
      <RichStyledTree
        items={[...powerFights, ...condiFights]}
        slots={{ item: LinkTreeItem }}
        defaultExpandedItems={[
          CMId.Nightmare,
          CMId.ShatteredObservatory,
          CMId.SunquaPeak,
          CMId.SilentSurf,
        ]}
      />
    );
  }
  if (specType === SpecType.POWER) {
    return (
      <RichStyledTree
        items={powerFights}
        slots={{ item: LinkTreeItem }}
        defaultExpandedItems={[CMId.Nightmare, CMId.ShatteredObservatory]}
      />
    );
  }
  if (specType === SpecType.CONDI) {
    return (
      <RichStyledTree
        items={condiFights}
        slots={{ item: LinkTreeItem }}
        defaultExpandedItems={[CMId.SunquaPeak, CMId.SilentSurf]}
      />
    );
  }
};

export default ChallengeModeTreeView;
