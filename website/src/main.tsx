/* @refresh reload */
import { Router } from '@solidjs/router'
import DisableDevtool from 'disable-devtool'
import { render } from 'solid-js/web'
import { Footer, Header } from '@/components/boilerplate'
import { routes } from '@/routes'
import '@/design'
import '@unocss/reset/tailwind.css'
import 'uno.css'

if (import.meta.env.PROD) DisableDevtool()

render(() => (
  <>
    <Header />
    <Router>
      {routes}
    </Router>
    <Footer />
  </>
), document.querySelector('#root')!)
