import React, { useCallback, useState } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { CopyIcon, GithubIcon } from "../components/Icons";

import { ThemeConfig } from "@docusaurus/preset-classic";
import Features from "../components/Features";

function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
    return;
  }

  var textArea = document.createElement("textarea");
  textArea.value = text;

  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
  } catch (err) {}

  document.body.removeChild(textArea);
}

export default function Home() {
  const {
    siteConfig: { themeConfig, tagline },
  } = useDocusaurusContext();
  const headerImg = (themeConfig as ThemeConfig).navbar!.logo!;

  const [copied, setCopied] = useState(false);

  const copyCommandHandler = useCallback(() => {
    if (copied) return;

    copyToClipboard(
      "dart pub global activate stacked_cli\nstacked create app awesome_app"
    );
    setCopied(true);

    setTimeout(() => setCopied(false), 3000);
  }, []);

  return (
    <>
      <header className="sticky top-0 flex items-center justify-between px-6 py-4 shadow bg-white/20 backdrop-blur-md">
        <div className="flex items-center pointer-events-none select-none">
          <img className="h-8" src={headerImg.src} alt={headerImg.alt} />
          <strong className="pl-4 text-xl">Stacked</strong>
        </div>

        <a
          href="/"
          className="flex items-center px-4 py-2 text-lg text-black transition-all bg-gray-100 rounded-full outline-none ring-transparent focus:ring-purple-500 ring hover:no-underline hover:text-black hover:bg-gray-200"
        >
          <GithubIcon className="mr-4" />
          Github
        </a>
      </header>
      <main className="px-6 py-1 min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-5xl font-black text-center md:text-7xl">
          The
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-800 to-purple-400">
            scalable
          </span>
          <br />
          flutter framework
        </h1>
        <p className="max-w-[50ch] text-center py-2 text-3xl text-gray-500">
          {tagline}
        </p>
        <div className="flex flex-col items-center gap-4 px-6 py-4 md:flex-row">
          <Link
            to="/docs/getting-started/overview"
            className="hover:text-white hover:no-underline px-6 py-4 text-lg font-semibold text-white transition-all bg-black border-none rounded outline-none cursor-pointer ring-transparent focus:ring-purple-500 ring hover:bg-[#444] active:scale-90"
          >
            Get Started
          </Link>
          <p className="flex items-center gap-4 p-4 py-2 m-0 ml-3 font-mono text-lg font-bold bg-gray-200 rounded">
            <span className="text-indigo-700">{">"}</span>stacked create app
            awesome_app
            <button
              className="relative p-2 transition-all bg-transparent border-none rounded-full outline-none cursor-pointer hover:bg-white focus:bg-white active:scale-95"
              onClick={copyCommandHandler}
            >
              <CopyIcon />
              <p
                aria-hidden
                className={`absolute outline-none px-4 py-2 text-green-700 transition-all -translate-y-1/2 rounded opacity-0 bg-gray-300/30 min-w-max left-2 -translate-x-1/2 -top-4 z-20 ${
                  copied ? "opacity-100" : ""
                }`}
              >
                Copied to Clipboard
              </p>
            </button>
          </p>
        </div>
      </main>
      <Features />
    </>
  );
}
