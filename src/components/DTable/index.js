import CustomTable from './index.vue'
export const DTable = Object.assign( CustomTable, {
  install( app ) {
    app.component( CustomTable.name, CustomTable )
  }
} )

export default DTable
