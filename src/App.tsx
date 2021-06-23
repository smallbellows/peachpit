import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from 'context/Auth';
import { LoadingProvider } from 'context/Loading';
import AppRouter from 'Routes';
import { theme } from './theme';
function App() {
    return (
        <ChakraProvider theme={theme}>
            <LoadingProvider>
                <AuthProvider>
                    <AppRouter />
                </AuthProvider>
            </LoadingProvider>
        </ChakraProvider>
    );
}

export default App;
