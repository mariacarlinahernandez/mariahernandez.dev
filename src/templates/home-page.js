import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import Hero from "../components/Hero"
import DevtoArticlesPaginated from "../components/DevtoArticlesPaginated"

export const HomePageTemplate = ({ home, preview }) => {
  return <Hero data={home} preview={preview} />
}

HomePageTemplate.defaultProps = {
  preview: false,
}

class HomePage extends React.Component {
  render() {
    const { data } = this.props
    const { frontmatter: home } = data.allMarkdownRemark.nodes[0]
    const meta = {
      pageTitle: home.title,
    }

    return (
      <Layout siteMeta={meta} homePage={true}>
        <HomePageTemplate home={home} />

        <div className="outer">
          <div className="post-feed-title inner">
            My latest articles on Dev.to 🤓
          </div>
          <DevtoArticlesPaginated pageLimit={5} maxPages={6} />
        </div>
      </Layout>
    )
  }
}

HomePage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default HomePage

export const pageQuery = graphql`
  query HomePageQuery {
    allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "home-page" } } }
    ) {
      nodes {
        frontmatter {
          description
          heading
          headline
          path
          title
          templateKey
          headingBg
          profileImg
          socialLinks {
            label
            linkURL
            icon
          }
        }
        html
      }
    }
  }
`
