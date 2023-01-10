import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="bg-white py-48">
      <div className="container mx-auto text-center py-24 px-48 md:px-24 sm:px-8">
      <h1 class="text-5xl md:text-8xl font-extrabold leading-tighter tracking-tighter mb-4 aos-init aos-animate" data-aos="zoom-y-out">The <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">production</span><h1>App framework</h1></h1>
        <p className="text-3xl py-2 text-gray-500 px-32">{siteConfig.tagline}</p>

        <div className="py-12">
          <Link
            className="bg-black rounded-md text-white px-16 py-4 text-xl font-bold shadow-xl"
            to="/docs/getting-started/overview"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <html
      title="Stacked"
      description="The Flutter Production Framework">
      <HomepageHeader />
     
    </html>
  );
}
