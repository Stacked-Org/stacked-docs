import React, { useCallback, useState } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { motion } from "framer-motion";

export default function Home() {
  const {
    siteConfig: { tagline },
  } = useDocusaurusContext();

  return (
    <>
      <main className="px-6 py-1 min-h-[80vh] flex flex-col items-center justify-center">
        <motion.h1
          className="text-5xl font-black text-center md:text-7xl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
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
          animate={{ opacity: 1 }}
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
