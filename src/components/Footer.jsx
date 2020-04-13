import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import style from './Footer.module.css'

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      markdownRemark(fileAbsolutePath: {regex: "/metadata/i"}) {
        frontmatter {
          author
          copyrightYear
          socialLinks {
            icon
            label
            linkURL
          }
          title
          description
        }
      }
    }
  `)

  const siteMeta = data.markdownRemark.frontmatter

  return (
    <footer className={style.siteFooter + ' ' + style.outer}>
      <div className={style.content}>
        <p className="socialLinks">
          {siteMeta.socialLinks.map((social, index) => {
            return (
              <a href={social.linkURL} target="_blank" rel="noopener noreferrer" key={index}>
                <FontAwesomeIcon icon={['fab',`${social.icon}`]} />
              </a>
            )
          })}
        </p>

        <p className={style.siteInfo}>
          <a href="/">{siteMeta.title}</a>  © {siteMeta.copyrightYear}.
        </p>
      </div>
    </footer>
  )
}

export default Footer