/* @refresh reload */
import { Router } from '@solidjs/router'
import { render } from 'solid-js/web'
import { Footer, Header } from '@/boilerplate'
import { routes } from '@/routes'
import 'uno.css'
import '@unocss/reset/tailwind.css'
import '@/design'

render(() => (
  <section class="flex flex-col gap-20 p-16 min-h-screen">
    <Header />
    <Router>
      {routes}
    </Router>
    <Footer />
  </section>
)
, document.querySelector('#root')!)
