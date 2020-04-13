import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import Speaking from "../components/Speaking"

export const SpeakingPageTemplate = ({ page, speaking }) => {

  return (
    <div className="inner">
      <header className="post-header">
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: page.excerpt }}
        />
      </header>
      <div className="post-content">
        <Speaking
          title="Upcoming Events"
          speaking={speaking.upcomingSpeaking}
        />

        <Speaking title="Past Events" speaking={speaking.pastSpeaking} />
      </div>
    </div>
  )
}

class SpeakingPage extends React.Component {
  getEntries(edges) {
    return edges.map(edge => {
      return { ...edge.node.frontmatter }
    })
  }

  getUpcomingSpeakins(edges) {
    // get the entries
    let entries = this.getEntries(edges)

    // filter the upcoming entries
    return entries.filter(entry => {
      return entry.isPast !== true
    })
  }

  getPastSpeaking(edges) {
    // get the entries
    let entries = this.getEntries(edges)
    // filter the past entries
    return entries.filter(entry => {
      return entry.isPast === true
    })
  }

  render() {
    const { data } = this.props
    const { frontmatter: speakingPage } = data.markdownRemark
    const meta = {
      pageTitle: speakingPage.title,
    }
    const upcomingSpeaking = this.getUpcomingSpeakins(
      data.allMarkdownRemark.edges
    )
    const pastSpeaking = this.getPastSpeaking(data.allMarkdownRemark.edges)

    return (
      <Layout siteMeta={meta} homePage={false}>
        <SpeakingPageTemplate
          page={speakingPage}
          speaking={{ pastSpeaking, upcomingSpeaking }}
        />
      </Layout>
    )
  }
}

export default SpeakingPage

export const pageQuery = graphql`
  query SpeakingPageQuery {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/speaking/i" }
        frontmatter: { templateKey: { nin: "speaking-page" } }
      }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            event
            location
            url
            isPast
            slideUrl
            videoUrl
          }
        }
      }
    }
    markdownRemark(frontmatter: { templateKey: { eq: "speaking-page" } }) {
      frontmatter {
        title
        templateKey
        path
        image
        excerpt
      }
    }
  }
`
