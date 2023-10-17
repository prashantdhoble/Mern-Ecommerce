import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { Checkbox } from 'antd';

const Layout = ({ children,title,description, keyword,author }) => {
  return (
    <div>
      {/**Seo friendly */}
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="keywords" content={keyword}/>
        <meta name="author" content={author}/>
      </Helmet>

      {/**Header-- */}
      <Header />

      {/**main or Middle content */}
      <main style={{ height: "170vh" }}>
        <Toaster />
        {children}
      </main>

      {/**Footer */}
      <Footer />

    </div>
  )
}

export default Layout