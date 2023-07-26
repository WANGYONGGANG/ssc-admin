import settings from "@/config/settings";
import { RoutesDataItem } from "@/utils/routes";
import BlankLayout from '@/layouts/BlankLayout.vue';

const IndexLayoutRoutes: Array<RoutesDataItem> = [
  {
    icon: 'home',
    title: 'universal-layout.menu.home',
    path: '/home',
    redirect: settings.homeRouteItem.path,
    component: BlankLayout,
    children: [
      {
        ...settings.homeRouteItem
      },
      
    ],
  },
  {
    icon: 'page',
    title: 'universal-layout.menu.pages',
    path: '/pages',
    redirect: '/pages/list/card-img',
    component: BlankLayout,
    children: [
      {
        icon: 'list',
        title: 'universal-layout.menu.pages.list',
        path: 'list',
        redirect: '/pages/list/card-img',
        component: BlankLayout,
        children: [
          {
            title: 'universal-layout.menu.pages.list.card-img',
            path: 'card-img',
            component: ()=> import('@/views/pages/list/card-img/index.vue'),
          },
          {
            title: 'universal-layout.menu.pages.list.search',
            path: 'search',
            component: ()=> import('@/views/pages/list/search/table/index.vue'),
          },
        ],
      },
    ],
  },


];

export default IndexLayoutRoutes;