import Vue from 'vue'
import { Button } from 'element-ui'
import {Form,FormItem,Input} from 'element-ui'
import {Message} from 'element-ui'

// element-ui是按需导入
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

// 全局挂载message
Vue.prototype.$message = Message;

