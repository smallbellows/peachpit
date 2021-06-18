import { createContext, useState, useContext } from 'react';
import * as T from 'types';

const LoadingContext = createContext<T.LoadingContext | null>(null);
LoadingContext.displayName = 'LoadingContext';

const LoadingProvider = ({ children }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

const useLoading = () => useContext(LoadingContext) as T.LoadingContext;
export { useLoading, LoadingProvider };
