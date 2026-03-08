import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import CustomCursor from './CustomCursor'
import ScrollProgress from './ScrollProgress'
import AmbientOrbs from './AmbientOrbs'

export default function Layout({ children, title = 'Buwaneka Halpage — Software Engineer' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Portfolio of Buwaneka Halpage — CS&E undergraduate at the University of Moratuwa, building full-stack projects and exploring modern software engineering." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AmbientOrbs />
      <CustomCursor />
      <ScrollProgress />

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
