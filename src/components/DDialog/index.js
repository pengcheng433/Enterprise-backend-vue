import CustomDioalog from './index.vue'
export const DDialog = Object.assign( CustomDioalog, {
  install( app ) {
    app.component( CustomDioalog.name, CustomDioalog )
  }
} )

export default DDialog
