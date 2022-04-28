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
      description="Description will go into a meta tag in <head />"
      wrapperClassName="bg-gray-100"
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
