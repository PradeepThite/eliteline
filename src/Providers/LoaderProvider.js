import React, { createContext, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
export const LoaderContext = createContext();
// import ProLoader from '../components/ProLoader/ProLoader'
export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    return (<LoaderContext.Provider
        value={{
            isLoading, setLoader: setIsLoading
        }}>
        {
            isLoading &&
            <View style={{ zIndex: 99999, position: 'absolute', width: '100%', top: 0, opacity: 0.5, height: '100%', backgroundColor: 'grey', left: 0 }}>
                <View style={{ opacity: 1, top: '50%' }}>

                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </View>
        }
        {/* <ProLoader visible={isLoading}></ProLoader> */}
        {children}
    </LoaderContext.Provider>);
}
