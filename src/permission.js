import router from './router'
import cookies from '@/utils/cookies'
import { TOKEN } from '@/config/constant'
import getPageTitle from '@/utils/getPageTitle'
import { usePermissionStore } from '@/store' // useUserStore,
import NProgress from '@/utils/progress'

const whiteList = ['/login']
router.beforeEach( async( to, from, next ) => {
  console.log( to )
  NProgress.start()
  document.title = getPageTitle( to.meta?.title )
  const hasToken = cookies.get( TOKEN )
  if ( to.query.title ) {
    document.title = getPageTitle( to.query.title )
  }
  // const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  if ( hasToken && hasToken !== 'undefined' ) {
    const accessRoutes = await permissionStore.SET_ROUTES( 'admin' )

    accessRoutes.forEach( item => {
      router.addRoute( item )
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
