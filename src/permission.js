import router from './router'
import cookies from '@/utils/cookies'
import { TOKEN } from '@/config/constant'
import getPageTitle from '@/utils/getPageTitle'
import { usePermissionStore, useUserStore } from '@/store' // useUserStore,
import NProgress from '@/utils/progress'
const whiteList = ['/login']
const hasFunPermit = ( item, userStore ) => {
  if ( item.name === 'news' ) {
    // 处理 news 路由
    const newsCategoryPermission = userStore.includes( 'NewsCategoryModule' )
    item.children.forEach( ( child ) => {
      if ( child.name === 'newscategory' ) {
        child.hidden = !newsCategoryPermission
      } else if ( child.name === 'newlist' ) {
        const newsPermission = userStore.includes( 'NewsModule' )
        child.hidden = !newsPermission
      } else if ( child.name === 'addnews' ) {
        const newsPermission = userStore.includes( 'addNews' )
        console.log( newsPermission )

        child.hidden = !newsPermission
      }
    } )
  } else if ( item.name === 'products' ) {
    // 处理 products 路由
    const productCategoryPermission = userStore.includes( 'ProductCategoryModule' )
    item.children.forEach( ( child ) => {
      if ( child.name === 'productscategory' ) {
        child.hidden = !productCategoryPermission
      } else if ( child.name === 'productList' ) {
        const productPermission = userStore.includes( 'ProductModules' )
        child.hidden = !productPermission
      }
    } )
  } else if ( item.name === 'clients' ) {
    // 处理 clients 路由
    const messageWallPermission = userStore.includes( 'MessageWallModule' )
    const customerPermission = userStore.includes( 'CustomerModule' )
    item.children.forEach( ( child ) => {
      if ( child.name === 'clientsSeaList' ) {
        child.hidden = !messageWallPermission
      } else if ( child.name === 'clientsList' ) {
        child.hidden = !customerPermission
      }
    } )
  } else if ( item.name === 'Setting' ) {
    // 处理 Setting 路由
    const userPermission = userStore.includes( 'UserModules' )
    const rolePermission = userStore.includes( 'RoleModule' )
    const loginPermission = userStore.includes( 'LoginModule' )
    item.children.forEach( ( child ) => {
      if ( child.name === 'index' ) {
        child.hidden = !userPermission
      } else if ( child.name === 'role' ) {
        child.hidden = !rolePermission
      } else if ( child.name === 'person' ) {
        child.hidden = !loginPermission
      }
    } )
  }

  return item
}

router.beforeEach( async( to, from, next ) => {
  NProgress.start()
  document.title = getPageTitle( to.meta?.title )
  const hasToken = cookies.get( TOKEN )
  if ( to.query.title ) {
    document.title = getPageTitle( to.query.title )
  }

  const permissionStore = usePermissionStore()
  const userStore = useUserStore()
  if ( hasToken && hasToken !== 'undefined' ) {
    const accessRoutes = await permissionStore.SET_ROUTES( 'admin' )
    accessRoutes.forEach( item => {
      // 判断左侧菜单栏 是否有有模块
      const newitem = hasFunPermit( item, userStore.permission )
      // router.addRoute( item )
      // console.log( userStore, hasFunPermit )
      router.addRoute( newitem )
    } )

    // 给左侧数据子集都为hidden的时候 父级也不需要了
    accessRoutes.forEach( ( route ) => {
      if ( route.children && route.children.length > 0 ) {
        const allHidden = route.children.every( ( child ) => child.hidden === true )
        route.hidden = allHidden
      }
    } )

    next()
    // if ( to.path === '/login' ) {
    //   next( { path : '/' } )
    //   NProgress.done()
    //   console.log( 22222 )
    // } else {
    //   const hasRoles = userStore.roles && userStore.roles.length > 0
    //   console.log( hasRoles )
    //   console.log( 3333 )

    //   if ( hasRoles ) {
    //     next()
    //   } else {
    //     try {
    //       console.log( 'userStore.GET_USER_INFO()' )

    //       const { roles } = await userStore.GET_USER_INFO()
    //       console.log( roles )

    //       const accessRoutes = await permissionStore.SET_ROUTES( roles )
    //       accessRoutes.forEach( item => {
    //         router.addRoute( item )
    //       } )
    //       next( { ...to, replace : true } )
    //     } catch ( error ) {
    //       await userStore.RESET_INFO()
    //       next( '/login' )
    //       NProgress.done()
    //     }
    //   }
    // }
  } else {
    if ( whiteList.indexOf( to.path ) !== -1 ) {
      next()
    } else {
      next( '/login' )
      NProgress.done()
    }
  }
} )

router.afterEach( () => {
  NProgress.done()
} )
