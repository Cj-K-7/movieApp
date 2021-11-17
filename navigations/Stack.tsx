import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screen/Stackscreen/Detail";
import { useColorScheme } from "react-native";

const Stack = createNativeStackNavigator()

const Stacks =()=> {
    const isDark = useColorScheme() === 'dark';
    return(
        <Stack.Navigator 
         screenOptions={{
             headerBackTitleVisible: false,
             headerTitleAlign : "center",
             headerTitleStyle : { color : isDark? "#00cec9" : "#2d3436" , fontSize : 27 },
             headerStyle : {backgroundColor : isDark? "#2d3436":"#dfe6e9" },
         }} >
            <Stack.Screen name="Detail" component={Detail}/>
        </Stack.Navigator>
    )
}

export default Stacks