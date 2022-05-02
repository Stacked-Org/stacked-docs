import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageHeader from "../components/homepage/HomepageHeader";
import HomepagePackages from "../components/homepage/HomepagePackages";
import CompanySlider from "../components/homepage/CompanySlider";
import CaseProjects from "../components/homepage/CaseProjects";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Stacked gives you a great developer experience with all the features
      you need for production. Navigation, Dependency Injection, Clear
      Docs, Easy setup with a custom cli for easy setup."
      wrapperClassName="bg-gray-100 landing-page"
    >
      <HomepageHeader />
      <main className="bg-white">
        <HomepagePackages />
        {/* <CompanySlider /> */}
        {/* <CaseProjects /> */}
      </main>
    </Layout>
  );
}
