function setLight() {
    preferences.theme.local = 'light'
}
function setDark() {
    preferences.theme.local = 'dark'
}
function setSystem() {
    preferences.theme.local = 'system'
}
/**
 * 获取主题配置
 * @returns {Object} 主题配置对象
 * @returns {Function} setLight - 设置亮色主题
 * @returns {Function} setDark - 设置暗色主题
 */
export function themeOption() {
    return {
        setLight,
        setDark,
        setSystem
    }
}
