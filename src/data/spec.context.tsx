import { createContext } from "react";
import { Specs, SpecType } from "@gw2";

export interface SpecContextType {
  activeSpec: Specs;
  specList: Specs[];
  setSpec: (spec: Specs) => void;
  specType: SpecType;
}

export const SpecContext = createContext<SpecContextType>({
  index: 0,
  specList: [Specs.SLB, Specs.HARB],
  setSpec: (_spec: Specs) => {},
});
