/**
 * 显示提示消息
 * 封装此方法是为了防止同时出现多个Message
 * 此方法保证全局只有一个message实例
 * */
import { Message as ElementMessage } from 'element-ui'

export const Message = {
  message: {},

  close () {
    if (this.message.close) {
      this.message.close()
    }
  },

  success (text) {
    this.close()
    this.message = ElementMessage.success(text)
  },

  warning (text) {
    this.close()
    this.message = ElementMessage.warning(text)
  },

  info (text) {
    this.close()
    this.message = ElementMessage.info(text)
  },

  error (text) {
    this.close()
    this.message = ElementMessage.error(text)
  }
}
