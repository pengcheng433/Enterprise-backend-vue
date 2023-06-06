import CustomForm from './index.vue'
export const DForm = Object.assign( CustomForm, {
  install( app ) {
    app.component( CustomForm.name, CustomForm )
  }
} )

export default DForm
