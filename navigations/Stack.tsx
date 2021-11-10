import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screen/Stackscreen/Detail";

const Stack = createNativeStackNavigator()

const Stacks =()=> {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Detail" component={Detail}/>
        </Stack.Navigator>
    )
}

export default Stacks