import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import icons from '@/constants/icons'

const TabIcon = ({focused, icon, title} : {focused: boolean; icon: any, title : string}) => (
    <View className='flex-1 mt-3 flex flex-col items-center'>
        <Image source={icon} tintColor={focused ? "#375E97" : "#8c8e98"}
        resizeMode='contain' className='size-8'/>
        <Text className = {`${focused ? 'text-primary font-rubikm' : 'text-black-200 font-rubikl'}
        text-xs w-full text-center mt-1`}>{title}</Text>
    </View>
)

const TabsLayout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: 'white',
                position: 'absolute',
                borderTopColor: '#0061ff1a',
                borderTopWidth: 1,
                minHeight: 70
            }
        }}
    
    >
      <Tabs.Screen
        name='index'
        options={{
            title:'Home',
            headerShown: false,
            tabBarIcon: ({focused}) => (
                <TabIcon icon={icons.home} focused={focused} title='Home'/>
            )
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
            title:'Explore',
            headerShown: false,
            tabBarIcon: ({focused}) => (
                <TabIcon icon={icons.search} focused={focused} title='Search'/>
            )
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
            title:'Profile',
            headerShown: false,
            tabBarIcon: ({focused}) => (
                <TabIcon icon={icons.person} focused={focused} title='Profile'/>
            )
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
