import icons from '@/constants/icons'
import images from '@/constants/images'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'



const signin = () => {
  const handlelogin =()=>{

  }
  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView contentContainerClassName='h-full'>
            <Image source={images.onboarding} className='
            w-full h-4/6' resizeMode='contain'/>

            <View className='px-10'>
              <Text className='text-base text-center uppercase
              font-rubik text-black-200'>
                Welcome to ReState
              </Text>
               <Text className='text-3xl font-rubik-bold text-black-300
               text-center mt-2'>
                Let's Get You Closer to {"\n"}
                <Text className='text-primary-300'>Your Ideal Home</Text>
                 
                </Text>

                <Text className='text-lg font-rubik text-black-200 text-center
                mt-12'>Login to ReState with Google</Text>
                <TouchableOpacity onPress={handlelogin}
                className='bg-white shadow-md shadow-zinc-300 
                rounded-full w-full py-4 mt-5'>
                  <View className='flex'>
                    <Image
                    source={icons.google}
                    className='w-5 h-5'
                    resizeMode='contain'/>

                  </View>

                  
                  </TouchableOpacity> 

            </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default signin