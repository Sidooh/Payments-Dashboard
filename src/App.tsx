import { ThemeProvider } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from 'components/common/Error';
import Layout from './layouts';
import { theme } from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
                <Layout/>
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;
