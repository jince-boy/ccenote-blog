import{createRouter,createWebHistory} from "vue-router";
const modules=import.meta.glob("../views/**/**.vue");
const constantRouter=[
    {
        path:'/',
        name:'index',
        redirect:'list',
        component:modules[`../views/index.vue`],
        meta:{
            title:'首页'
        },
        children:[
            {
                path:'/',
                name:'list',
                component: modules[`../views/list.vue`],
                meta:{
                    title:'首页'
                }
            },
            {
                path:'/user',
                name:'user',
                component: modules[`../views/user.vue`],
                meta:{
                    title:'个人资料'
                }
            },
            {
                path:'/user/edit',
                name:'userEdit',
                component:modules[`../views/edit.vue`],
                meta:{
                    title:'资料编辑'
                }
            },
            {
                path:'/article',
                name:'article',
                component: modules[`../views/article.vue`],
                meta:{
                    title:'文章'
                }
            },
            {
                path:'/category',
                name:'category',
                component: modules[`../views/category.vue`],
                meta:{
                    title:'分类'
                }
            },
            {
                path:'/tag',
                name:'tag',
                component: modules[`../views/tag.vue`],
                meta:{
                    title:'标签'
                }
            },

        ]
    },
    {
        path:'/login',
        name:'login',
        component:modules[`../views/login.vue`],
        meta: {
            title:'登录'
        }
    },
    {
        path:'/register',
        name:'register',
        component:modules[`../views/register.vue`],
        meta: {
            title:'注册'
        }
    },
    {
        path:'/reset',
        name:'reset',
        component:modules[`../views/reset.vue`],
        meta: {
            title:'找回密码'
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: modules['../views/404.vue']
    }
];
const router=createRouter({
    scrollBehavior:()=>({x:0,y:0}),
    history:createWebHistory(),
    routes:constantRouter
})
export default router;
