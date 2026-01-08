import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        catalog: resolve(__dirname, 'catalog.html'),
        'first-product': resolve(__dirname, 'first-product.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        blog: resolve(__dirname, 'blog.html'),
        'blog-post': resolve(__dirname, 'blog-post.html'),
        profile: resolve(__dirname, 'profile.html'),
        orders: resolve(__dirname, 'orders.html'),
        settings: resolve(__dirname, 'settings.html'),
      },
    },
  },
})


