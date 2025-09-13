import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import CustomText from "./CustomText";

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon: keyof typeof Feather.glyphMap;
  iconColor?: string;
  textColor?: string;
  onPress: () => void;
}

interface DropdownMenuProps {
  items: DropdownMenuItem[];
  buttonStyle?: any;
  dropdownStyle?: any;
  menuItemStyle?: any;
  showDivider?: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  buttonStyle,
  dropdownStyle,
  menuItemStyle,
  showDivider = true,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleItemPress = (item: DropdownMenuItem) => {
    setShowMenu(false);
    item.onPress();
  };

  const closeMenu = () => setShowMenu(false);

  return (
    <View style={[styles.menuContainer, buttonStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setShowMenu(!showMenu)}
        style={styles.menuButton}
      >
        <Entypo name="dots-three-vertical" size={24} color="black" />
      </TouchableOpacity>

      {showMenu && (
        <Modal
          visible={showMenu}
          transparent
          animationType="fade"
          onRequestClose={closeMenu}
        >
          <TouchableWithoutFeedback onPress={closeMenu}>
            <View style={styles.menuOverlay} />
          </TouchableWithoutFeedback>

          <View style={[styles.menuDropdown, dropdownStyle]}>
            {items.map((item, index) => (
              <React.Fragment key={item.id}>
                <TouchableOpacity
                  style={[styles.menuItem, menuItemStyle]}
                  onPress={() => handleItemPress(item)}
                >
                  <Feather
                    name={item.icon}
                    size={20}
                    color={item.iconColor || "#333"}
                  />
                  <CustomText
                    style={{
                      ...styles.menuItemText,
                      color: item.textColor || "#333",
                    }}
                  >
                    {item.label}
                  </CustomText>
                </TouchableOpacity>
                {showDivider && index < items.length - 1 && (
                  <View style={styles.menuDivider} />
                )}
              </React.Fragment>
            ))}
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: "relative",
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  menuDropdown: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    minWidth: 140,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 8,
  },
});

export default DropdownMenu;
