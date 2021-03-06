module.exports = {
    siteMetadata: {
        title: `Amazing Pandas Eating Things`,
      },
    plugins: [
      {
        resolve: `gatsby-plugin-netlify-cms`,
        options: {
          enableIdentityWidget: false,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `src`,
          path: `${__dirname}/src/`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `blog`,
          path: `${__dirname}/blog`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `blog-esp`,
          path: `${__dirname}/_posts`,
        },
      },
      `gatsby-transformer-remark`,
      `gatsby-plugin-emotion`,
      {
        resolve: `gatsby-plugin-typography`,
        options: {
          pathToConfigModule: `src/utils/typography`,
        },
      },
    ],
  }