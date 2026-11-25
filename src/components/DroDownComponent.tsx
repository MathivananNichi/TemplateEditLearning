import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AppText } from "./AppText";

const DATA = [
  { label: "+91", value: "1" },
  { label: "+91", value: "2" },
];

const DropdownComponent = () => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: "#5B3DF5" }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      containerStyle={styles.menuContainer}
      itemContainerStyle={styles.itemContainer}
      data={DATA}
      maxHeight={160}
      labelField="label"
      valueField="value"
      placeholder="+91"
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item.value);
        setIsFocus(false);
      }}
      renderItem={(item) => (
        <View style={styles.itemRow}>
          <AppText numberOfLines={1} style={styles.itemLabel}>
            {item.label}
          </AppText>
        </View>
      )}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  // Closed trigger box
  dropdown: {
    height: 28,
    width: 55,
    paddingHorizontal: 6,
    paddingVertical: 0,
    margin: 0,
    borderRadius: 6,
  },
  placeholderStyle: {
    fontSize: 13,
    lineHeight: 16,
    color: "#6B7280",
  },
  selectedTextStyle: {
    fontSize: 13,
    lineHeight: 16,
    color: "#111827",
  },
  iconStyle: {
    width: 16,
    height: 16,
  },

  // Opened popup list
  menuContainer: {
    width: 68,
    padding: 0,
    margin: 0,
    borderRadius: 6,
    overflow: "hidden",
  },
  itemContainer: {
    padding: 0,
    margin: 0,
  },
  itemRow: {
    paddingVertical: 5,
    paddingHorizontal: 6,
    justifyContent: "center",
  },
  itemLabel: {
    fontSize: 13,
    lineHeight: 16,
    color: "#111827",
  },
});
