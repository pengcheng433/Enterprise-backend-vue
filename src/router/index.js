import {
  createRouter,
  // createWebHistory,
  createWebHashHistory
} from 'vue-router'
import Layout from '@/layout/index.vue'
import usermanger from './modules/usermanger'
// import customComponents from './modules/customComponents'

// 配置路由信息
export const constantRoutes = [
  {
    path : '/redirect',
    name : 'Redirect',
    component : Layout,
    meta : {
      title : 'Redirect',
      hidden : true
    },
    children : [
      {
        path : '/redirect/:path(.*)',
        name : 'Redirect',
        component : () => import( '@/views/redirect/index.vue' ),
        meta : {
          title : 'Redirect',
          hidden : true
        }
      }
    ]
  },
  {
    path : '/login',
    name : 'Login',
    component : () => import( '@/views/login/index.vue' ),
    meta : {
      hidden : true,
      title : '登录'
    }
  },
  {
    path : '/404',
    name : 'Error404',
    component : () => import( '@/views/error/404.vue' ),
    meta : {
      hidden : true,
      title : '404'
    }
  },
  {
    path : '/401',
    name : 'Error401',
    component : () => import( '@/views/error/401.vue' ),
    meta : {
      hidden : true,
      title : '401'
    }
  },
  {
    path : '/500',
    name : 'Error500',
    component : () => import( '@/views/error/500.vue' ),
    meta : {
      hidden : true,
      title : '500'
    }
  }
]

export const asyncRoutes = [
  {
    path : '/',
    name : 'Dashboard',
    component : Layout,
    redirect : '/dashboard',
    meta : {
      title : '主页'
    },
    children : [
      {
        path : 'dashboard',
        name : 'Dashboard',
        component : () => import( '@/views/dashboard/index.vue' ),
        meta : {
          title : '主页',
          icon : 'dashboard',
          noCache : true,
          affix : true
        }
      }
    ]
  },

  // {
  //   path : '/directive',
  //   name : 'Directive',
  //   component : Layout,
  //   meta : {
  //     title : '指令'
  //   },
  //   children : [
  //     {
  //       path : 'index',
  //       component : () => import( '@/views/directive/index.vue' ),
  //       name : 'Index',
  //       meta : { title : '指令', icon : 'directive', noCache : true }
  //     }
  //   ]
  // },

  // customComponents,
  {

    path : '/news',
    name : 'news',
    component : Layout,
    meta : { title : '文章新闻', icon : 'text', noCache : true, roles : ['admin'] },
    children : [
      {
        path : 'newscategory',
        component : () => import( '@/views/news/newscategory.vue' ),
        name : 'newscategory',
        meta : { title : '分类管理', noCache : true }
      },
      {
        path : 'newlist',
        component : () => import( '@/views/news/newsList.vue' ),
        name : 'newlist',
        meta : { title : '文章列表', noCache : true }
      },
      {
        path : 'addnews',
        component : () => import( '@/views/news/addNews.vue' ),
        name : 'addnews',
        meta : { title : '添加文章', noCache : true }
      },
      {
        path : 'editNews',
        hidden : true,
        component : () => import( '@/views/news/editNews.vue' ),
        name : 'editNews',
        meta : { title : '编辑文章', noCache : true }
      }
    ]
  },
  {
    path : '/products',
    name : 'products',
    component : Layout,
    meta : { title : '产品中心', icon : 'table', noCache : true, roles : ['admin'] },
    children : [
      {
        path : 'productscategory',
        component : () => import( '@/views/products/productscategory.vue' ),
        name : 'productscategory',
        meta : { title : '产品分类', noCache : true }
      },
      {
        path : 'productList',
        component : () => import( '@/views/products/product.vue' ),
        name : 'productList',
        meta : { title : '产品列表', noCache : true }
      }
    ]
  },
  {
    path : '/clients',
    name : 'clients',
    component : Layout,
    meta : { title : '客户中心', icon : 'about', noCache : true, roles : ['admin'] },
    children : [
      {
        path : 'clientsSeaList',
        component : () => import( '@/views/clients/messageList.vue' ),
        name : 'clientsSeaList',
        meta : { title : '留言客户', noCache : true }
      },
      {
        path : 'clientsList',
        component : () => import( '@/views/clients/clientsList.vue' ),
        name : 'clientsList',
        meta : { title : '客户公海', noCache : true }
      }
    ]
  },
  usermanger,

  {
    path : '/:pathMatch(.*)',
    redirect : '/404',
    name : 'Redirect404',
    meta : {
      title : '404',
      hidden : true
    }
  }
]

const router = createRouter( {
  history : createWebHashHistory( './' ),
  routes : constantRoutes.concat( asyncRoutes ),
  scrollBehavior : () => ( { left : 0, top : 0 } )
} )

export function resetRouter() {
  const WHITE_NAME_LIST = ['Login']
  router.getRoutes().forEach( route => {
    const { name } = route
    if ( name && !WHITE_NAME_LIST.includes( name ) ) {
      router.hasRoute( name ) && router.removeRoute( name )
    }
  } )
}

export default router
