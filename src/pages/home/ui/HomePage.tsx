import { About } from '@widgets/about';
import { Contact } from '@widgets/contact';
import { Footer } from '@widgets/footer';
import { Header } from '@widgets/header';
import { Hero } from '@widgets/hero';

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        {/* <Work /> */}
        <Contact />
      </main>
      <Footer />
    </>
  )
}
