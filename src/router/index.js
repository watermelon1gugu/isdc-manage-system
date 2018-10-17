import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children: [
                {
                    path: '/join',
                    component: resolve => require(['../components/page/DeviceTable.vue'], resolve)

                },{
                    path:'/ctf',
                    component: resolve => require(['../components/page/CTFTable.vue'], resolve)

                },{
                    path:'/homework',
                    component: resolve => require(['../components/page/HomeWork'], resolve)
                }/*{
                    path: '/ctfProblem',
                    component: resolve => require(['../components/page/CTFPlatform.vue'], resolve)

                },{
                    path:'/ctfProblemSubmit',
                    component:resolve => require(['../components/page/CTFform.vue'],resolve)
                }*/
            ]
        }
    ]
})
