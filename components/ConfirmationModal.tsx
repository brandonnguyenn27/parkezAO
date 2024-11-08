import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  spotName: string;
  spotAddress: string;
  duration: number;
}

export default function ConfirmationModal({
  visible,
  onClose,
  spotName,
  spotAddress,
  duration,
}: ConfirmationModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Icon
            name="check-circle"
            size={60}
            color="#4CAF50"
            style={styles.modalIcon}
          />
          <Text style={styles.modalTitle}>Booking Confirmed!</Text>
          <Text style={styles.modalText}>
            Your parking spot has been reserved for {duration} hour(s).
          </Text>
          <Text style={styles.modalText}>Spot: {spotName}</Text>
          <Text style={styles.modalText}>Address: {spotAddress}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalIcon: {
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
