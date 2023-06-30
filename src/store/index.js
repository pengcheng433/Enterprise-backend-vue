import { createPinia } from 'pinia'
import useUserStore from './modules/users'
import useTagsViewStore from './modules/tagsView'
import useAppStore from './modules/app'
import useSettingsStore from './modules/settings'
import usePermissionStore from './modules/permission'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const store = createPinia()

export function registerStore( app ) {
  store.use( piniaPluginPersistedstate )
  app.use( store )
}

export { useUserStore, useTagsViewStore, useAppStore, useSettingsStore, usePermissionStore }

export default store
