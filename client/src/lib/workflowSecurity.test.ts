import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const workflow = readFileSync(
  new URL("../../../.github/workflows/deploy-cloudflare.yml", import.meta.url),
  "utf8",
);

describe("Cloudflare deployment workflow", () => {
  it("does not interpolate repository variables directly into shell commands", () => {
    expect(workflow).not.toContain("--project-name=${{ vars.CLOUDFLARE_PAGES_PROJECT");
    expect(workflow).toContain('CF_PAGES_PROJECT: ${{ vars.CLOUDFLARE_PAGES_PROJECT');
    expect(workflow).toContain('--project-name="$CF_PAGES_PROJECT"');
  });

  it("deploys pull requests to their own preview branch without touching main", () => {
    expect(workflow).toMatch(/pull_request:\s*\n\s*branches: \[main\]/);
    expect(workflow).toContain("CF_PAGES_BRANCH: ${{ github.head_ref || 'main' }}");
    expect(workflow).toContain('--branch="$CF_PAGES_BRANCH"');
    expect(workflow).not.toContain("--branch=main");
  });
});
