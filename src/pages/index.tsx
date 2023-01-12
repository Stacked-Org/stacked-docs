import React, { useCallback, useState } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { motion } from "framer-motion";
import { CLIIcon, FormIcon } from "../components/Icons";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { y: 25, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

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

      <div className="bg-gray-50">
        <section className="container text-center md:text-left flex gap-4 flex-col-reverse md:flex-row justify-evenly items-center min-h-[35vh] mx-auto py-16">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex justify-center md:justify-start"
            >
              <CLIIcon />
            </motion.div>
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                type: "spring",
                bounce: 0.5,
              }}
              className="text-4xl"
            >
              A Powerful CLI
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="max-w-md text-xl"
            >
              Never write boilerplate code again. With Stacked CLI you can
              generate Views, Services and more. Focus on the code, we take care
              of the tedious tasks for you
              <a href="/docs/tooling/stacked-cli" className="block mt-2">
                Learn More
              </a>
            </motion.p>
          </div>
          <motion.img
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="w-full max-w-2xl"
            src="/img/landing/cli.svg"
            alt=""
          />
        </section>
      </div>
      <section className="container text-center md:text-left flex gap-4 flex-col-reverse md:flex-row-reverse justify-evenly items-center min-h-[35vh] mx-auto py-16">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center md:justify-start"
          >
            <FormIcon />
          </motion.div>
          <motion.h3
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              type: "spring",
              bounce: 0.5,
            }}
            className="text-4xl"
          >
            Forms made easy
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="max-w-md text-xl"
          >
            No more setting up multiple controllers and forgetting to dispose
            the
            <a href="/docs/getting-started/form-basics" className="block mt-2">
              Learn More
            </a>
          </motion.p>
        </div>
        <motion.img
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="w-full max-w-2xl"
          src="/img/landing/forms.svg"
          alt=""
        />
      </section>
      <div className="bg-gray-50">
        <section className="container text-center md:text-left flex gap-4 flex-col justify-evenly items-center min-h-[35vh] mx-auto py-16">
          <motion.h3
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              type: "spring",
              bounce: 0.5,
            }}
            className="text-4xl"
          >
            And a lot more...
          </motion.h3>
          <motion.ul
            className="flex flex-col text-lg text-left list-none"
            variants={container}
            initial="hidden"
            whileInView="show"
            transition={{ delay: 0.05, staggerChildren: 1 }}
          >
            <motion.li variants={item}>✅ State management</motion.li>
            <motion.li variants={item}>
              ✅ Start-up logic functionality
            </motion.li>
            <motion.li variants={item}>✅ Navigation</motion.li>
            <motion.li variants={item}>✅ Dialog UI builders</motion.li>
            <motion.li variants={item}>✅ BottomSheet UI builder</motion.li>
            <motion.li variants={item}>✅ Dependency Inversion</motion.li>
            <motion.li variants={item}>✅ Unit tests example</motion.li>
          </motion.ul>
        </section>
      </div>
    </>
  );
}
