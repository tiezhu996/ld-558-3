import { createRouter, createWebHistory } from 'vue-router';
import MainScreen from '@/pages/MainScreen.vue';
import WasteAnalysis from '@/pages/WasteAnalysis.vue';
import RecyclingScreen from '@/pages/RecyclingScreen.vue';
import CharityScreen from '@/pages/CharityScreen.vue';
import PersonalProfile from '@/pages/PersonalProfile.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'main', component: MainScreen },
    { path: '/waste', name: 'waste', component: WasteAnalysis },
    { path: '/recycling', name: 'recycling', component: RecyclingScreen },
    { path: '/charity', name: 'charity', component: CharityScreen },
    { path: '/personal', name: 'personal', component: PersonalProfile }
  ]
});

