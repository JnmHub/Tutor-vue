import { h } from 'vue'
import type { Component } from 'vue'
import { NIcon } from 'naive-ui'
import {
    HomeOutline as HomeIcon,
    GridOutline as DashboardIcon,
    CodeSlashOutline as CodeIcon,
    OpenOutline as OpenIcon,
    LogoGithub as GithubIcon
} from '@vicons/ionicons5'

// 渲染图标的辅助函数
const renderIcon = (icon: Component) => {
    return () => h(NIcon, null, { default: () => h(icon) })
}

// 模拟的动态路由
export const dynamicRoutes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
            title: '仪表盘',
            icon: renderIcon(DashboardIcon),
            showInMenu: true,
            requiresLayout: true
        }
    },
    {
        path: '/system',
        name: 'System',
        meta: {
            title: '系统管理',
            icon: renderIcon(HomeIcon),
            showInMenu: true,
            requiresLayout: true
        },
        children: [
            {
                path: '/user',
                name: 'SystemUser',
                component: () => import('@/views/system/user/index.vue'),
                meta: {
                    title: '用户管理',
                    showInMenu: true,
                }
            },
            {
                path: '/role',
                name: 'SystemRole',
                component: () => import('@/views/system/role/index.vue'),
                meta: {
                    title: '角色管理',
                    showInMenu: true,
                }
            }
        ]
    },
    {
        path: '/iframe-demo',
        name: 'IframeDemo',
        component: () => import('@/views/iframe/index.vue'),
        meta: {
            title: '外部页面',
            icon: renderIcon(CodeIcon),
            showInMenu: true,
            requiresLayout: true,
            iframeUrl: 'https://ui.naiveadmin.com/zh-CN/light/components/layout#border.vue'
        }
    },
    {
        path: '/link-demo',
        name: 'LinkDemo',
        meta: {
            title: '项目地址',
            icon: renderIcon(GithubIcon),
            showInMenu: true,
            requiresLayout: true,
            iframeUrl: 'https://github.com/jnmhub/tutor-vue',
            blank: true // 这个属性和iframeUrl同时存在时，优先在新窗口打开
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录页',
            showInMenu: false, // 不在菜单中显示
            requiresLayout: false // 不需要布局
        }
    }
]