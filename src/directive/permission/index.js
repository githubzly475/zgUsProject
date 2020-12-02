import auth from './permission'

const install = function(Vue) {
  Vue.directive('auth', auth)
}

if (window.Vue) {
  window['auth'] = auth
  Vue.use(install); // eslint-disable-line
}

auth.install = install
export default auth
