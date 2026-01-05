import React from 'react'
import '../styles/themeButton.scss'
import { useTheme } from '../../app/ThemeContext';
function ThemeButton() {
    const { isLight, toggleTheme } = useTheme();
    return (
        <>
            <input type="checkbox" checked={!isLight} onChange={toggleTheme} id="toggle" className="toggle--checkbox" />
            <label htmlFor="toggle" className="toggle--label">
                <span className="toggle--label-background"></span>
            </label>
            <div className="background"></div>
        </>
    )
}

export default ThemeButton