import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import MyPage from '../pages/MyPage.vue';
import LawDetail from '../pages/LawDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage,
  },
  { 
    path: '/law-detail/:caseId',
    name: 'LawDetail',
    component: LawDetail,
    props: true,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;