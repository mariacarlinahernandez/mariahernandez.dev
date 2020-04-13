import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"

import Layout from '../components/Layout'

export const AboutPageTemplate = ({ page, content }) => {
  return (
    <article className="post post-full inner">
      <header className="post-header">
        <h1>{ page.title }</h1>
      </header>
      <div className="post-content">
        <h2>{ page.secondTitle }</h2>
        <div dangerouslySetInnerHTML={{__html: content }} />
        <div>
          <img src={page.image} alt={ page.title } />
        </div>
      </div>
    </article>
  )
}

class AboutPage extends React.Component {
  render() {
    const { data } = this.props
    const { frontmatter: aboutPage, html } = data.markdownRemark
    const meta = {
      pageTitle: aboutPage.title
    }

    return (
      <Layout siteMeta={meta} homePage={false}>
        <AboutPageTemplate page={aboutPage} content={html}/>
      </Layout>
    )
  }
}

AboutPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  })
};

export default AboutPage

export const pageQuery = graphql`
  query AboutPageQuery {
    markdownRemark(frontmatter: {templateKey: {eq: "about-page"}}) {
      frontmatter {
        title
        templateKey
        secondTitle
        path
        image
      }
      html
    }
  }  
`;