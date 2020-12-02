
import store from '@/store'

export default {
  inserted(el, binding) {
    const { value } = binding
    const buttonPerms = store.getters && store.getters.buttonPerms

    if (value && typeof value === 'string' && value.length > 0) {
      const permission = value
      const hasPermission = buttonPerms.some(button => {
        return permission.includes(button)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need perms ! Like v-autn="'admin'"`)
    }
  }
}
