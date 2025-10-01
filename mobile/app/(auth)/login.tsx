import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import {backendUrl} from '../../constants/config';


const login = () => {

    const [personnelId, setPersonnelId] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit () {
        try {
            console.log("Login Successful")
            const response = await fetch(
                `${backendUrl}/api/personnelLogin`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({personnelId, password})
                }
            );

            const data = await response.json();
            if(response.ok) {
                console.log("Login successful:", data);
                setPersonnelId("")
                setPassword("")
                router.replace("/deployment")
                
            }
        } catch (err) {
            console.error("")
        }
    }

  return (
    <SafeAreaView style={styles.safeArea}>
          <Text style={styles.title}>Login Page</Text>
    
          <TextInput
            placeholder="Personnel Id"
            onChangeText={setPersonnelId}
            value={personnelId}
            style={styles.textinput}
          />
          <TextInput
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            style={styles.textinput}
          />
    
          <Pressable
            onPress={handleSubmit}
            style={[styles.btn, { backgroundColor: "#28a745" }]}
          >
            <Text style={{ color: "#fff" }}>Press to Login</Text>
          </Pressable>
    
          <View style={styles.btnView}>
            <Link href={"/register"} style={styles.link}>
              Register Instead
            </Link>
          </View>
        </SafeAreaView>
  )
}

export default login

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f2f2f2",
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginTop: 8,
  },
  link: {
    color: "#333",
    textDecorationLine: "underline",
    fontWeight: "500",
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  textinput: {
    width: "100%",
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  btn: {
    padding: 16,
    backgroundColor: "#007bff",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
});