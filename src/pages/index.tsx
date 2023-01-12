import React, { useCallback, useState } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { CopyIcon, GithubIcon } from "../components/Icons";
import { motion } from "framer-motion";

import { ThemeConfig } from "@docusaurus/preset-classic";
import Features from "../components/Features";

export default function Home() {
  const {
    siteConfig: { themeConfig, tagline },
  } = useDocusaurusContext();
  const headerImg = (themeConfig as ThemeConfig).navbar!.logo!;

  return (
    <>
      <header className="sticky top-0 flex items-center justify-between px-6 py-4 shadow bg-white/20 backdrop-blur-md">
        <div className="flex items-center pointer-events-none select-none">
          <img className="h-8" src={headerImg.src} alt={headerImg.alt} />
          <strong className="pl-4 text-xl">Stacked</strong>
        </div>

        <a
          href="https://github.com/Filledstacks/stacked"
          target="_blank"
          className="flex items-center px-4 py-2 text-lg text-black transition-all bg-gray-100 rounded-full outline-none ring-transparent focus:ring-purple-500 ring hover:no-underline hover:text-black hover:bg-gray-200"
        >
          <GithubIcon className="mr-4" />
          Github
        </a>
      </header>
      <main className="px-6 py-1 min-h-[80vh] flex flex-col items-center justify-center">
        <motion.h1
          className="text-5xl font-black text-center md:text-7xl"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
        >
          The{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-800 to-purple-400">
            Flutter framework
          </span>
          <br />
          for production
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <p className="max-w-[50ch] text-center py-2 text-3xl text-gray-500">
            {tagline}
          </p>
          <Link
            to="/docs/getting-started/overview"
            className="hover:text-white hover:no-underline px-6 py-4 text-lg font-semibold text-white transition-all bg-black border-none rounded outline-none cursor-pointer ring-transparent focus:ring-purple-500 ring hover:bg-[#444] active:scale-90"
          >
            Get Started
          </Link>
        </motion.div>
      </main>
    </>
  );
}
