// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Flutter Stacked Architecture - FilledStacks",
  tagline: "The perfect community for your mobile app development project",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "FilledStacks", // Usually your GitHub org/user name.
  projectName: "Stacked Docs", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "light",
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: "Stacked",
        items: [
          {
            type: "doc",
            docId: "getting-started/introduction",
            position: "left",
            label: "Docs",
          },
          // {
          //   position: "left",
          //   label: "Tutorials",
          //   to: "/blog",
          // },
          // { to: "/blog", label: "Contributions", position: "left" },
          // { to: "/blog", label: "Teams", position: "left" },
          {
            to: "https://www.filledstacks.com/",
            label: "Learn",
            position: "right",
            className: "navbar-button",
          },
          {
            to: "https://github.com/FilledStacks/stacked",
            position: "right",
            className: "navbar-icon-button",
          },
        ],
      },
      announcementBar: {
        id: "announcement-top-header",
        content:
          "Custom content" /** content for announcement banner is made manually by importing the react component of docusarus. Found theme/AnnouncementBar folder */,
        backgroundColor: "black",
        textColor: "white",
        isCloseable: false,
      },
      footer: {
        style: "light",
        links: [
          {
            title: "General resources",
            items: [
     
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                to: "https://github.com/FilledStacks/stacked",
              },
              {
                label: "Pub.dev",
                to: "https://pub.dev/packages/stacked",
              },
            ],
          },
          {
            title: "About FilledStacks",
            items: [
              {
                label: "Open Source Software",
                to: "https://github.com/FilledStacks/stacked",
              },
              {
                label: "GitHub",
                to: "https://github.com/FilledStacks/stacked",
              },
            ],
          },
          // {
          //   title: "Legal",
          //   items: [
          //     {
          //       label: "Privacy Policy",
          //       to: "/blog",
          //     },
          //   ],
          // },
        ],
        logo: {
          src: "img/logo.png",
          width: 34,
          height: 34,
        },
        copyright: `Copyright © ${new Date().getFullYear()} FilledStacks, Inc. All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),

  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],
};

module.exports = config;
