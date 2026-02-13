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
        interiors: resolve(__dirname, 'interiors.html'),
        policy: resolve(__dirname, 'policy.html'),
        'profile2/personal': resolve(__dirname, 'profile2/personal.html'),
        'profile2/personal-favorites': resolve(__dirname, 'profile2/personal-favorites.html'),
        'profile2/personal-cart': resolve(__dirname, 'profile2/personal-cart.html'),
        'profile2/personal-orders': resolve(__dirname, 'profile2/personal-orders.html'),
        'profile2/personal-bonus': resolve(__dirname, 'profile2/personal-bonus.html'),
        'profile2/personal-bonus-detail': resolve(__dirname, 'profile2/personal-bonus-detail.html'),
      },
    },
  },
})


