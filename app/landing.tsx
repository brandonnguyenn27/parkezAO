import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Button } from "@rneui/themed";

export default function LandingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: "https://via.placeholder.com/200" }}
          style={styles.logo}
          accessibilityLabel="Parkable"
        />
        <Text style={styles.title}>Welcome to Parkable</Text>
        <Text style={styles.subtitle}>
          Find and book parking spots with ease
        </Text>

        <Button
          title="Sign Up"
          buttonStyle={styles.signUpButton}
          titleStyle={styles.buttonText}
          onPress={() => {
            router.push({ pathname: "/oauthsignup" });
          }}
          accessibilityLabel="Sign up button"
        />

        <TouchableOpacity
          onPress={() => {
            // For demo purposes, navigate to the home screen
            router.replace("/(tabs)/profile");
          }}
        >
          <Text style={styles.loginText}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  signUpButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    fontSize: 16,
    color: "#007AFF",
  },
});
