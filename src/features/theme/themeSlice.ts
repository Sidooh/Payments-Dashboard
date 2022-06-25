import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItemFromStore, setItemToStore } from 'utils/helpers';

type ThemeState = {
    isDark: boolean,
    isFluid: boolean,
    currency: '$' | 'KES',
    navbarStyle: 'transparent' | 'vibrant',
    navbarPosition: 'vertical' | 'top' | 'combo',
    navbarCollapsed: boolean
    showBurgerMenu: boolean, // controls showing vertical nav on mobile
    showSettingPanel: boolean,
    isNavbarVerticalCollapsed: boolean, // toggle vertical navbar collapse
}

const initialState: ThemeState = {
    isDark: getItemFromStore('isDark', false),
    isFluid: getItemFromStore('isFluid', false),
    currency: 'KES',
    navbarStyle: getItemFromStore('navbarStyle', 'transparent'),
    navbarPosition: getItemFromStore('navbarPosition', 'vertical'),
    navbarCollapsed: false,
    showBurgerMenu: false,
    showSettingPanel: false,
    isNavbarVerticalCollapsed: getItemFromStore('isNavbarVerticalCollapsed', false),
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        resetTheme: state => {
            localStorage.clear();

            return {
                ...state,
                initialState
            };
        },
        refreshTheme: state => ({...state}),
        setTheme: (state, action: PayloadAction<{ key: string, value: string | boolean }>) => {
            if ([
                'isFluid',
                'isDark',
                'navbarPosition',
                'isNavbarVerticalCollapsed',
                'navbarStyle'
            ].includes(action.payload.key)) setItemToStore(action.payload.key, String(action.payload.value));

            return {
                ...state,
                [action.payload.key]: action.payload.value
            };
        }
    },
});

export const {setTheme, resetTheme, refreshTheme} = themeSlice.actions;

export default themeSlice.reducer;