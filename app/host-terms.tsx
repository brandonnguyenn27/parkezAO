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
import { FontAwesome } from "@expo/vector-icons";

export default function HostTermsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Host Terms & Conditions</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By hosting your driveway on our platform, you agree to comply with and
          be bound by the following terms and conditions.
        </Text>

        <Text style={styles.sectionTitle}>2. Host Responsibilities</Text>
        <Text style={styles.paragraph}>
          As a host, you are responsible for:
          {"\n"}- Providing accurate information about your parking space
          {"\n"}- Ensuring the space is available during the times you've listed
          {"\n"}- Maintaining the safety and cleanliness of the parking area
          {"\n"}- Complying with all local laws and regulations
        </Text>

        <Text style={styles.sectionTitle}>3. Pricing and Payments</Text>
        <Text style={styles.paragraph}>
          You have the right to set your own prices. Our platform will handle
          the payment processing and transfer your earnings to you, minus our
          service fee.
        </Text>

        <Text style={styles.sectionTitle}>4. Cancellations and Refunds</Text>
        <Text style={styles.paragraph}>
          Please refer to our cancellation policy for details on how
          cancellations and refunds are handled.
        </Text>

        <Text style={styles.sectionTitle}>5. Insurance and Liability</Text>
        <Text style={styles.paragraph}>
          While we provide basic insurance coverage, you are encouraged to have
          your own insurance. We are not liable for any damage to vehicles or
          property beyond our stated coverage limits.
        </Text>

        <Text style={styles.sectionTitle}>
          6. Termination of Hosting Privileges
        </Text>
        <Text style={styles.paragraph}>
          We reserve the right to terminate your hosting privileges if you
          violate these terms or receive consistent negative feedback from
          parkers.
        </Text>

        <Text style={styles.paragraph}>
          By proceeding to host your driveway, you acknowledge that you have
          read, understood, and agree to be bound by these terms and conditions.
        </Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.agreeButton}
        onPress={() => router.push("/host")}
      >
        <Text style={styles.agreeButtonText}>I Agree</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  agreeButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  agreeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
