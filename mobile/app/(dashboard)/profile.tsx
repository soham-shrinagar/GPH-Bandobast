import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const profile = () => {
    const {user, logout} = useAuth();
    const currentId = user?.personnelId;

    const handleLogout = async () => {
        await logout();
        router.replace("/")
    }
  return (
    <SafeAreaView>
      <Text>profile</Text>
      <Pressable onPress={handleLogout}><Text>Logout</Text></Pressable>
    </SafeAreaView>
  )
}

export default profile

const styles = StyleSheet.create({})