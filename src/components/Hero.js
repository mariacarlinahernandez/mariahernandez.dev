import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import MainNav from "./MainNav"
import style from './Hero.module.css'

class HeroComponent extends React.Component {
  render() {
    // get the props
    const { data, preview } = this.props

    return (
      <div className={style.heroWrapper}>
        <div className={style.heroBackground} style={{ "backgroundImage": `url(${data.headingBg})` }}> </div>

        {(() => {
          if(preview) return null

          return <MainNav hero={true} />
        })()}

        <section className={style.hero + " " + style.outer}>
          <div className={style.content}>
            <div className={style.heroAvatar}>
              <img alt="Vx. Super Di" className={style.avatar} src={data.profileImg} />
            </div>
            <h2 className={style.heroTitle}>{ data.heading }</h2>
            <p className="heroDescription">{ data.headline }</p>

            <p className={style.socialLinks}>
              {data.socialLinks.map((social, index) => {
                return (
                  <a href={social.linkURL} target="_blank" rel="noopener noreferrer" key={index}>
                    <FontAwesomeIcon icon={['fab',`${social.icon}`]} />
                  </a>
                )
              })}
            </p>
          </div>
        </section>

      </div>
    )
  }
}

export default HeroComponent