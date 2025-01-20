// @deno-types="npm:@types/react@18"
import { useContext } from "react";
import { SpecContext } from "../../data/spec.context.tsx";
import {
  condiFights,
  isCondiFight,
  isPowerFight,
  powerFights,
} from "../../gw2/cms.ts";
import { SpecType, SpecTypeMap } from "../../gw2/type.ts";
import { useRouter } from "wouter";

export const parseLocation = (input: string) => {
  let page = input;
  // if forward-slash exists, remove it
  if (input.charAt(0) === "/") {
    page = page.slice(1);
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
  let page = parseLocation(path);
  // if page is a base page, get the actual page from the router
  if (page === "") {
    const router = useRouter();
    page = parseLocation(router.base);
  }
  const { activeSpec } = useContext(SpecContext);
  const specIsPower = SpecTypeMap[activeSpec] === SpecType.POWER;
  const specIsCondi = SpecTypeMap[activeSpec] === SpecType.CONDI;
  if (specIsPower) {
    const pageIsCondi = isCondiFight(page);
    return pageIsCondi ? powerFights[0].href || null : null;
  }
  if (specIsCondi) {
    const pageIsPower = isPowerFight(page);
    return pageIsPower ? condiFights[0].href || null : null;
  }
  return null;
};
