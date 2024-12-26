import {Image, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { login } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'
import { Redirect } from 'expo-router'

const signIn = () => {
  const {refetch, loading, isLoggedIn} = useGlobalContext();

  if (!loading && isLoggedIn) {
    console.log("You are already logged in.")
    return <Redirect href="/"/>;
  }

  const handleLogin = async () => {
    const result = await login();

    if (result) {
      refetch();
    } else {
      Alert.alert('Error', "Login Unsuccessful.")
    }
  }
  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView contentContainerClassName='h-full'>
        <Image source = {images.onboarding} className = "w-full h-4/6" resizeMode = "contain"/>
        <View className='px-10'>
          <Text className='text-3xl font-rubikb text-black-300 text-center mt-1'>
            Ghar <Text className='text-primary'>Dhundna {"\n"}</Text> Hua Aasaan!
          </Text>
          <Text className='text-lg text-center mt-12 font-rubikm text-black-200'>Login using Google</Text>
          <TouchableOpacity onPress={handleLogin} className='bg-white shadow-md shadow-zinc-300 rounded-full w-full p-4 mt-5'>
            <View className='flex flex-row items-center justify-center'>
              <Image source={icons.google} className='w-6 h-6' resizeMode='contain'/>
              <Text className='text-lg font-rubikm text-black-300 ml-3'>Continue with Google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default signIn