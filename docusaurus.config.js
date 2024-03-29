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
    prism: {
      additionalLanguages: ["powershell"],
    },
    algolia: {
      appId: "DEV",
      apiKey: "DEV",
      indexName: "runnerty",
      searchParameters: { facetFilters: ["type:content", "version:3.2.0"] },
    },
    navbar: {
      title: "Runnerty",
      logo: {
        href: "https://runnerty.io",
        alt: "Runnerty",
        src: "img/logo.png",
        target: "_self",
      },
      items: [
        {
          href: "#",
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          href: "#",
          label: " ",
          position: "right",
        },
        {
          href: "https://medium.com/runnerty",
          label: "Blog",
          position: "left",
        },
        {
          href: "https://github.com/runnerty",
          label: "GitHub",
          position: "left",
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
              to: "/",
            },
            {
              label: "API",
              to: "/process",
            },
            {
              label: "Others",
              to: "/webservice",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Slack",
              href:
                "https://join.slack.com/t/runnerty/shared_invite/enQtMTgxNDQ2NTk2NTk3LTg5Y2JjNzBlMTU3OGY5NDYxYjRiMmQ1Y2ZjNDVjMDk2NmM1MzNhZDYyOGZjOWZhNjFjZDE4MDYxODg0NGJkY2I",
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
      respectPrefersColorScheme: false
    },
    image: "img/runnerty-twitter.jpg",
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/runnerty/docs/edit/master/",
          routeBasePath: "/",
          includeCurrentVersion: false
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        googleAnalytics: {
          trackingID: "UA-61344582-9",
        },
      //  sidebarCollapsible: true,
      },
    ],
  ],
  plugins: ["@docusaurus/plugin-ideal-image"]
};
