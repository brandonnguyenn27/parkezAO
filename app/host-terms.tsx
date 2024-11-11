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

  const handleAccept = () => {
    console.log("Host Terms accepted");
    router.replace("/host"); // Navigate to the host screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={24} color="#FFD700" />
        </TouchableOpacity>
        <Text style={styles.title}>Host Terms & Conditions</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>
          1. Terms applicable to all Listings
        </Text>

        <Text style={styles.paragraph}>
          1.1 When creating a Listing through the ParkEZ platform you must (i)
          provide complete and accurate information about your Host Service
          (such as listing description, location, calendar availability), (ii)
          disclose any deficiencies, restrictions (such as driveway rules) and
          requirements that apply (such as any minimum age, vehicle size,
          minimum and maximum time limit) and (iii) provide any other pertinent
          information requested by ParkEZ. You are responsible for keeping your
          Listing information (including calendar availability) up-to-date at
          all times.
        </Text>

        <Text style={styles.paragraph}>
          1.2 You are solely responsible for setting a price floor (including
          any Taxes if applicable) for your Listing ("Listing Fee"). Property
          damage charges may also be added in the final bill determined by
          damage of property. Once a Guest requests a booking of your Listing,
          ParkEZ's dynamic pricing algorithm will set the final price using
          components of demand and other variables.
        </Text>

        <Text style={styles.paragraph}>
          1.3 Any terms and conditions included in your Listing, in particular
          in relation to cancellations, must not conflict with these Terms or
          the relevant cancellation policy for your Listing.
        </Text>

        <Text style={styles.paragraph}>
          1.4 Pictures, animations or videos (collectively, "Images") used in
          your Listings must accurately reflect the quality and condition of
          your Host Services. ParkEZ reserves the right to require that Listings
          have a minimum number of Images of a certain format, size, resolution,
          and quality.
        </Text>

        <Text style={styles.paragraph}>
          1.5 The placement and ranking of Listings in search results on the
          ParkEZ Platform may vary and depend on a variety of factors, such as
          Guest search parameters and preferences, Host requirements, price and
          calendar availability, number and quality of Images, customer service
          and cancellation history, Reviews and Ratings, type of Listing, and/or
          ease of booking. More information about the factors that determine how
          your Listing appears in search results can be found on our help
          center.
        </Text>

        <Text style={styles.paragraph}>
          1.6 When you accept or have pre-approved a booking request by a Guest,
          you are entering into a legally binding agreement with the Guest and
          are required to provide your Host Service(s) to the Guest as described
          in your Listing when the booking request is made. You also agree to
          pay the applicable Host Fee and any applicable Taxes and cancellation
          charges.
        </Text>

        <Text style={styles.paragraph}>
          1.7 ParkEZ recommends that Hosts obtain appropriate insurance for
          their Host Services. Please review any respective insurance policy
          carefully, and in particular make sure that you are familiar with and
          understand any exclusions to, and any deductibles that may apply for,
          such insurance policy, including, but not limited to, whether or not
          your insurance policy will cover the actions or inactions of Guests
          (and the individuals the Guest has booked for, if applicable) while
          staying at your Accommodation or participating in your Experience,
          Event or other Host Service.
        </Text>

        <Text style={styles.sectionTitle}>2. Listing Accommodations</Text>

        <Text style={styles.paragraph}>
          2.1 Unless expressly allowed by ParkEZ, you may not list more than one
          Accommodation per Listing.
        </Text>

        <Text style={styles.paragraph}>
          2.2 If you choose to require a security deposit for your
          Accommodation, you must specify this in your Listing ("Security
          Deposit"). Hosts are not allowed to ask for a Security Deposit (i)
          after a booking has been confirmed or (ii) outside of the ParkEZ
          Platform.
        </Text>

        <Text style={styles.paragraph}>
          2.3 You represent and warrant that any Listing you post and the
          booking of, or a Guest's stay at, an Accommodation will (i) not breach
          any agreements you have entered into with any third parties, such as
          homeowners association, condominium, or other agreements, and (ii)
          comply with all applicable laws (such as zoning laws), Tax
          requirements, and other rules and regulations (including having all
          required permits, licenses and registrations). As a Host, you are
          responsible for your own acts and omissions and are also responsible
          for the acts and omissions of any individuals who reside at or are
          otherwise present at the Accommodation at your request or invitation,
          excluding the Guest and any individuals the Guest invites to the
          Accommodation.
        </Text>

        <Text style={styles.sectionTitle}>
          3. Listing Experiences, Events and other Host Services
        </Text>

        <Text style={styles.paragraph}>
          3.1 Hosts who list Experiences, Events and Host Services other than
          Accommodations agree to and are subject to the Additional Terms for
          Experience Hosts.
        </Text>

        <Text style={styles.sectionTitle}>4. Host Responsibilities</Text>

        <Text style={styles.paragraph}>
          As a host, you are responsible for:
          {"\n"}- Providing accurate information about your parking space
          {"\n"}- Ensuring the space is available during the times you've listed
          {"\n"}- Maintaining the safety and cleanliness of the parking area
          {"\n"}- Complying with all local laws and regulations
        </Text>

        <Text style={styles.sectionTitle}>5. Pricing and Payments</Text>

        <Text style={styles.paragraph}>
          You have the right to set your own price floor. Our platform will
          handle the payment processing and transfer your earnings to you, minus
          our service fee. The final price will be determined by our dynamic
          pricing algorithm based on demand and other factors.
        </Text>

        <Text style={styles.sectionTitle}>6. Cancellations and Refunds</Text>

        <Text style={styles.paragraph}>
          Please refer to our cancellation policy for details on how
          cancellations and refunds are handled. Your listing's cancellation
          policy must not conflict with ParkEZ's policies.
        </Text>

        <Text style={styles.sectionTitle}>7. Insurance and Liability</Text>

        <Text style={styles.paragraph}>
          While we provide basic insurance coverage, you are encouraged to have
          your own insurance. We are not liable for any damage to vehicles or
          property beyond our stated coverage limits. Please review your
          insurance policy carefully to understand what is and isn't covered.
        </Text>

        <Text style={styles.sectionTitle}>
          8. Termination of Hosting Privileges
        </Text>

        <Text style={styles.paragraph}>
          We reserve the right to terminate your hosting privileges if you
          violate these terms, receive consistent negative feedback from guests,
          or fail to comply with applicable laws and regulations.
        </Text>

        <Text style={styles.paragraph}>
          By proceeding to host your driveway, you acknowledge that you have
          read, understood, and agree to be bound by these terms and conditions.
        </Text>
      </ScrollView>
      <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
        <Text style={styles.acceptButtonText}>I Accept</Text>
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
  acceptButton: {
    backgroundColor: "#FFD700",
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  acceptButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
