import React, { useCallback, useState } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { CopyIcon, GithubIcon } from "../components/Icons";

import { ThemeConfig } from "@docusaurus/preset-classic";
import Features from "../components/Features";

export default function Home() {
  const {
    siteConfig: { themeConfig, tagline },
  } = useDocusaurusContext();
  const headerImg = (themeConfig as ThemeConfig).navbar!.logo!;

  return (
    <>
      <main className="px-6 py-1 min-h-[100vh] flex flex-col items-center justify-center">
        <h1 className="text-5xl font-black text-center md:text-7xl">
          The{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-800 to-purple-400">
            Flutter framework
          </span>
          <br />
          for production
        </h1>
        <p className="max-w-[50ch] text-center py-2 text-3xl text-gray-500">
          {tagline}
        </p>
        <Link
          to="/docs/getting-started/overview"
          className="hover:text-white hover:no-underline px-6 py-4 text-lg font-semibold text-white transition-all bg-black border-none rounded outline-none cursor-pointer ring-transparent focus:ring-purple-500 ring hover:bg-[#444] active:scale-90"
        >
          Get Started
        </Link>
      </main>
    </>
  );
}
