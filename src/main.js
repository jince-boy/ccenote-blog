import {createApp} from 'vue'
import App from './App.vue'
import store from './store'
import router from "./router";
import './assets/css/reset.css';
import './assets/iconfont/iconfont.css';
import './permission'
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css'
import axios from "axios";

//顶级await会报错，解决方案再vite.config.js中build中添加target:['edge90','chrome90','firefox90','safari15']
await axios.get('/config.json').then(res => {
    axios.defaults.baseURL = res.data[res.data.env];
})
const app = createApp(App);
app.use(store).use(router).use(ElementPlus).mount('#app')
