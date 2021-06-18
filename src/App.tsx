import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from 'context/Auth';
import AppRouter from 'Routes';
import { theme } from './theme';
function App() {
    return (
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </ChakraProvider>
    );
}

export default App;
