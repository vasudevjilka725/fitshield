import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import TopBar from "../components/TopBar";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const generateDummyData = () => {
  const data = [];
  for (let i = 1; i <= 40; i++) {
    data.push({
      id: i.toString(),
      date: `2024-06-${((i % 30) + 1).toString().padStart(2, "0")}`,
      billNo: `BILL${1000 + i}`,
      name: `Customer ${i}`,
      time: `${9 + (i % 12)}:${(i * 5) % 60} `.padStart(2, "0"),
      tableNo: `T${(i % 10) + 1}`,
      payType: i % 2 === 0 ? "UPI" : "Cash",
    });
  }
  return data;
};

const tableData = generateDummyData();

export default function Wallet() {
  const [search, setSearch] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDayPress = (day: any) => {
    console.log("Selected date:", day.dateString);
    setShowCalendar(false);
  };

  const renderTableHeader = () => (
    <View style={styles.tableRowHeader}>
      {["Date", "Bill No", "Name", "Time", "Table No", "Pay Type", "View"].map(
        (item, index) => (
          <Text key={index} style={[styles.cell, styles.cellHeader, {
            width : columnWidths[index]
          }]}>
            {item}
          </Text>
        )
      )}
    </View>
  );

  const renderRow = ({ item }: any) => (
  <View style={styles.tableRow}>
    {[item.date, item.billNo, item.name, item.time, item.tableNo, item.payType, "See All"].map(
      (val, index) => (
        index === 6 ? (
          <TouchableOpacity key={index}>
            <Text style={[styles.cell, styles.viewText, { width: columnWidths[index] }]}>
              {val}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text key={index} style={[styles.cell, { width: columnWidths[index] }]}>
            {val}
          </Text>
        )
      )
    )}
  </View>
);

  return (
    <View style={styles.screen}>
      <View style={styles.topbar}>
        <TopBar search={search} setSearch={setSearch} />
      </View>

      <View style={styles.mainContainer}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Text style={styles.earningText}>Earning</Text>

          <View style={styles.rightGroup}>
            <View style={styles.amountBox}>
              <Text style={styles.amountText}>₹45000</Text>
            </View>

            <TextInput
              style={styles.searchBar}
              placeholder="Search..."
              value={search}
              onChangeText={setSearch}
            />

            <TouchableOpacity onPress={() => setShowCalendar(true)}>
              <Ionicons name="calendar-outline" size={30} color="#555" />
            </TouchableOpacity>
          </View>
        </View>

        <Modal visible={showCalendar} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.calendarContainer}>
              <Calendar onDayPress={handleDayPress} enableSwipeMonths />
              <TouchableOpacity
                onPress={() => setShowCalendar(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* UPI ID Section */}
        <View style={styles.upiContainer}>
          <Text style={styles.upiText}>UPI ID : test@oksbi</Text>
        </View>

        {/* Table */}
        <View style={styles.tableWrapper}>
          {renderTableHeader()}
          <FlatList
            data={tableData}
            keyExtractor={(item) => item.id}
            renderItem={renderRow}
            contentContainerStyle={styles.tableBody}
            showsVerticalScrollIndicator={true}
          />
        </View>
      </View>
    </View>
  );
}

// Define fixed widths for perfect alignment
const columnWidths = [190, 190, 190, 190, 190, 190, 190];

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 16,
  },

  topbar: {
    marginLeft: 10,
  },

  mainContainer: {
    backgroundColor: "#F8F8F8",
    flex: 1,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "space-between",
  },

  earningText: {
    marginLeft: 30,
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    paddingTop: 10,
  },

  rightGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingTop: 30,
  },

  amountBox: {
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: 150,
    alignItems: "center",
  },

  amountText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  searchBar: {
    height: 38,
    width: 400,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#F8F8F8",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  calendarContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxWidth: 350,
  },

  closeButton: {
    marginTop: 10,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },

  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  upiContainer: {
    marginLeft: 30,
    paddingTop: 10,
  },

  upiText: {
    fontSize: 22,
    fontWeight: "100",
  },

  tableWrapper: {
    marginTop: 20,
    marginHorizontal: 5,
    marginLeft: 30,
    flex: 1,
  },

  tableRowHeader: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: "center",
  },

  tableRow: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },

  tableBody: {
    paddingBottom: 10,
  },

  cellHeader: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },

  cell: {
    fontSize: 17,
    textAlign: "center",
  },

  viewText: {
    color: "#007BFF",
    fontWeight: "600",
  },
});

