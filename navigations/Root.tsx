import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tab";
import Stacks from "./Stack";

const Nav = createNativeStackNavigator()

const Root = () => {
    return (
        <Nav.Navigator screenOptions={{ headerShown : false }}>
            <Nav.Screen name="Tabs" component={Tabs}/>
            <Nav.Screen name="Stack" component={Stacks}/>
        </Nav.Navigator>
    )
}

export default Root