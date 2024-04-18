#!/usr/bin/env -S deno run --allow-net --allow-read
import { Application, send } from 'https://deno.land/x/oak/mod.ts'

const app = new Application()
const staticPath = Deno.cwd()

// Function to check if a file exists
async function fileExists(path) {
  try {
    const stats = await Deno.lstat(path)
    return stats.isFile
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false
    } else {
      throw error
    }
  }
}

// Timing middleware
app.use(async (context, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  context.response.headers.set('X-Response-Time', `${ms}ms`)
})

// Error handling middleware
app.use(async (context, next) => {
  try {
    await next()
  } catch (error) {
    console.error(error)
    context.response.status = 500
    context.response.body = 'Internal Server Error'
  }
})

// Serve static files
app.use(async (context, next) => {
  const path = `${staticPath}${context.request.url.pathname}`
  await ((await fileExists(path))
    ? send(context, context.request.url.pathname, {
      root: staticPath,
    })
    : next())
})

// Redirect all other requests to '/index.html'
app.use(async (context) => {
  await send(context, '/index.html', { root: staticPath })
})

app.addEventListener('listen', ({ hostname, port }) => {
  console.log(`start listening on ${hostname}:${port}`)
})

await app.listen({ port: 80 })
