import { AboutContainer, AboutTitle, AboutDescription } from '../styles/About.styles'
import { useMetaTags } from '../utils/useMetaTags'

const About = () => {
  const metaTags = useMetaTags({
    title: "About OptiVue - Digital Optimization Platform",
    description: "Learn about OptiVue, your comprehensive dashboard for SEO analysis, Facebook Ads management, and digital marketing optimization. Discover how we help businesses improve their online presence.",
    keywords: "about OptiVue, digital optimization, SEO platform, Facebook ads dashboard, marketing analytics",
    ogTitle: "About OptiVue - Transform Your Digital Presence",
    ogDescription: "Discover OptiVue's powerful tools for SEO analysis, Facebook Ads management, and comprehensive digital marketing optimization."
  });

  return (
    <>
      {metaTags}
      <AboutContainer>
        <AboutTitle variant="h4">
          About OptiVue
        </AboutTitle>
        <AboutDescription variant="body1">
          OptiVue is a comprehensive dashboard application designed to help you visualize and optimize your data.
          Our platform provides powerful tools for data analysis, real-time insights, and seamless integration with various data sources.
          Experience the future of data visualization with our intuitive and professional interface.
        </AboutDescription>
      </AboutContainer>
    </>
  )
}

export default About