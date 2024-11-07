import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Button } from "@rneui/themed";

export default function OAuthSignUpScreen() {
  const router = useRouter();

  const handleGoogleSignUp = () => {
    // In a real app, this would initiate the Google OAuth flow
    console.log("Google Sign Up initiated");
    // For demo purposes, navigate to the home screen
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.logo}
            accessibilityLabel="AO Parking logo"
          />
          <Text style={styles.title}>Parkable</Text>
          <Text style={styles.subtitle}>Sign up to start parking smarter</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#999"
            accessibilityLabel="Enter your full name"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            accessibilityLabel="Enter your email address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            accessibilityLabel="Enter your password"
          />
          <Button
            title="Sign Up"
            buttonStyle={styles.signUpButton}
            titleStyle={styles.buttonText}
            onPress={() => {
              // For demo purposes, navigate to the home screen
              router.replace("/");
            }}
            accessibilityLabel="Sign up button"
          />
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignUp}
          accessibilityLabel="Sign up with Google"
        >
          <Image
            source={{ uri: "https://via.placeholder.com/20" }} // Replace with actual Google logo
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Sign up with Google</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <Button
            title="Log In"
            type="clear"
            titleStyle={styles.loginButton}
            onPress={() => {
              // For demo purposes, navigate to the home screen
              router.replace("/");
            }}
            accessibilityLabel="Log in button"
          />
        </View>

        <Text style={styles.termsText}>
          By signing up, you agree to our Terms of Service and Privacy Policy
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007AFF",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 14,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#666",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    color: "#333",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    fontSize: 16,
    color: "#666",
  },
  loginButton: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  termsText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
