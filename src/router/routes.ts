import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'income', component: () => import('pages/IncomePage.vue') },
      { path: 'drafts', component: () => import('pages/DraftsPage.vue') },
      { path: 'outcome', component: () => import('pages/OutcomePage.vue') },
      { path: 'basket', component: () => import('pages/BasketPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
