import type { Component } from 'solid-js'

export const Header: Component = () => {
  return (
    <header class="flex-shrink-0 ">
      <a href="/" class="flex items-center gap-8 transition w-fit">
        <IconDust width={40} height={40} class="flex-shrink-0" />
        <span class="text-24 select-none">HOK Assistant</span>
      </a>
    </header>
  )
}

export const Footer: Component = () => {
  return (
    <footer class="flex-shrink-0 flex items-end justify-end gap-8 h-40">
      <span class="text-12 select-none">Made with  ❤️</span>
    </footer>
  )
}
