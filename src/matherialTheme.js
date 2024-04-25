import { createTheme } from '@mui/material/styles';
const materialTheme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    color: 'white', // Text color
                    '& .MuiInputLabel-root': {
                        color: 'white', // Label color
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'white', // Label color when focused
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white', // Border color
                        },
                        '&:hover fieldset': {
                            borderColor: 'white', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white', // Border color when focused
                        },
                        '& input': {
                            color: 'white', // Input text color
                        },
                    },
                },
            },
        },
    },
});

export default materialTheme;
