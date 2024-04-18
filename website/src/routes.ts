import type { RouteDefinition } from '@solidjs/router'
import { lazy } from 'solid-js'
import Home from './views/home'

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/detail',
    component: lazy(() => import('./views/detail')),
  },
  {
    path: '**',
    component: lazy(() => import('./views/errors')),
  },
]
