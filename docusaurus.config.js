module.exports = {
  title: "Runnerty",
  tagline: "Runnerty docs",
  url: "https://docs.runnerty.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "runnerty", // Usually your GitHub org/user name.
  projectName: "runnerty", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "Runnerty",
      logo: {
        alt: "Runnerty",
        src: "img/logo.png",
      },
      items: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Docs",
          position: "left",
        },
        { to: "blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/runnerty",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "docs/",
            },
            {
              label: "API",
              to: "docs/process",
            },
            {
              label: "Others",
              to: "docs/webservice",
            }
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Slack",
              href: "https://join.slack.com/t/runnerty/shared_invite/enQtMTgxNDQ2NTk2NTk3LTg5Y2JjNzBlMTU3OGY5NDYxYjRiMmQ1Y2ZjNDVjMDk2NmM1MzNhZDYyOGZjOWZhNjFjZDE4MDYxODg0NGJkY2I",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/runnerty_io",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/runnerty",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Runnerty, Inc. Built with Docusaurus.`,
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: false,
      switchConfig: {
        darkIcon: "🌑",
        lightIcon: "💡",
      },
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/runnerty/docs/edit/master/website/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/runnerty/docs/edit/master/website/blog/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
