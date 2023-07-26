import settings from "@/config/settings";
import { RoutesDataItem } from "@/utils/routes";
import BlankLayout from '@/layouts/BlankLayout.vue';

const IndexLayoutRoutes: Array<RoutesDataItem> = [
  {
    icon: 'home',
    title: 'index-layout.menu.home',
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
    title: 'index-layout.menu.pages',
    path: '/pages',
    redirect: '/pages/list/card-img',
    component: BlankLayout,
    children: [
      {
        icon: 'list',
        title: 'index-layout.menu.pages.list',
        path: 'list',
        redirect: '/pages/list/card-img',
        component: BlankLayout,
        children: [
          {
            title: 'index-layout.menu.pages.list.card-img',
            path: 'card-img',
            component: ()=> import('@/views/pages/list/card-img/index.vue'),
          },
          {
            title: 'index-layout.menu.pages.list.search',
            path: 'search',
            component: ()=> import('@/views/pages/list/search/table/index.vue'),
          },
        ],
      },
      
    ],
  },

  

];

export default IndexLayoutRoutes;