import type { Component } from 'solid-js'
import { cache, useSearchParams } from '@solidjs/router'
import { ofetch } from 'ofetch'
import { createResource, For, Match, Show, Switch } from 'solid-js'

interface DetailVO {
  uid: string
  name: string
  alias: string
  platform: string
  photo: string
  area: string
  areaPower: string
  city: string
  cityPower: string
  province: string
  provincePower: string
  guobiao: string
  stamp: string
  updatetime: string
}

type Channel = 'iwx' | 'awx' | 'iqq' | 'aqq'

async function request(_name: string, type: Channel) {
  const resp = await ofetch('https://www.sapi.run/hero/select.php', {
    method: 'get',
    query: { hero: _name, type },
    retry: 3,
    retryDelay: 200,
  })
  return resp.data as DetailVO
}

const fetcher = cache((name: string) => {
  return Promise.all([
    request(name, 'iwx'),
    request(name, 'awx'),
    request(name, 'iqq'),
    request(name, 'aqq'),
  ])
}, 'detail')

export const Detail: Component = () => {
  const [searchParams] = useSearchParams()
  const [scores, { refetch }] = createResource<DetailVO[], string>(searchParams.name, fetcher)

  return (
    <section class="flex-grow min-h-0 flex flex-col justify-start gap-20">
      <div class="w-full aspect-[16/7] bg-base rounded-8 overflow-hidden flex-shrink-0">
        <img class="object-cover animate-blur" src={`https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/${searchParams.id}/${searchParams.id}-bigskin-1.jpg`} alt="" />
      </div>

      <Switch fallback={(
        <ul class="grid md:grid-cols-2 gap-20">
          <For each={scores()}>
            {(score, idx) => (
              <li
                class="relative p-16 bg-base border-base rounded-8 flex flex-col gap-16 overflow-hidden transition animate-in animate-backwards fade-in slide-in-bottom-4"
                style={{ 'animation-delay': `${idx() * 0.1}s` }}
              >
                <Show
                  when={idx() % 2 === 1}
                  fallback={<IconApple class="absolute top--8 right-0 w-80 h-80 opacity-10" />}
                >
                  <IconAndroid class="absolute top--30 right-0 w-85 h-85 opacity-10 rotate-180" />
                </Show>
                <h3 class="text-18 flex flex-col select-none">
                  <span class="bg-gray/10 color-green dark:(bg-#182723 color-#6FFFAF) w-fit px-8 rounded-4">{score.platform.split('-')[1]}</span>
                  <time class="opacity-40 text-12 select-none underline decoration-dashed">{score.updatetime}</time>
                </h3>
                <div class="flex flex-col gap-8">
                  <div class="flex items-center gap-4 w-full">
                    <IconLocation class="w-16 h-16"></IconLocation>
                    <span class="flex-grow opacity-60">{score.province}</span>
                    <span class="w-40 text-right">{score.provincePower}</span>
                  </div>
                  <div class="flex items-center gap-4 w-full">
                    <IconLocation class="w-16 h-16"></IconLocation>
                    <span class="flex-grow opacity-60">{score.city}</span>
                    <span class="w-40 text-right">{score.cityPower}</span>
                  </div>
                  <div class="flex items-center gap-4 w-full">
                    <IconLocation class="w-16 h-16"></IconLocation>
                    <span class="flex-grow opacity-60">{score.area}</span>
                    <span class="w-40 text-right">{score.areaPower}</span>
                  </div>
                </div>
              </li>
            )}
          </For>
        </ul>
      )}
      >
        <Match when={scores.loading}>
          <p class="flex-grow flex justify-center items-center backdrop-blur-md">
            <IconSpinner />
          </p>
        </Match>
        <Match when={scores.error}>
          <p
            onClick={() => refetch()}
            class="flex-grow flex flex-col justify-center items-center backdrop-blur-md cursor-pointer"
          >
            <IconError width={60} height={60} />
            <span>retry</span>
          </p>
        </Match>
      </Switch>
    </section>
  )
}

export default Detail
