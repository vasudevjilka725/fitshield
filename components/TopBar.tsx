import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { navigate } from "expo-router/build/global-state/routing";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type TopBarProps = {
  search: string;
  setSearch: (text: string) => void;
};

export default function TopBar({ search, setSearch }: TopBarProps) {

    
  return (
    <View style={styles.rowWrapper}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#A9A9A9"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search here..."
          placeholderTextColor="#A9A9A9"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.unverifiedContainer}>
        <MaterialIcons
          name="warning"
          size={16}
          color="#B22222"
          style={{ marginRight: 4 }}
        />
        <TouchableOpacity>
          <Text style={styles.unverifiedText}>Unverified</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.earningContainer}>
        <TouchableOpacity onPress={() => navigate('/wallet')}>
          <Text style={styles.earningText}>Live earning: 0/-</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.iconButton}>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.iconButton}>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={22} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const SEARCH_HEIGHT = 40;
const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    paddingLeft: 6,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "76%",
    height: SEARCH_HEIGHT,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    paddingVertical: 0,
  },
  unverifiedContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFECEC",
    borderColor: "#FF4C4C",
    borderWidth: 1,
    paddingHorizontal: 8,
    height: SEARCH_HEIGHT,
    borderRadius: 6,
    marginRight: 8,
  },
  unverifiedText: {
    color: "#B22222",
    fontSize: 14,
    fontWeight: "bold",
  },
  earningContainer: {
    backgroundColor: "green",
    borderRadius: 6,
    paddingHorizontal: 8,
    height: SEARCH_HEIGHT,
    justifyContent: "center",
  },
  earningText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  iconButton: {
    height: SEARCH_HEIGHT,
    width: SEARCH_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#F0F0F0",
    marginLeft: 8,
  },
});
