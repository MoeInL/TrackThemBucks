import {View, Text} from 'react-native';
import { useEffect } from 'react';

import { pullFromBackend } from '../../Requests/https';

export default function Home() {
    async function test(){
        const response = await pullFromBackend()
        console.log("This was inside firebase")
        console.log(response)
    }

    useEffect(() => {
        test()
    }, [])
    
    return (
        <View>
            <Text> Home</Text>
        </View>
    );
}
 