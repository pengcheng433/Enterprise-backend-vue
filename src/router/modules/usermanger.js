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
      path : 'role',
      name : 'role',
      component : () => import( '@/views/setting/rolemagnet/roleList.vue' ),
      meta : {
        title : '角色管理',
        noCache : false
      }
    },

    {
      path : 'person',
      name : 'person',
      component : () => import( '@/views/page/userCenter/loginHistory.vue' ),
      meta : {
        title : '登录历史',
        noCache : false
      }
    }
  ]
}
