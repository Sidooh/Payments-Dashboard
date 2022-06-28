import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
        fontFamily: `${['"Varela Round"', 'cursive',].join(',')}!important`,
    },
    components: {
        MuiChip: {
            defaultProps: {
                size: 'small'
            },
            styleOverrides:{
                sizeSmall: {
                    height:'20px'
                },
                iconSmall:{
                    fontSize:'10px'
                }
            }
        },
        MuiTextField    : {
            defaultProps: {
                size     : 'small',
                fullWidth: true
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    appearance     : 'none',
                    borderRadius   : '.25rem',
                    backgroundColor: 'var(--falcon-input-bg)',
                    boxShadow      : 'var(--falcon-box-shadow-inset)!important',
                    padding        : 'padding: .3125rem 1rem;!important'
                }
            }
        }
    }
});