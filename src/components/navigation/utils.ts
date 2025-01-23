// @deno-types="npm:@types/react@18"
import { useContext } from "react";
import { SpecContext } from "../../data/spec.context.tsx";
import { SpecType, SpecTypeMap } from "../../gw2/type.ts";
import { useRouter } from "wouter";
import {
  isCondiFight,
  isPowerFight,
  useCondiFights,
  usePowerFights,
} from "../../gw2/cms.utils.ts";

export const parseLocation = (input: string, _user?: string) => {
  let page = input;
  // if forward-slash exists, remove it
  if (page.includes("/")) {
    const pages = page.split("/");

    page = pages[pages.length - 1];
    // console.log("parseLocation", pages, _user);
  }
  // if ? exists, remove it and everything after it
  if (page.includes("?")) {
    page = page.split("?")[0];
  }
  return page;
};

/**
 * if activeSpec is power and page is condi, redirect to power fight pages
 * if activeSpec is condi and page is power, redirect to condi fight pages
 * example:
 *  active spec is "SLB"
 *  page is "sunqua"
 *  return a power fight URL
 */
export const useRedirectSpec = (path: string) => {
  let page = parseLocation(path, "useRedirectSpec");
  // if page is a base page, get the actual page from the router
  if (page === "") {
    const router = useRouter();
    page = parseLocation(router.base, "useRedirectSpec '' ");
  }
  const { activeSpec } = useContext(SpecContext);
  const specIsPower = SpecTypeMap[activeSpec] === SpecType.POWER;
  const specIsCondi = SpecTypeMap[activeSpec] === SpecType.CONDI;
  if (specIsPower) {
    const pageIsCondi = isCondiFight(page);
    const powerFights = usePowerFights();
    return pageIsCondi ? powerFights[0].href || null : null;
  }
  if (specIsCondi) {
    const pageIsPower = isPowerFight(page);
    const condiFights = useCondiFights();
    return pageIsPower ? condiFights[0].href || null : null;
  }
  return null;
};
