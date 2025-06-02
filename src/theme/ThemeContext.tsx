import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  type ThemeType = {
    gradient: string[];
    selectionButton: string;
    deSelectionButton: string;
    button: string;
    buttonText: string;
    selectionButtonText: string;
    subtitle: string;
    title: string;
    cardBackground: string;
    cardTitle: string;
    cardText: string;
    link: string;
    alertText: string;
    disabledButton: string;
    footerNote: string;
    inputBackground: string;
    inputText: string;
    placeholderText: string;
    iconColor: string;
    borderColor: string;
    dotActive: string;
    dotInActive: string;
    dotInactiveOpacity: number;
    card: string;
    deSelectionButtonText: string;
    selectionButtonSubtitle: string
  };
  
  type Language = 'en' | 'es';
  
  type ThemeContextType = {
    theme: ThemeType;
    setAppLanguage: (lang: Language) => void;
  };
  
  const themes: Record<Language, ThemeType> = {
    en: {
      gradient: ['#638695', '#64AB86'],
      button: '#1b2c2d',
      selectionButton: '#9FE5BF',
      deSelectionButton: '#ffffff',
      buttonText: '#ffffff',
      subtitle: '#f0f0f0',
      title: '#ffffff',
      cardBackground: '#d3e3de',
      cardTitle: '#2e2e2e',
      cardText: '#444444',
      link: '#5e3d9a',
      alertText: '#ffffff',
      disabledButton: '#3b4c4d',
      footerNote: '#eeeeee',
      inputBackground: '#ffffff',
      inputText: '#000000',
      placeholderText: '#999999',
      iconColor: '#333333',
      borderColor: '#ffffff',
      dotActive: '#ffffff',
      dotInActive: '#ffffff',
      dotInactiveOpacity: 0.3,
      card: '#CDD6DC',
      selectionButtonText: '#3D7256',
      deSelectionButtonText: '#7f7f7f',
      selectionButtonSubtitle: '#467C60'
    },
    es: {
      gradient: ['#ffe1c1', '#f5a623'],
      button: '#7b3f00',
      selectionButton: '#7b3f00',
      deSelectionButton: '#c0a27c',
      buttonText: '#ffffff',
      subtitle: '#fff8f0',
      title: '#ffffff',
      cardBackground: '#fff1e0',
      cardTitle: '#6e3b00',
      cardText: '#5e2e00',
      link: '#ff8c00',
      alertText: '#333333',
      disabledButton: '#c0a27c',
      footerNote: '#333333',
      inputBackground: '#fff8f0',
      inputText: '#3b2b1b',
      placeholderText: '#a68c6c',
      iconColor: '#6e3b00',
      borderColor: '#ffffff',
      dotActive: '#ffffff',
      dotInActive: '#ffffff',
      dotInactiveOpacity: 0.3,
      card: '#CDD6DC',
      selectionButtonText: '#3D7256',
      deSelectionButtonText: '#7f7f7f',
      selectionButtonSubtitle: '#467C60'
    },
  };
  
  const ThemeContext = createContext<ThemeContextType>({
    theme: themes.en,
    setAppLanguage: () => {},
  });
  
  export const useTheme = () => useContext(ThemeContext);
  
  type ThemeProviderProps = {
    children: ReactNode;
  };
  
  export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState<ThemeType>(themes.en);
  
    const setAppLanguage = async (lang: Language) => {
      await AsyncStorage.setItem('userLanguage', lang);
      setTheme(themes[lang]);
    };
  
    useEffect(() => {
      const loadTheme = async () => {
        const lang = await AsyncStorage.getItem('userLanguage');
        if (lang === 'es' || lang === 'en') {
          setTheme(themes[lang]);
        }
      };
      loadTheme();
    }, []);
  
    return (
      <ThemeContext.Provider value={{ theme, setAppLanguage }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  