import React from "react";
import Link from "@docusaurus/Link";
import { FiArrowRight } from "react-icons/fi";

const PackagesList = [
  {
    title: "Easy to Use",
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running.
      </>
    ),
    link: "/docs/why-stacked",
  },
  {
    title: "Focus on What Matters",
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
    link: "/docs/",
  },
  {
    title: "Powered by React",
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header.
      </>
    ),
    link: "/docs/hello",
  },
  {
    title: "Powered by React",
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header.
      </>
    ),
    link: "/docs/get-started",
  },
  {
    title: "Powered by React",
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header.
      </>
    ),
    link: "/",
  },
  {
    title: "Powered by React",
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header.
      </>
    ),
    link: "/",
  },
  {
    title: "Easy to Use",
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running.
      </>
    ),
    link: "/",
  },
  {
    title: "Focus on What Matters",
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
    link: "/",
  },
  {
    title: "Powered by React",
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header.
      </>
    ),
    link: "/",
  },
];

function Packages({ title, description, link }) {
  return (
    <div className="md:w-1/2 lg:w-1/3 px-2 mb-5">
      <div className="flex flex-col space-y-4 border rounded-md py-6 px-6 hover:border-transparent hover:shadow-xl transition duration-700 ease-in-out">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="font-light">{description}</p>
        <Link
          to={link}
          className="flex flex-row items-center text-purple-500 space-x-3 text-decoration-none hover:no-underline"
        >
          <p>Documentation</p>
          <FiArrowRight />
        </Link>
      </div>
    </div>
  );
}

export default function HomepagePackages() {
  return (
    <div className="flex flex-col space-y-16 px-2 container w-3/4 py-14">
      {/* Header */}
      <div className="flex flex-col space-y-4 text-center justify-center items-center">
        <h2 className="text-3xl font-bold">The Cross-Platform App SDK</h2>
        <p className="text-gray-500 md:w-2/3 text-center">
          Stacked has all the tools and guides to build apps faster
        </p>
      </div>

      {/* List of Packages in Stacked */}
      <div className="flex flex-wrap -mx-2">
        {PackagesList.map((props, index) => (
          <Packages key={index} {...props} />
        ))}
      </div>
    </div>
  );
}
