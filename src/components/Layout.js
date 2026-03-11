import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import CustomCursor from './CustomCursor'
import ScrollProgress from './ScrollProgress'
import AmbientOrbs from './AmbientOrbs'
import ClickSpark from './ClickSpark'

export default function Layout({ children, title = 'Buwaneka Halpage — Software Engineer' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Portfolio of Buwaneka Halpage — CSE undergraduate at the University of Moratuwa, building full-stack projects and exploring modern software engineering." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AmbientOrbs />
      <CustomCursor />
      <ScrollProgress />

      <ClickSpark sparkColor="#a8ff3e" sparkCount={8} sparkRadius={24} sparkSize={7} duration={480}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </ClickSpark>
    </>
  )
}
