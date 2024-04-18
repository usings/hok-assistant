import type { Component } from 'solid-js'

export const Header: Component = () => {
  return (
    <header class="flex-shrink-0 ">
      <a href="/" class="flex items-center gap-8 transition">
        <IconDust width={40} height={40} class="flex-shrink-0" />
        <span class="text-24 color-text select-none hover:color-white">HOK Assistant</span>
      </a>
    </header>
  )
}

export const Footer: Component = () => {
  return (
    <footer class="flex-shrink-0 flex items-center justify-end gap-8 ">
      <span class="text-12 color-text select-none">Made with  ❤️</span>
    </footer>
  )
}
