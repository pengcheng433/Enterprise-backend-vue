import Layout from '@/layout/index.vue'

export default {
  path : '/setting',
  name : 'Setting',
  component : Layout,
  redirect : '/setting/index',
  meta : {
    title : '系统设置',
    icon : 'nested',
    noCache : false,
    roles : ['admin']
  },
  children : [
    {
      path : 'index',
      name : 'index',
      component : () => import( '@/views/setting/usersmanger/userList.vue' ),
      meta : {
        title : '用户管理',
        noCache : false
      }
    },
    {
      path : 'menumanger',
      name : 'menumanger',
      component : () => import( '@/views/nested/menu2/index.vue' ),
      meta : {
        title : '菜单管理',
        noCache : false
      }
    },
    {
      path : 'person',
      name : 'person',
      component : () => import( '@/views/nested/menu2/index.vue' ),
      meta : {
        title : '个人设置',
        noCache : false
      }
    }

  ]
}
