import { createContext,useState,useEffect,useContext } from "react";

const ThemeContext = createContext()

export const ThemeProvider= ({children})=>{
    const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [isLight, setIsLight] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'light';
        return !getSystemTheme(); 
    });
    useEffect(() => {
        const root = window.document.documentElement;
        if (isLight) {
            root.classList.add('light');
            localStorage.setItem('theme', 'light');
        } else {
            root.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        }
    }, [isLight]);
    const toggleTheme = () => setIsLight(prev => !prev);

    return (
        <ThemeContext.Provider value={{ isLight, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);