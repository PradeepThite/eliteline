import React, { createContext, useState } from 'react';
export const LoaderContext = createContext();
// import ProLoader from '../components/ProLoader/ProLoader'
export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    return (<LoaderContext.Provider
        value={{
            isLoading, setLoader: setIsLoading
        }}>
            {/* <ProLoader visible={isLoading}></ProLoader> */}
        {children}
    </LoaderContext.Provider>);
}
