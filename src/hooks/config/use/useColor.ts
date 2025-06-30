export function useColor() {
    const setColor = (color: any): void => {
        preferences.theme.primaryColor = color
    }
    return {
        setColor
    }
}
