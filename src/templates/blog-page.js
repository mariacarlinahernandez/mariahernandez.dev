import React from "react"
import { graphql } from "gatsby"

import Layout from '../components/Layout'
import BlogEntry from "../components/BlogEntry"

class BlogPage extends React.Component {

  getPostEntries(edges) {
    return edges.map(edge => {
      return {...edge.node.frontmatter, ...edge.node.fields}
    })
  }

  render() {
    const { data } = this.props
    const { frontmatter: blogPage } = data.markdownRemark
    const postEntries = this.getPostEntries(data.allMarkdownRemark.edges)
    const meta = {
      pageTitle: blogPage.title
    }

    return (
      <Layout siteMeta={meta}>
        <header className="post-feed-title inner">
          <h1>Blog</h1>
        </header>
        <div className="post-feed inner-wide">

          {postEntries.length > 0 ? (
            postEntries.map((entry, index) => {
              return (
                <BlogEntry entry={entry} key={index} />
              )
            })
          ) : (
            <p className="info">No blog entry found.</p>
          )}

        </div>
      </Layout>
    )
  }
}

export default  BlogPage

export const pageQuery = graphql`
  query BlogPageQuery {
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/blog/i"}, frontmatter: {templateKey: {nin: "blog-page"}}}) {
      edges {
        node {
          html
          frontmatter {
            title
            image
            description
            date(formatString: "LL")
          }
          fields {
            slug
          }
        }
      }
    }
    markdownRemark(frontmatter: {templateKey: {eq: "blog-page"}}) {
      frontmatter {
        title
        templateKey
        path
        image
      }
    }
  }
`;