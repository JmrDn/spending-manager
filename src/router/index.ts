import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { supabase } from '@/config/supabase'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _ , next) => {
  const { data } = await supabase.auth.getSession()

  const isAuthenticated = !!data.session

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router