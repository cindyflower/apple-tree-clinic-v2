import { LINE_BY_APPLE } from "./constants";

export type BranchLine = (typeof LINE_BY_APPLE)[keyof typeof LINE_BY_APPLE];

/** Map form branch name → Nanjing or Beida LINE account. */
export function resolveLineForBranch(branchName: string): BranchLine | undefined {
  const name = branchName.trim();
  if (!name) return undefined;
  if (name.includes("南京")) return LINE_BY_APPLE.nanjing;
  if (name.includes("北大")) return LINE_BY_APPLE.beida;
  return undefined;
}
