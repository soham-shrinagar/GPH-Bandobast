import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Link, router } from "expo-router";
import { backendUrl } from "@/constants/config";
import { useAuth } from "@/contexts/AuthContext";

const register = () => {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/deployment"); // or "/dashboard"
    }
  }, [isLoggedIn]);

  const [personnelId, setPersonnelId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [stationName, setStationName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    try {
      console.log(
        "Registering...",
        personnelId,
        phoneNumber,
        stationName,
        fullName,
        password
      );

      const response = await fetch(`${backendUrl}/api/personnelRegistration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personnelId,
          fullName,
          password,
          phoneNumber,
          stationName,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Registration successful:", data);
        setPersonnelId("");
        setFullName("");
        setPhoneNumber("");
        setStationName("");
        setPassword("");
        router.replace("/login");
      } else {
        console.log("Registration failed:", data.message || data);
      }
    } catch (err) {
      console.error("Error connecting to the backend:", err);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Register Page</Text>

      <TextInput
        placeholder="Personnel Id"
        onChangeText={setPersonnelId}
        value={personnelId}
        style={styles.textinput}
      />
      <TextInput
        placeholder="Full Name"
        onChangeText={setFullName}
        value={fullName}
        style={styles.textinput}
      />
      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        style={styles.textinput}
      />
      <TextInput
        placeholder="Station Name"
        onChangeText={setStationName}
        value={stationName}
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
        <Text style={{ color: "#fff" }}>Press to Register</Text>
      </Pressable>

      <View style={styles.btnView}>
        <Link href={"/login"} style={styles.link}>
          Login Instead
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default register;

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
