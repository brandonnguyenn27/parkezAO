import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Button } from "@rneui/themed";
import { FontAwesome } from "@expo/vector-icons";
import { hostParkingSpots } from "../data/hostparking";

// Mock user data (replace this with actual data from your backend or state management)
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  profilePicture: "https://via.placeholder.com/150",
};

export default function ProfileScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const SettingItem = ({ icon, title, value, onPress, isSwitch = false }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingItemLeft}>
        <FontAwesome
          name={icon}
          size={24}
          color="FFD700"
          style={styles.settingIcon}
        />
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      {isSwitch ? (
        <Switch value={value} onValueChange={onPress} />
      ) : (
        <View style={styles.settingItemRight}>
          <Text style={styles.settingValue}>{value}</Text>
          <FontAwesome name="chevron-right" size={16} color="#999" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: mockUser.profilePicture }}
            style={styles.profilePicture}
          />
          <Text style={styles.name}>{mockUser.name}</Text>
          <Text style={styles.email}>{mockUser.email}</Text>
        </View>

        <TouchableOpacity
          style={styles.hostButton}
          onPress={() => router.push("/host-terms")}
        >
          <FontAwesome
            name="home"
            size={24}
            color="#fff"
            style={styles.hostIcon}
          />
          <Text style={styles.hostButtonText}>Host Your Driveway</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <SettingItem
            icon="user"
            title="Edit Profile"
            onPress={() => {
              /* Navigate to edit profile */
            }}
          />
          <SettingItem
            icon="list"
            title="Your Listings"
            value={`${hostParkingSpots.length} listings`}
            onPress={() => router.push("/hostlistings")}
          />
          <SettingItem
            icon="envelope"
            title="Email"
            value={mockUser.email}
            onPress={() => {
              /* Navigate to change email */
            }}
          />
          <SettingItem
            icon="phone"
            title="Phone"
            value={mockUser.phone}
            onPress={() => {
              /* Navigate to change phone */
            }}
          />
          <SettingItem
            icon="lock"
            title="Change Password"
            onPress={() => {
              /* Navigate to change password */
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <SettingItem
            icon="bell"
            title="Notifications"
            value={notificationsEnabled}
            onPress={() => setNotificationsEnabled(!notificationsEnabled)}
            isSwitch
          />
          <SettingItem
            icon="moon-o"
            title="Dark Mode"
            value={darkModeEnabled}
            onPress={() => setDarkModeEnabled(!darkModeEnabled)}
            isSwitch
          />
          <SettingItem
            icon="globe"
            title="Language"
            value="English"
            onPress={() => {
              /* Navigate to language settings */
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <SettingItem
            icon="question-circle"
            title="Help Center"
            onPress={() => {
              /* Navigate to help center */
            }}
          />
          <SettingItem
            icon="file-text-o"
            title="Terms of Service"
            onPress={() => {
              /* Navigate to terms of service */
            }}
          />
          <SettingItem
            icon="shield"
            title="Privacy Policy"
            onPress={() => {
              /* Navigate to privacy policy */
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            // Route to the landing page
            router.replace({ pathname: "/landing" });
          }}
        >
          <Text style={styles.logoutButtonText}>Log Out</Text>
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
  header: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  hostButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFD700",
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  hostIcon: {
    marginRight: 10,
  },
  hostButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: 10,
  },
  settingTitle: {
    fontSize: 16,
  },
  settingItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingValue: {
    fontSize: 16,
    color: "#999",
    marginRight: 10,
  },
  logoutButton: {
    margin: 20,
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
