const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'DomeniereJS',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  //base: "/domeniere/",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#2708A0' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', sizes: '152x152', href: 'https://domeniere.com/mobile-icon.jpg'}]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'https://github.com/Perivel/domeniere',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: true,
    logo: 'logo.png',
    searchPlaceholder: "Search Site",
    nav: [
      // {
      //   text: 'Home',
      //   link: '/',
      // },
      {
        text: 'Documentation',
        link: '/docs/v3/',
      },
      // {
      //   text: 'Contribute',
      //   link: '/contribute/',
      // }
    ],
    sidebar: {
      '/docs/v2/': [
        {
          title: 'Getting Started',
          collapsable: false,
          children: [
            ['/docs/v2/', 'First Steps'],
            //['philosophy', 'Philosophy'],
            ['project-structure', 'Project Structure']
          ]
        },
        {
          title: 'Fundamentals',
          collapsable: false,
          children: [
            ['/docs/v2/values', 'Values'],
            ['/docs/v2/entities', 'Entities'],
            ['/docs/v2/aggregates', 'Aggregates'],
            ['/docs/v2/factories', 'Factories'],
            ['/docs/v2/repositories', 'Repositories'],
            ['/docs/v2/services', 'Services'],
            ['/docs/v2/events', 'Events'],
            ['/docs/v2/modules', 'Modules'],
            ['/docs/v2/dtos', 'Data Transfer Objects'],
            ['/docs/v2/specifications', 'Specifications'],
            ['/docs/v2/api', 'Api']
          ]
        },
        {
          title: 'Deployment',
          collapsable: false,
          children: [
            ['/docs/v2/building-your-application', 'Building Your Application'],
            ['/docs/v2/using-your-application', 'Using Your Application'],
          ]
        },
      ],
      '/docs/v3/': [
        {
          title: 'Getting Started',
          collapsable: false,
          children: [
            ['/docs/v3/', 'First Steps'],
            //['philosophy', 'Philosophy'],
            ['project-structure', 'Project Structure']
          ]
        },
        {
          title: 'Fundamentals',
          collapsable: false,
          children: [
            ['/docs/v3/values', 'Values'],
            ['/docs/v3/entities', 'Entities'],
            ['/docs/v3/aggregates', 'Aggregates'],
            ['/docs/v3/factories', 'Factories'],
            ['/docs/v3/repositories', 'Repositories'],
            ['/docs/v3/services', 'Services'],
            ['/docs/v3/events', 'Events'],
            ['/docs/v3/modules', 'Modules'],
            ['/docs/v3/dtos', 'Data Transfer Objects'],
            ['/docs/v3/specifications', 'Specifications'],
            ['/docs/v3/api', 'Api']
          ]
        },
        {
          title: 'Deployment',
          collapsable: false,
          children: [
            ['/docs/v3/building-your-application', 'Building Your Application'],
            ['/docs/v3/using-your-application', 'Using Your Application'],
          ]
        },
      ],
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
