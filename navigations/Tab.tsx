import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Moives from "../screen/Movie";
import TV from "../screen/TV";
import Search from "../screen/Search";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

const Tab = createBottomTabNavigator()

const Tabs = () => {
    const isDark = useColorScheme() === 'dark';
    return(
        <Tab.Navigator
         initialRouteName = "Movies"
         sceneContainerStyle = {{
             backgroundColor : isDark? "#2d3436":"#dfe6e9"
         }}
         screenOptions = {{
             headerTitleAlign : "center",
             headerTitleStyle : { color : isDark? "#00cec9" : "#2d3436" , fontSize : 27 },
             headerStyle : {backgroundColor : isDark? "#2d3436":"#dfe6e9" },
             tabBarStyle : {backgroundColor : isDark? "#2d3436":"#dfe6e9" },
             tabBarLabelStyle : { marginTop: -5, marginBottom : 5, fontSize : 14, fontWeight : "700"},
             tabBarActiveTintColor : isDark? "#00cec9" : "#636e72",
            }}
         >
            <Tab.Screen
             name ="Movies"
             component ={Moives} 
             options= {{
                tabBarIcon : ({color, size}) => (
                <Ionicons name="film-outline" color={color} size={size}/>
               )
             }}
            />
            <Tab.Screen 
            name ="TV"  
            component ={TV} 
            options= {{ 
                tabBarIcon : ({color, size}) => (
                <Ionicons name="tv-outline" color={color} size={size}/>
               )
              }}
            />
            <Tab.Screen 
            name ="Search"  
            component ={Search} 
            options= {{ 
                tabBarIcon : ({color, size}) => (
                    <Ionicons name="search" color={color} size={size}/>
                    )
                  }}
                 />
        </Tab.Navigator>
    )
}

export default Tabs