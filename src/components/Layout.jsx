import React from "react"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

// import { rhythm, scale } from "../utils/typography"
import Footer from "../components/Footer"
import style from './Layout.module.css'
import SEO from "./seo"
import MainNav from "./MainNav"

// creating the library for Font Awesome
library.add(fab)

const Layout = ({ children, siteMeta, homePage }) => {
  const { pageTitle } = siteMeta
  let childContainerStyles = "fadeInDown delay_05s"
  childContainerStyles = homePage ? childContainerStyles : childContainerStyles + " " + "site-content outer"

  return (
    <div className={style.page}>
      <SEO title={pageTitle} />

      {(() => {
        if(homePage) return null

        return  <MainNav hero={false} />
      })()}

      <section className={childContainerStyles}>
        {children}
      </section>

      <Footer />
    </div>
  )
}

Layout.defaultProps = {
  homePage: false
}

export default Layout
