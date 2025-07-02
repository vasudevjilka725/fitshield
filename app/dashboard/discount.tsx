import TopBar from "@/components/TopBar";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { DataTable } from "react-native-paper";

type ItemType = {
  id: string;
  name: string;
  price: number;
  selected: boolean;
  discount: string;
  discountDropdownVisible: boolean;
};

export default function DiscountPage() {
  const [search, setSearch] = useState("");
  const [search1, setSearch1] = useState("");
  const [dropdown1Visible, setDropdown1Visible] = useState(false);
  const [dropdown2Visible, setDropdown2Visible] = useState(false);
  const [selectedDropdown1, setSelectedDropdown1] = useState("All");
  const [selectedDropdown2, setSelectedDropdown2] = useState("Full");

  const discountOptions = Array.from({ length: 21 }, (_, i) => `${i * 5}%`);
  const dropdown1Options = ["All", "Drinks", "Desserts", "Main Course", "Side Dish"];
  const dropdown2Options = ["Full", "Half"];

  const [tableData, setTableData] = useState<ItemType[]>(generateInitialData());

  const toggleSelect = (id: string) => {
    setTableData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, selected: !item.selected, discountDropdownVisible: false }
          : item
      )
    );
  };

  const toggleDiscountDropdown = (id: string) => {
    setTableData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              discountDropdownVisible: item.selected
                ? !item.discountDropdownVisible
                : false,
            }
          : { ...item, discountDropdownVisible: false }
      )
    );
  };

  const changeDiscount = (id: string, discount: string) => {
    setTableData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, discount, discountDropdownVisible: false }
          : item
      )
    );
  };

  const handlePagePress = () => {
    setDropdown1Visible(false);
    setDropdown2Visible(false);
    setTableData((prev) =>
      prev.map((item) => ({ ...item, discountDropdownVisible: false }))
    );
  };

  return (
    <TouchableWithoutFeedback onPress={handlePagePress}>
      <View style={styles.mainContainer}>
        <TopBar search={search} setSearch={setSearch} />

        <View style={styles.controlsRow}>
          <Text style={styles.discountLabel}>Discount</Text>

          <View style={styles.rightControls}>
            <View style={styles.searchContainer}>
              <View style={styles.searchWrapper}>
                <Ionicons
                  name="search"
                  size={20}
                  color="#A9A9A9"
                  style={styles.searchIconInside}
                />
                <TextInput
                  style={styles.searchBar}
                  placeholder="Search dish name..."
                  placeholderTextColor="#A9A9A9"
                  value={search1}
                  onChangeText={setSearch1}
                />
              </View>
            </View>

            <View style={[styles.dropdownMainContainer, { zIndex: 10000 }]}>
              <TouchableOpacity
                style={styles.dropdownLarge}
                onPress={() => {
                  setDropdown1Visible(!dropdown1Visible);
                  setDropdown2Visible(false);
                }}
              >
                <View style={styles.dropdownInner}>
                  <Text>{selectedDropdown1}</Text>
                  <Ionicons name="chevron-down" size={16} color="#333" style={{ marginLeft: 8 }} />
                </View>
              </TouchableOpacity>
              {dropdown1Visible && (
                <View style={[styles.dropdownListLarge, { zIndex: 10000 }]}>
                  {dropdown1Options.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedDropdown1(item);
                        setDropdown1Visible(false);
                      }}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <View style={[styles.dropdownMainContainer, { zIndex: 10000 }]}>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => {
                  setDropdown2Visible(!dropdown2Visible);
                  setDropdown1Visible(false);
                }}
              >
                <View style={styles.dropdownInner}>
                  <Text>{selectedDropdown2}</Text>
                  <Ionicons name="chevron-down" size={16} color="#333" style={{ marginLeft: 8 }} />
                </View>
              </TouchableOpacity>
              {dropdown2Visible && (
                <View style={[styles.dropdownList, { zIndex: 10000 }]}>
                  {dropdown2Options.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedDropdown2(item);
                        setDropdown2Visible(false);
                      }}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <TouchableOpacity style={styles.goLiveButton}>
              <Text style={styles.goLiveText}>Go Live •</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <ScrollView>
            <DataTable>
              <DataTable.Header style={styles.tableHeader}>
                <DataTable.Title style={[styles.column, styles.cellBorder]}>
                  Select
                </DataTable.Title>
                <DataTable.Title style={[styles.column, styles.cellBorder]}>
                  Dish Name
                </DataTable.Title>
                <DataTable.Title numeric style={[styles.column, styles.cellBorder]}>
                  Current Price
                </DataTable.Title>
                <DataTable.Title style={[styles.column, styles.cellBorder]}>
                  Discount%
                </DataTable.Title>
                <DataTable.Title numeric style={styles.column}>
                  Discount Price
                </DataTable.Title>
              </DataTable.Header>

              {tableData.map((item) => {
                const discountValue = parseInt(item.discount);
                const discountPrice = item.price - (item.price * discountValue) / 100;

                return (
                  <DataTable.Row key={item.id} style={styles.row}>
                    <DataTable.Cell style={[styles.column, styles.cellBorder]}>
                      <TouchableOpacity
                        style={[styles.checkbox, item.selected && styles.checkboxSelected]}
                        onPress={() => toggleSelect(item.id)}
                      >
                        {item.selected && (
                          <Ionicons name="checkmark" size={16} color="white" />
                        )}
                      </TouchableOpacity>
                    </DataTable.Cell>

                    <DataTable.Cell style={[styles.column, styles.cellBorder]}>
                      {item.name}
                    </DataTable.Cell>

                    <DataTable.Cell numeric style={[styles.column, styles.cellBorder]}>
                      ₹{item.price}
                    </DataTable.Cell>

                    <DataTable.Cell style={[styles.column, styles.cellBorder]}>
                      <TouchableOpacity
                        style={[
                          styles.discountCell,
                          !item.selected && { opacity: 0.5 },
                        ]}
                        onPress={() => {
                          if (item.selected) toggleDiscountDropdown(item.id);
                        }}
                        disabled={!item.selected}
                      >
                        <Text>{item.discount}</Text>
                        <Ionicons name="chevron-down" size={16} color="#333" style={{ marginLeft: 8 }} />
                      </TouchableOpacity>

                      {item.discountDropdownVisible && (
                        <View style={styles.dropdownListContainer}>
                          <ScrollView style={styles.dropdownList}>
                            {discountOptions.map((option) => (
                              <TouchableOpacity
                                key={option}
                                style={styles.dropdownItem}
                                onPress={() => changeDiscount(item.id, option)}
                              >
                                <Text>{option}</Text>
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        </View>
                      )}
                    </DataTable.Cell>

                    <DataTable.Cell numeric style={styles.column}>
                      ₹{discountPrice}
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </DataTable>
          </ScrollView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function generateInitialData(): ItemType[] {
  const names = [
    "Paneer Butter Masala", "Chicken Biryani", "Masala Dosa", "Veg Fried Rice", "Dal Makhani",
    "Butter Naan", "Gulab Jamun", "Tandoori Chicken", "Chole Bhature", "Samosa",
    "Mutton Rogan Josh", "Veg Manchurian", "Fish Curry", "Egg Curry", "Idli Sambhar",
    "Pav Bhaji", "Rajma Chawal", "Hakka Noodles", "Veg Pulao", "Ice Cream Sundae"
  ];
  return names.map((name, index) => ({
    id: (index + 1).toString(),
    name,
    price: 100 + index * 10,
    selected: false,
    discount: "0%",
    discountDropdownVisible: false,
  }));
}

const SEARCH_HEIGHT = 40;
const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#fff", paddingLeft: 40, paddingRight: 20 },
  controlsRow: {
    flexDirection: "row", alignItems: "center", marginBottom: 15,
    justifyContent: "space-between", marginTop: 30,
  },
  discountLabel: { fontSize: 30, fontWeight: "500", color: "#333", paddingLeft: 25 },
  rightControls: { flexDirection: "row", alignItems: "center" },
  searchContainer: { flexDirection: "row", alignItems: "center" },
  searchWrapper: {
    flexDirection: "row", alignItems: "center",
    borderWidth: 1, borderColor: "#ccc", borderRadius: 6,
    paddingHorizontal: 10, height: SEARCH_HEIGHT, width: 450, backgroundColor: "#fff",
  },
  searchIconInside: { marginRight: 8 },
  searchBar: { flex: 1, fontSize: 16 },
  dropdownMainContainer: { position: "relative", marginRight: 10 },
  dropdownLarge: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    width: 200, height: SEARCH_HEIGHT, borderWidth: 1, borderColor: "#ccc",
    borderRadius: 6, paddingHorizontal: 10, backgroundColor: "#fff",
  },
  dropdown: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    width: 90, height: SEARCH_HEIGHT, borderWidth: 1, borderColor: "#ccc",
    borderRadius: 6, paddingHorizontal: 10, backgroundColor: "#fff",
  },
  dropdownListLarge: {
    position: "absolute", top: SEARCH_HEIGHT + 2, width: 200, maxHeight: 150,
    backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc",
    borderRadius: 6,
  },
  dropdownList: { maxHeight: 200 },
  dropdownItem: { paddingVertical: 6, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
  goLiveButton: {
    backgroundColor: "green", borderRadius: 6, width: 150,
    height: SEARCH_HEIGHT, justifyContent: "center", alignItems: "center",
  },
  goLiveText: { color: "#fff", fontWeight: "bold" },
  dropdownInner: { flexDirection: "row", alignItems: "center" },
  tableContainer: {
    backgroundColor: "#fff", borderRadius: 8, maxHeight: 500,
    borderWidth: 1, marginLeft: 25, shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.5,
    shadowRadius: 3, elevation: 4, marginTop: 30,
  },
  tableHeader: { backgroundColor: "#A9A9A9", borderTopLeftRadius: 8 },
  column: { justifyContent: "center" },
  cellBorder: { borderRightWidth: 1, borderColor: "#ccc" },
  row: { borderBottomWidth: 1, borderColor: "#ccc" },
  checkbox: {
    width: 20, height: 20, borderWidth: 1, borderColor: "#333",
    borderRadius: 4, justifyContent: "center", alignItems: "center",
  },
  checkboxSelected: { backgroundColor: "green" },
  discountCell: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  dropdownListContainer: {
    position: "absolute", top: SEARCH_HEIGHT / 2, left: 0, right: 0,
    backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc",
    borderRadius: 6, zIndex: 9999,
  },
});
