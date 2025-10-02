import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/contexts/AuthContext';
import { Link, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const deployment = () => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Redirect href={"/login"} />;
  }
  return (
    <SafeAreaView>
      <Text>deployment</Text>
      <Link href={"/profile"}>Profile</Link>
    </SafeAreaView>
  )
}

export default deployment

const styles = StyleSheet.create({})