import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import CustomCursor from './CustomCursor'
import ScrollProgress from './ScrollProgress'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('./canvas/Scene'), { ssr: false })

export default function Layout({ children, title = 'Buwaneka Halpage — Software Engineer' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Portfolio of Buwaneka Halpage, CS&E undergraduate at the University of Moratuwa." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CustomCursor />
      <ScrollProgress />

      <Scene />

      <div id="smooth-wrapper">
        <div id="smooth-content" className="flex flex-col min-h-screen relative z-10 w-full">
          <Navbar />
          <main className="flex-grow w-full">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}
