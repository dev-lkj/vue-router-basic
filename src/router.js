import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component : TeamsList },         // alias로 해결
        // {path: '/', redirect: '/teams' },
        // { path: '/teams', component : TeamsList, alias: '/'},  //out-domain.conm/teams => TeamsList
        {   
            name: 'teams',
            path: '/teams', 
            meta: { needsAuth : true },
            components : {default: TeamsList, footer: TeamsFooter}, 
            children: [
                { name: 'team-members', path: ':teamId', component: TeamMembers, props: true}, // teams/t1
            ]
        },  //out-domain.conm/teams => TeamsList
        // { path: '/users', component : UsersList },        
        {
            path: '/users', 
            components : { 
                default: UsersList, 
                footer: UsersFooter 
            },
            beforeEnter(to, from, next){
                console.log('users beforeEnter');
                console.log(to, from);
                next();
            },
        },        
        { path: '/:notFound(.*)', component: NotFound},
        // { path: '/:notFound(.*)', redirect: '/teams'},
        
    ],
    linkActiveClass : 'active',
    scrollBehavior(_, _2, savedPosition) {
        //console.log(to, from, savedPosition)
        if(savedPosition){
            return savedPosition;
        }
        return {left: 0, top: 0};
    },
});

router.beforeEach(function(to, from, next) {
    console.log('Global beforeEach');
    console.log(to, from);
    if(to.meta.needsAuth){
        console.log('Needs auth!');
        next();
    }else {
        next();
    }
    // if(to.name === 'team-members'){
    //     next();
    // }else{
        
    //     next({name: 'team-members', params: {teamId : 't2'}});
    // }
    next();
});

router.afterEach(function(to, from){
    //sending analytics data
    console.log('Global afterEach')
    console.log(to, from);
});

export default router;