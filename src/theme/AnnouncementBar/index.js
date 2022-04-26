/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useThemeConfig, useAnnouncementBar } from "@docusaurus/theme-common";
import { translate } from "@docusaurus/Translate";
import IconClose from "@theme/IconClose";
import styles from "./styles.module.css";
import { FiArrowRight } from "react-icons/fi";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function AnnouncementBar() {
  const { isActive, close } = useAnnouncementBar();
  const { announcementBar } = useThemeConfig();
  const { siteConfig } = useDocusaurusContext();

  if (!isActive) {
    return null;
  }

  const { backgroundColor, textColor, isCloseable } = announcementBar;
  return (
    <div
      className={styles.announcementBar}
      style={{
        backgroundColor,
        color: textColor,
      }}
      role="banner"
    >
      {isCloseable && <div className={styles.announcementBarPlaceholder} />}

      {/* Custom content */}
      <div
        className="container flex flex-row text-center justify-between w-screen xl:w-2/3" // Developer provided the HTML, so assume it's safe.
      >
        <Link to={"/"} className="flex flex-row items-center space-x-2 announcement-banner-links">
          <img src={"img/logo_white.png"} width="25" />
          <p className="font-bold">{siteConfig.organizationName}</p>
        </Link>
        <Link
          className="flex flex-row items-center space-x-2 announcement-banner-links"
          to={"https://filledstacks.com"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>
            Deploy <b> Stacked </b> in seconds
          </p>
          <FiArrowRight />
        </Link>
      </div>
      {/* End of custom content */}

      {isCloseable ? (
        <button
          type="button"
          className={clsx("clean-btn close", styles.announcementBarClose)}
          onClick={close}
          aria-label={translate({
            id: "theme.AnnouncementBar.closeButtonAriaLabel",
            message: "Close",
            description: "The ARIA label for close button of announcement bar",
          })}
        >
          <IconClose width={14} height={14} strokeWidth={3.1} />
        </button>
      ) : null}
    </div>
  );
}
