import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function TermsOfServiceScreen() {
  const router = useRouter();

  const handleAccept = () => {
    // In a real app, you would typically store the user's acceptance
    // of the terms of service in your backend or local storage
    console.log("Terms of Service accepted");
    router.replace("/create-profile"); // Navigate to the home screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Terms of Service</Text>

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By accessing and using the Parkable, you agree to be bound by these
          Terms of Service and all applicable laws and regulations. If you do
          not agree with any part of these terms, you may not use our service.
        </Text>

        <Text style={styles.sectionTitle}>2. Use of Service</Text>
        <Text style={styles.paragraph}>
          You agree to use AO Parking for lawful purposes only and in a way that
          does not infringe the rights of, restrict or inhibit anyone else's use
          and enjoyment of the service.
        </Text>

        <Text style={styles.sectionTitle}>3. User Accounts</Text>
        <Text style={styles.paragraph}>
          To use certain features of the service, you must register for an
          account. You are responsible for maintaining the confidentiality of
          your account and password and for restricting access to your account.
        </Text>

        <Text style={styles.sectionTitle}>4. Privacy Policy</Text>
        <Text style={styles.paragraph}>
          Your use of AO Parking is also governed by our Privacy Policy. Please
          review our Privacy Policy, which also governs the site and informs
          users of our data collection practices.
        </Text>

        <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          AO Parking and its affiliates will not be liable for any indirect,
          incidental, special, consequential or punitive damages resulting from
          your use of or inability to use the service.
        </Text>

        <Text style={styles.sectionTitle}>6. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We reserve the right to modify these Terms of Service at any time. We
          will always post the most current version on our site. By continuing
          to use the service after changes become effective, you agree to be
          bound by the revised terms.
        </Text>

        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.acceptButtonText}>I Accept</Text>
        </TouchableOpacity>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
  },
  acceptButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  acceptButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
