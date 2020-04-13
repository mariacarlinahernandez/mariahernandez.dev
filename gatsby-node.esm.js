const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { sortByDate } = require("./src/utils/date.helpers")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // graphql query for pages only
  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, limit: 1000, filter: {fileAbsolutePath: {regex: "/(pages|blog)/i"}}) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date
              }
            }
          }
        }
      }
    `
  )
  // if errors then throw
  if (result.errors) {
    throw result.errors
  }
  console.log("Creating pages ---->>>>")
  // Create pages
  createPages(result.data.allMarkdownRemark.edges, createPage)
  console.log("Creating posts ---->>>>")
  // create posts
  createPosts(result.data.allMarkdownRemark.edges, createPage)
}

const createPages = (edges, createPage) => {
  // filter only pages
  const pages = edges.filter((edge) => {
    if ("templateKey" in edge.node.frontmatter && edge.node.frontmatter.templateKey) {
      return edge
    }
  })

  // create pages with the filtered edges
  pages.map(page => {
    const id = page.node.id
    console.log("Creating page", JSON.stringify(page.node.frontmatter))
    createPage({
      path: page.node.fields.slug,
      // getting the component to render the page using the templateKey property
      component: path.resolve(`src/templates/${String(page.node.frontmatter.templateKey)}.js`),
      context: {
        slug: page.node.fields.slug,
        id,
      },
    })
  })
}

const createPosts = (edges, createPage) => {
  // filter only posts
  const posts = edges.filter(edge => {
    if(edge.node.frontmatter.date) {
      return {
        id: edge.node.id,
        slug: edge.node.fields.slug,
        date: edge.node.frontmatter.date
      }
    }
  })

  // sort the posts by date
  const sortedPosts = sortByDate(posts, 'desc')
  // pointers to previous and next node posts
  let previous, next

  sortedPosts.map((post, index) => {
    if((index+1) < posts.length) {
      previous = sortedPosts[index + 1].node
    } else {
      previous = null
    }

    console.log("Creating post", JSON.stringify(post))

    createPage({
      path: post.node.fields.slug,
      component: path.resolve(`src/templates/blog-post.js`),
      context: {
        slug: post.node.fields.slug,
        id: post.node.id,
        previous,
        next
      }
    })

    next = post.node
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
