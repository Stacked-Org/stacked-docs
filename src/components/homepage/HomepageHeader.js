import React from "react";
import Link from "@docusaurus/Link";

export default function HomepageHeader() {
  return (
    <header className="bg-white">
      <div className="flex flex-col justify-center items-center space-y-8 container mx-auto text-center py-24">
        <div>
          <h1 className="text-5xl md:text-8xl font-black text-black">
            The Flutter Production <br /> Framework
          </h1>
          <p className="md:text-xl py-6 text-gray-500 md:px-20">
            Stacked gives you a great developer experience with all the features
            you need for production. Navigation, Dependency Injection, Clear
            Docs, Easy setup with a custom cli for easy setup.
          </p>
        </div>
        <div className="flex flex-row justify-center space-x-10">
          <Link to="/docs/" className="bg-purple-500 text-white rounded-lg px-6 md:px-16 py-3 shadow-xl shadow-purple-200 hover:text-purple-500 hover:bg-white hover:border-purple-500 transition duration-700 ease-in-out">
            Start Learning
          </Link>
        </div>
        <div className="flex flex-row justify-center items-center space-x-3">
          {/* TODO::Updating the license, if it is not MIT */}
          <p>License: MIT</p>
          <button className="px-2 py-1 rounded-lg text-purple-500 hover:bg-purple-200">
            GitHub
          </button>
        </div>
      </div>
    </header>
  );
}
