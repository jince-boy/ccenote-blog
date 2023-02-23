import {createStore} from "vuex";
import {getConfig, getMenu} from "../api/config.js";

export default createStore({
    state:{
        token:'',
        name:'',
        avatar:'',
        menu:'',
        pageShow:false,
        config:''
    },
    mutations:{
        setConfig(state,config){
            state.config=config;
        },
        delConfig(state){
            state.config="";
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem("token", token);
        },
        delToken(state) {
            state.token = "";
            localStorage.removeItem("token");
        },
        setName(state, name) {
            state.name = name;
        },
        delName(state) {
            state.name = "";
        },
        setAvatar(state, avatar) {
            state.avatar = avatar;
        },
        delAvatar(state) {
            state.avatar = "";
        },
        setMenu(state, menu) {
            state.menu = menu;
        },
        delMenu(state) {
            state.menu = "";
        },
        setPageShow(state, pageShow) {
            state.pageShow = pageShow;
        },
        delPageShow(state) {
            state.pageShow = false;
        }
    },
    getters:{
        getToken: state => state.token,
        getName: state => state.name,
        getAvatar: state => state.avatar,
        getMenu: state => state.menu,
        getPageShow: state => state.pageShow,
        getConfig:state=>state.config
    },
    actions:{
        getConfig:(context)=>{
            return new Promise(resolve => {
                getConfig().then(res=>{
                    if(res.data.status){
                        context.commit('setConfig',res.data.data);
                    }
                    resolve(res.data.data);
                })
            })
        },
        getMenu:(context)=>{
            return new Promise(resolve => {
                getMenu().then(res=>{
                    if(res.data.status){
                        context.commit('setMenu',res.data.data);
                    }
                    resolve(res.data.data);
                })
            })
        }
    }
})