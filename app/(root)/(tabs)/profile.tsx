import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';
import images from '@/constants/images';
import { settings } from '@/constants/data';
import { useGlobalContext } from '@/lib/global-provider';
import { logout } from '@/lib/appwrite';

interface itemProps {
  icon: ImageSourcePropType, 
  title : string, 
  onPress? : () => void,
  showArrow? : boolean
}

const SettingsItem = ({icon, title, onPress, showArrow = true} : itemProps) => (
  <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3'>
    <View className='flex flex-row items-center gap-3'>
      <Image source = {icon} className='size-6'/>
      <Text className='text-lg font-rubikm text-black-300'>{title}</Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} className='size-5'/>}
  </TouchableOpacity>
)

const Profile = () => {
  const {user, refetch} = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Success","Logged out.");
      refetch();
    }
    else Alert.alert("Error","An error occured.")
  };

  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView
        showsVerticalScrollIndicator = {false}
        contentContainerClassName= 'pb-32 px-5'
      >
        <View className='flex flex-row items-center justify-between mt-5'>
          <Text className='text-2xl font-rubikm'>Profile</Text>
          <Image source = {icons.bell} className='size-7'/>
        </View>

        <View className='flex-row justify-center flex mt-5'>
          <View className='flex flex-col items-center relative mt-5'>
            <Image source={{uri : user?.avatar}} className='size-44 relative rounded-full'/>
            <TouchableOpacity className='absolute bottom-11 right-2'>
              <Image source={icons.edit} className ='size-9'/>
            </TouchableOpacity>
            <Text className='text-2xl font-rubikb mt-2'>{user?.name}</Text>
          </View>
        </View>

        <View className='flex flex-col mt-10'>
          <SettingsItem icon = {icons.calendar} title = "Purchase History"/>
          <SettingsItem icon = {icons.wallet} title = "Payments"/>
        </View>

        <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
            {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
            ))}
        </View>

        <TouchableOpacity onPress={handleLogout} className='flex flex-row items-center justify-between py-3'>
          <View className='flex flex-row items-center gap-3'>
            <Image source = {icons.logout} className='size-6'/>
            <Text className='text-lg font-rubikm text-secondary'>Logout</Text>
          </View>
        </TouchableOpacity>
      

      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile