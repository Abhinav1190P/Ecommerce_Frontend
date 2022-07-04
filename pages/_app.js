import {AppProps} from 'next/app'
import {ChakraProvider} from '@chakra-ui/react';

import theme from '../src/theme/index.ts';
import '../src/sections/slantDiv/style/slantdiv.css'
import '../src/theme/styles.css'
const App = ({Component, pageProps}) =>{
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps}/>
        </ChakraProvider>
    )
}

export default App;