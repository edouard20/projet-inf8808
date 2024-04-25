import { createTheme } from '@mui/material/styles';
const materialTheme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    color: 'white',
                    '& .MuiInputLabel-root': {
                        color: 'white',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'white',
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                        '&:hover fieldset': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white',
                        },
                        '& input': {
                            color: 'white',
                        },
                    },
                },
            },
        },
    },
});

export default materialTheme;
