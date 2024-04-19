/* @refresh reload */
import { Router } from '@solidjs/router'
import { render } from 'solid-js/web'
import { Footer, Header } from '@/components/boilerplate'
import { routes } from '@/routes'
import 'uno.css'
import '@unocss/reset/tailwind.css'
import '@/design'

render(() => (
  <>
    <Header />
    <Router>
      {routes}
    </Router>
    <Footer />
  </>
), document.querySelector('#root')!)
