import React from 'react';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import TOC from '@theme/TOC';
export default function DocItemTOCDesktop() {
  const { toc, frontMatter } = useDoc();
  return (
    <div>

      <TOC
        toc={toc}
        minHeadingLevel={frontMatter.toc_min_heading_level}
        maxHeadingLevel={frontMatter.toc_max_heading_level}
        className={ThemeClassNames.docs.docTocDesktop}
      />
      <iframe src="https://filledstacks.substack.com/embed" width="320" height="320" style={{ border: "1px solid #EEE", background: "white" }}></iframe>
    </div>
  );
}
