// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'The Production Flutter Framework',
  tagline: 'Build scalable, testable and maintainable code for you and your team.',
  url: 'https://stacked.filledstacks.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  plugins: [
    async function configureTailwind(context, options) {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCss and AutoPrefixer
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        }
      }
    }

  ],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'FilledStacks', // Usually your GitHub org/user name.
  projectName: 'stacked-docs', // Usually your repo name.
  deploymentBranch: 'master',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    localeConfigs: {
      en: { label: 'English' },
      es: { label: 'Español' },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/FilledStacks/stacked-docs/tree/master/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'UA-41171112-5',
          anonymizeIP: false,
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
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: 'Stacked',
        logo: {
          alt: 'Stacked Logo',
          src: 'img/logo.png',
        },
        items: [
          // {
          //   type: 'localeDropdown',
          //   position: 'right',
          // },
          {
            href: 'https://github.com/Filledstacks/stacked',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started/overview',
              },
              {
                label: 'Basics in Depth',
                to: '/docs/basics-in-depth/services',
              },
              {
                label: 'Tooling',
                to: '/docs/tooling/stacked-cli',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Slack',
                href: 'https://filledstacks.slack.com',
              },
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/stacked+flutter',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/filledstacks',
              },
              {
                label: 'Youtube',
                href: 'https://www.youtube.com/c/filledstacks?sub_confirmation=1',
              },
            ],
          },
          {
            title: 'FilledStacks',
            items: [
              {
                label: 'Tutorials',
                href: 'https://filledstacks.com/tutorials',
              },
              {
                label: 'Snippets',
                href: 'https://www.filledstacks.com/snippets'
              },
              {
                label: 'GitHub',
                href: 'https://github.com/filledstacks',
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} FilledStacks, Inc. All rights reserved.`,
      },
      prism: {
        additionalLanguages: ['dart'],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
