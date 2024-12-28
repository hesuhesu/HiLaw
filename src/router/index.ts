import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue';
import MyPage from '../components/MyPage.vue';
import LawDetail from '../components/LawDetail.vue';

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