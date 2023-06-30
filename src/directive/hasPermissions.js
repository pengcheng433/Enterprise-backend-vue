import { useUserStore } from '@/store'
// hasPermissions.js

const haspermission = {
  mounted : function( el, binding ) {
    // console.log( useUserStore )
    const userStore = useUserStore()
    const { value } = binding

    const flag = userStore.permission.some( role => {
      return role == value
    } )
    if ( !flag ) {
      el.parentNode && el.parentNode.removeChild( el )
    }
  }
}

export default haspermission

