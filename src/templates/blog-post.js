import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const meta = {
      pageTitle: post.frontmatter.title
    }

    const { previous, next } = this.props.pageContext
    
    return (
      <Layout siteMeta={meta}>
        <article className="post post-full inner">
          <header className="post-header">
            <h1>{post.frontmatter.title}</h1>
            <p className="post-meta">{post.frontmatter.date}</p>
          </header>
          <section className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        image
      }
    }
  }
`
