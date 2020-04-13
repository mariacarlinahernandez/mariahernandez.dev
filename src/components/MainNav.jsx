import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import style from './MainNav.module.css'

const MainNav = ({ hero }) => {
  const data = useStaticQuery(graphql`
    query GetPagesSlugs {
      site {
        siteMetadata {
          image
        }
      }
      allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/pages/i"}}) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            menuLabel
            menuIndex
          }
        }
      }
    }
  `)

  const pages = sortPages(data.allMarkdownRemark.nodes)
  const siteImage = data.site.siteMetadata.image
  let headerStyles = style.siteHeader + ' ' + style.outer
  headerStyles = hero ? headerStyles + ' ' + style.siteHeaderHero : headerStyles

  return (
    <header className={headerStyles}>
      <div className={style.siteHeaderContent}>
        <div className={style.siteBranding}>
          <p className={style.siteLogo}>
            <a href="/">
              <img alt="branding logo" src={siteImage} />
            </a>
          </p>
        </div>

        <nav className={style.mainNavigation} aria-label="Primary Navigation">
          <ul className={style.menu}>

            {pages.map((page, index) => {
              return (
                <li key={index} className={style.menuItem}>
                  <Link to={page.fields.slug}>
                    {page.frontmatter.menuLabel}
                  </Link>
                </li>
              )
            })}

          </ul>

          <button style={{ display: "none" }} className={style.sidebarShow + " " + style.sidebarToggle}>
            <span className={style.screenReaderText}> Open Sidebar </span>
            <span className={style.iconMore} aria-hidden="true">
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}

const sortPages = (pages) => {
  if(pages.length < 1) {
    return []
  }

  return pages.sort((a, b) => {
    if(a.frontmatter.menuIndex > b.frontmatter.menuIndex) {
      return 1
    }
    if(a.frontmatter.menuIndex < b.frontmatter.menuIndex) {
      return -1
    }
    return 0
  })
}

export default MainNav