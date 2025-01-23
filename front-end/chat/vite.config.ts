import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


export default function ({mode}: {mode: string}) {  
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}
  const AWS_DJANGO_STATIC_BUCKET = process.env.VITE_AWS_DJANGO_STATIC_BUCKET
  const AWS_LOCATION = 'static'
  const AWS_S3_CUSTOM_DOMAIN = `${AWS_DJANGO_STATIC_BUCKET}.s3.amazonaws.com`
  const staticURL = `https://${AWS_S3_CUSTOM_DOMAIN}/${AWS_LOCATION}/`
  console.log("mode: ", mode)
  console.log("static url: ", staticURL)
  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    base: mode != 'local-dev' 
      ? staticURL + 'front-end/chat'
      : 'http://localhost:3000/',
    build: {
      outDir: '../../static/front-end/chat',
      emptyOutDir: true,
      manifest: true,
      rollupOptions: {
        // overwrite default .html entry
        input: '/src/main.tsx',
      },
    },
    server: {
      port: 3000,
      strictPort: true
    }
  })
}
