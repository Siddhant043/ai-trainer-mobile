import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import CustomText from "./CustomText";
import { useUserStore } from "../store";
import { useLogout } from "../hooks/useAuth";

interface DrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const { width: screenWidth } = Dimensions.get("window") || { width: 375 };

const DrawerModal: React.FC<DrawerModalProps> = ({ isOpen, onClose }) => {
  const { user } = useUserStore();
  const { logout } = useLogout();
  const slideAnim = useRef(
    new Animated.Value(-(screenWidth || 375) * 0.8)
  ).current;
  const [modalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      setModalVisible(true);
      // Reset position first, then animate in
      slideAnim.setValue(-(screenWidth || 375) * 0.8);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      // Animate out first, then hide modal
      Animated.timing(slideAnim, {
        toValue: -screenWidth * 0.8,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setModalVisible(false);
      });
    }
  }, [isOpen, slideAnim]);

  const handleDrawerItemPress = (route: string) => {
    onClose();
    // TODO: Implement navigation to specific routes
    console.log(`Navigate to: ${route}`);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.drawerContainer,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        <View style={styles.drawerContent}>
          {/* User Profile Section */}
          <View style={styles.userSection}>
            <View style={styles.userAvatar}>
              <FontAwesome5 name="user" size={24} color="#666" />
            </View>
            <View style={styles.userInfo}>
              <CustomText style={styles.userName}>{user.name}</CustomText>
              <CustomText style={styles.userEmail}>{user.email}</CustomText>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => handleLogout()}
              >
                <Ionicons name="log-out-outline" size={16} color="#EA2929" />
                <CustomText style={styles.logoutText}>Logout</CustomText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Drawer Items */}
          <View style={styles.menuSection}>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => handleDrawerItemPress("Account")}
            >
              <View style={styles.drawerItemContent}>
                <Ionicons name="person-outline" size={24} color="#333" />
                <CustomText style={styles.drawerItemText}>Account</CustomText>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => handleDrawerItemPress("Settings")}
            >
              <View style={styles.drawerItemContent}>
                <Ionicons name="settings-outline" size={24} color="#333" />
                <CustomText style={styles.drawerItemText}>Settings</CustomText>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => handleDrawerItemPress("Upgrade Plan")}
            >
              <View style={styles.drawerItemContent}>
                <MaterialIcons name="upgrade" size={24} color="#000" />
                <CustomText style={styles.upgradeItemText}>
                  Upgrade Plan
                </CustomText>
                <Ionicons name="star" size={24} color="#FFD700" />
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: screenWidth * 0.8,
    backgroundColor: "#fff",
  },
  drawerContent: {
    flex: 1,
    paddingTop: 60, // Account for status bar
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontFamily: "OutfitSemiBold",
    color: "#333",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFF5F5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFE5E5",
    alignSelf: "flex-start",
  },
  logoutText: {
    fontSize: 14,
    color: "#EA2929",
    marginLeft: 6,
    fontFamily: "OutfitSemiBold",
  },
  menuSection: {
    paddingTop: 20,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f8f8",
  },
  drawerItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  drawerItemText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
  },
  upgradeItemText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "OutfitSemiBold",
    marginLeft: 15,
    textDecorationLine: "underline",
  },
});

export default DrawerModal;
