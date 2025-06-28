import TopBar from "@/components/TopBar";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
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
  const dropdown1Options = [
    "All",
    "Drinks",
    "Desserts",
    "Main Course",
    "Side Dish",
  ];
  const dropdown2Options = ["Full", "Half"];

  const initialData: ItemType[] = [
    {
      id: "1",
      name: "Paneer Butter Masala",
      price: 250,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
    {
      id: "2",
      name: "Chicken Biryani",
      price: 300,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
    {
      id: "3",
      name: "Masala Dosa",
      price: 120,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
    {
      id: "4",
      name: "Veg Fried Rice",
      price: 180,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
    {
      id: "5",
      name: "Dal Makhani",
      price: 200,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
    {
      id: "6",
      name: "Butter Naan",
      price: 40,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
    {
      id: "7",
      name: "Gulab Jamun",
      price: 50,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
    {
      id: "8",
      name: "Tandoori Chicken",
      price: 350,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
    {
      id: "9",
      name: "Chole Bhature",
      price: 150,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
    {
      id: "10",
      name: "Samosa",
      price: 20,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
    {
      id: "11",
      name: "Mutton Rogan Josh",
      price: 400,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
    {
      id: "12",
      name: "Veg Manchurian",
      price: 160,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
    {
      id: "13",
      name: "Fish Curry",
      price: 320,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
    {
      id: "14",
      name: "Egg Curry",
      price: 180,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
    {
      id: "15",
      name: "Idli Sambhar",
      price: 90,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
    {
      id: "16",
      name: "Pav Bhaji",
      price: 130,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
    {
      id: "17",
      name: "Rajma Chawal",
      price: 170,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
    {
      id: "18",
      name: "Hakka Noodles",
      price: 190,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
    {
      id: "19",
      name: "Veg Pulao",
      price: 160,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
    {
      id: "20",
      name: "Ice Cream Sundae",
      price: 110,
      selected: false,
      discount: "0%",
      discountDropdownVisible: false,
    },
  ];

  const [tableData, setTableData] = useState(initialData);

  const renderDropdownItem = (item: string, id: string) => (
    <TouchableOpacity
      key={item}
      style={styles.dropdownItem}
      onPress={() => changeDiscount(id, item)}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const toggleSelect = (id: string) => {
    setTableData((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              selected: !item.selected,
              discountDropdownVisible: false,
            }
          : item
      )
    );
  };

  const toggleDiscountDropdown = (id: string) => {
    setTableData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, discountDropdownVisible: !item.discountDropdownVisible }
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
              <Ionicons
                name="search"
                size={20}
                color="#A9A9A9"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchBar}
                placeholder="Search dish name..."
                placeholderTextColor="#A9A9A9"
                value={search1}
                onChangeText={setSearch1}
              />
            </View>

            <View style={styles.dropdownMainContainer}>
              <TouchableOpacity
                style={styles.dropdownLarge}
                onPress={() => {
                  setDropdown1Visible(!dropdown1Visible);
                  setDropdown2Visible(false);
                }}
              >
                <View style={styles.dropdownInner}>
                  <Text>{selectedDropdown1}</Text>
                  <Ionicons
                    name="chevron-down"
                    size={16}
                    color="#333"
                    style={{ marginLeft: 8 }}
                  />
                </View>
              </TouchableOpacity>
              {dropdown1Visible && (
                <View style={styles.dropdownListLarge}>
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

            <View style={styles.dropdownMainContainer}>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => {
                  setDropdown2Visible(!dropdown2Visible);
                  setDropdown1Visible(false);
                }}
              >
                <View style={styles.dropdownInner}>
                  <Text>{selectedDropdown2}</Text>
                  <Ionicons
                    name="chevron-down"
                    size={16}
                    color="#333"
                    style={{ marginLeft: 8 }}
                  />
                </View>
              </TouchableOpacity>
              {dropdown2Visible && (
                <View style={styles.dropdownList}>
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
                <DataTable.Title
                  numeric
                  style={[styles.column, styles.cellBorder]}
                >
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
                const discountPrice =
                  item.price - (item.price * discountValue) / 100;

                return (
                  <DataTable.Row key={item.id} style={styles.row}>
                    <DataTable.Cell style={[styles.column, styles.cellBorder]}>
                      <TouchableOpacity
                        style={[
                          styles.checkbox,
                          item.selected && styles.checkboxSelected,
                        ]}
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
                    <DataTable.Cell
                      numeric
                      style={[styles.column, styles.cellBorder]}
                    >
                      ₹{item.price}
                    </DataTable.Cell>

                    <DataTable.Cell style={[styles.column, styles.cellBorder]}>
                      {item.selected ? (
                        <View style={{ position: "relative", zIndex: 9999 }}>
                          <TouchableOpacity
                            style={styles.discountDropdown}
                            onPress={() => toggleDiscountDropdown(item.id)}
                          >
                            <View style={styles.discountDropdownInner}>
                              <Text>{item.discount}</Text>
                              <Ionicons
                                name="chevron-down"
                                size={16}
                                color="#333"
                                style={{ marginLeft: 8 }}
                              />
                            </View>
                          </TouchableOpacity>

                          {item.discountDropdownVisible && (
                            <View style={styles.discountDropdownListWrapper}>
                              <View style={styles.discountDropdownList}>
                                <FlatList
                                  data={discountOptions}
                                  keyExtractor={(option) => option}
                                  renderItem={({ item: option }) =>
                                    renderDropdownItem(option, item.id)
                                  }
                                />
                              </View>
                            </View>
                          )}
                        </View>
                      ) : (
                        <Text>0%</Text>
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

const SEARCH_HEIGHT = 40;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 40,
    paddingRight: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    zIndex: 999,
    justifyContent: "space-between",
    marginTop: 30,
  },
  discountLabel: {
    fontSize: 30,
    fontWeight: "500",
    color: "#333",
    paddingLeft: 25,
  },
  rightControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    height: SEARCH_HEIGHT,
    width: 450,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchContainer :{
     flexDirection: "row",
    alignItems: "center",
  },
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingTop: 1,
    maxHeight: 500,
    borderWidth: 1,
    marginLeft: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,
    marginTop: 30,
  },
  tableHeader: {
    backgroundColor: "#A9A9A9",
    borderTopLeftRadius: 8,
  },
  column: {
    justifyContent: "center",
  },
  cellBorder: {
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  row: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: { backgroundColor: "green" },
  discountDropdown: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 8,
    height: SEARCH_HEIGHT - 15,
    backgroundColor: "#fff",
    width: 200,
  },
  dropdownMainContainer: { position: "relative", marginRight: 10, zIndex: 999 },
  dropdownLarge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
    height: SEARCH_HEIGHT,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 90,
    height: SEARCH_HEIGHT,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  dropdownListLarge: {
    position: "absolute",
    top: SEARCH_HEIGHT + 2,
    width: 200,
    maxHeight: 150,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    zIndex: 999,
  },
  dropdownList: {
    position: "absolute",
    top: SEARCH_HEIGHT + 2,
    width: 90,
    maxHeight: 150,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    zIndex: 999,
  },
  dropdownItem: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  discountDropdownListWrapper: {
    position: "absolute",
    top: 35,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    zIndex: 9999,
  },
  discountDropdownList: {
    maxHeight: 200,
    width: 80,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  goLiveButton: {
    backgroundColor: "green",
    borderRadius: 6,
    width: 150,
    height: SEARCH_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  goLiveText: { color: "#fff", fontWeight: "bold" },
  dropdownInner: {
    flexDirection: "row",
    alignItems: "center",
  },

  discountDropdownInner: {
    flexDirection: "row",
    alignItems: "center",
  },
});
