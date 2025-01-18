import { createContext } from "react";
import { Specs } from "../components/gw2/type.ts";

interface SpecContextType {
  activeSpec: Specs;
  specList: Specs[];
  setSpec: (spec: Specs) => void;
}

export const SpecContext = createContext<SpecContextType>({
  index: 0,
  specList: [Specs.SLB, Specs.HARB],
  setSpec: (_spec: Specs) => {},
});
