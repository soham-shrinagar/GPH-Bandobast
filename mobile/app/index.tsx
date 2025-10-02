import { useAuth } from "@/contexts/AuthContext";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

const { isLoggedIn } = useAuth();
  
    useEffect(() => {
      if (isLoggedIn) {
        router.replace("/deployment"); // or "/dashboard"
      }
    }, [isLoggedIn]);


  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Personnel Deployment Tool</Text>

      <Text style={styles.subtitle}>Goa Police Department</Text>

      <Text style={styles.description}>
        Streamlined resource management and personnel allocation system for
        efficient police operations across Goa.
      </Text>

      <View style={{ width: "100%", alignItems: "center" }}>
        <Link href={"/login"} style={styles.link}>
          Login
        </Link>

        <Link href={"/register"} style={styles.link}>
          Register
        </Link>
      </View>

      {/* Footer */}
      <View style={{position: "absolute", bottom: 16}}>
        <Text style={styles.footer}>Government of Goa • Police Department</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#d9f7eb", // green-100 equivalent
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#065f46", // green-800
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#d97706", // yellow-600
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#047857", // green-700
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  link: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    textAlign: "center",
    color: "#065f46",
    fontWeight: "bold",
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  footer: {
    fontSize: 12,
    color: "#065f46",
    textAlign: "center",
  },
});
