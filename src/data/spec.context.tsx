// @deno-types="npm:@types/react@18"
import { createContext, SyntheticEvent } from "react";
import { Specs, SpecType } from "../gw2/type.ts";

export interface SpecContextType {
  activeSpec: Specs;
  specList: Specs[];
  setSpec: (_event: SyntheticEvent | null, spec: Specs) => void;
  specType: SpecType;
}

export const SpecContext = createContext<SpecContextType>({
  activeSpec: Specs.SLB,
  specType: SpecType.POWER,
  specList: [],
  setSpec: (_event, _spec: Specs) => {},
});
