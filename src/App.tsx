import { ThemeProvider } from '@mui/material';
import Layout from './layouts';
import { theme } from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Layout/>
        </ThemeProvider>
    );
}

export default App;