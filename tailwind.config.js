// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
    // ... 其他配置
    theme: {
        extend: {
            // 1. 添加自定义颜色
            colors: {
                primary: '#2563eb', // 定义一个主题色，例如蓝色 (blue-600)
                'overlay-content': 'rgba(255, 255, 255, 0.95)' // 定义一个遮罩层颜色，例如带透明度的白色
            },
            // 2. 添加自定义 z-index
            zIndex: {
                100: '100'
            }
        }
    }
    // ... plugins
}
