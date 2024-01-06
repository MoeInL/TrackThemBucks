import {TouchableOpacity} from "react-native";

import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 

export default function PasswordBox({hidden, onPress}){
    if(hidden === true){
        return(
            <TouchableOpacity onPress={onPress}>
                <AntDesign name="eyeo" size={24} color="black"/>
            </TouchableOpacity>
        )
    }
    else{
        return(
            <TouchableOpacity onPress={onPress}>
                <Feather name="eye-off" size={24} color="black" />
            </TouchableOpacity>
        )
    }
}

