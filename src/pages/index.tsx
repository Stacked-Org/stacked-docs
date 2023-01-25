import React, { useCallback, useState } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { motion } from "framer-motion";
import { CLIIcon, FormIcon } from "../components/Icons";
import Translate, {translate} from '@docusaurus/Translate';

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
          <Translate id="index.main.title.the">The</Translate>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-800 to-purple-400">
            <Translate id="index.main.title.flutterFramework">Flutter Framework</Translate>
          </span>
          <br />
          <Translate id="index.main.title.forProduction">for Production</Translate>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <p className="max-w-[50ch] text-center py-2 text-3xl text-gray-500">
            <Translate id="index.main.subtitle">Build scalable, testable and maintainable code for you and your team.</Translate>
          </p>
          <Link
            to="/docs/getting-started/overview"
            className="hover:text-white hover:no-underline px-6 py-4 text-lg font-semibold text-white transition-all bg-black border-none rounded outline-none cursor-pointer ring-transparent focus:ring-purple-500 ring hover:bg-[#444] active:scale-90"
          >
            <Translate id="index.main.button">Get Started</Translate>
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
              <Translate id="index.powerfulCli.title">A Powerful CLI</Translate>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="max-w-md text-xl"
            >
              <Translate id="index.powerfulCli.description">Never write boilerplate code again. The Stacked CLI
              generates your Views, Services and more.</Translate>
              <Link to="/docs/tooling/stacked-cli" className="block mt-2">
                <Translate id="index.powerfulCli.button">Learn More</Translate>
              </Link>
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
            <Translate id="index.forms.title">Forms made easy</Translate>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="max-w-md text-xl"
          >
            <Translate id="index.forms.description">No more setting up multiple controllers and cluttering
            up your build function. Let Stacked handle it.</Translate>
            <Link to="/docs/getting-started/form-basics" className="block mt-2">
              <Translate id="index.forms.button">Learn More</Translate>
            </Link>
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
            <Translate id="index.more.title">And a lot more...</Translate>
          </motion.h3>
          <motion.ul
            className="flex flex-col text-lg text-left list-none"
            variants={container}
            initial="hidden"
            whileInView="show"
            transition={{ delay: 0.05, staggerChildren: 1 }}
          >
            <motion.li variants={item}>✅ <Translate id="index.more.stateManagement">State management</Translate></motion.li>
            <motion.li variants={item}>✅ <Translate id="index.mroe.startupLogic">Start-up logic functionality</Translate></motion.li>
            <motion.li variants={item}>✅ <Translate id="index.more.navigation">Navigation</Translate></motion.li>
            <motion.li variants={item}>✅ <Translate id="index.more.dialogBuilders">Dialog UI builders</Translate></motion.li>
            <motion.li variants={item}>✅ <Translate id="index.more.bottomSheetBuilders">BottomSheet UI builders</Translate></motion.li>
            <motion.li variants={item}>✅ <Translate id="index.more.dependencyInversion">Dependency Inversion</Translate></motion.li>
            <motion.li variants={item}>✅ <Translate id="index.more.unitTests">Unit tests example</Translate></motion.li>
          </motion.ul>
        </section>
      </div>
    </>
  );
}
