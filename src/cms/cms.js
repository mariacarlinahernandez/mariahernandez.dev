import CMS from 'netlify-cms'

import HomePagePreview from "./preview-templates/HomePagePreview"
import AboutPagePreview from "./preview-templates/AboutPagePreview"

CMS.registerPreviewTemplate('home', HomePagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
