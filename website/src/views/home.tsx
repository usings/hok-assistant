import type { Component } from 'solid-js'
import { cache, useNavigate } from '@solidjs/router'
import { ofetch } from 'ofetch'
import { createResource, For, Match, Switch } from 'solid-js'

interface HeroVO {
  cname: string
  ename: string
  iconUrl: string
  title: string
}

const fetcher = cache(async () => {
  const resp = await ofetch('https://www.sapi.run/hero/getHeroList.php', {
    method: 'get',
    retry: 3,
    retryDelay: 200,
  })
  return resp.data.reverse() as HeroVO[]
}, 'hero')

export const Home: Component = () => {
  const navigate = useNavigate()
  const [heroes, { refetch }] = createResource<HeroVO[]>(fetcher)

  return (
    <>
      <Switch fallback={(
        <ul class="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <For each={heroes()}>
            {(hero, idx) => (
              <li
                onClick={() => navigate(`/detail?id=${hero.ename}&name=${hero.cname}`)}
                class="flex items-center gap-8 bg-layer border border-gray/4 rounded-8 p-8 cursor-pointer hover:(bg-layer/60) transition animate-in animate-backwards fade-in slide-in-bottom-4"
                style={{ 'animation-delay': `${idx() * 0.03}s` }}
              >
                <img class="w-40 rounded-full select-none animate-blur" src={hero.iconUrl} alt={hero.cname} loading="lazy" />
                <p class="flex flex-col">
                  <span class="text-16 color-text">{hero.cname}</span>
                  <span class="text-12 color-text/40 select-none">{hero.title}</span>
                </p>
              </li>
            )}
          </For>
        </ul>
      )}
      >
        <Match when={heroes.loading}>
          <p class="flex-grow flex justify-center items-center backdrop-blur-md">
            <IconSpinner />
          </p>
        </Match>
        <Match when={heroes.error}>
          <p
            onClick={() => refetch()}
            class="flex-grow flex flex-col justify-center items-center backdrop-blur-md cursor-pointer"
          >
            <IconError width={60} height={60} />
            <span>retry</span>
          </p>
        </Match>
      </Switch>
    </>
  )
}

export default Home
