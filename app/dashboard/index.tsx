import TopBar from "@/components/TopBar";
import { Ionicons } from "@expo/vector-icons";
import { navigate } from "expo-router/build/global-state/routing";
import { useState } from "react";
import {
  Dimensions,
  FlatList, Modal, StyleSheet,
  Text, TextInput, TouchableOpacity, View
} from "react-native";
import { Calendar } from "react-native-calendars";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [search1, setSearch1] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDayPress = (day: any) => {
    console.log("Selected date:", day.dateString);
    setShowCalendar(false); // close calendar after selection
  };

  const tableOrders = [
    { id: "1", table: 7, item: "Water Bottle", quantity: 1 },
    { id: "2", table: 3, item: "Cold Coffee", quantity: 2 },
    { id: "3", table: 5, item: "Parle Cake", quantity: 1 },
    { id: "4", table: 1, item: "Pasta", quantity: 1 },
    { id: "5", table: 2, item: "Maggie", quantity: 1 },
    { id: "6", table: 8, item: "Vada Pav", quantity: 1 },
  ];

  return (
    <View style={styles.container}>
      <TopBar search={search} setSearch={setSearch}/>

      <View style={styles.secondContainer}>
        <View style={styles.cardRow}>
          <View style={styles.card1}>
            <View style={styles.card1Header}>
              <Text style={styles.card1Title}>Earning</Text>

              <TouchableOpacity onPress={() => setShowCalendar(true)}>
                <Ionicons name="calendar-outline" size={30} color="#555" />
              </TouchableOpacity>
            </View>
            <Text style={styles.card1Amount}>0/-</Text>
          </View>

          <Modal visible={showCalendar} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.calendarContainer}>
                <Calendar
                  onDayPress={handleDayPress}
                  enableSwipeMonths
                  markedDates={{}}
                />
                <TouchableOpacity
                  onPress={() => setShowCalendar(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Card 2 - Discount */}
          <TouchableOpacity onPress={() => navigate('/dashboard/discount')}>
            <View style={styles.card2}>
            <Text style={styles.card2Title}>Discount</Text>
            <View style={styles.card2Details}>
              <Text style={styles.card3Bullet}>• 5% Off</Text>
              <Text style={styles.card3Bullet}>• 10% Off</Text>
              <Text style={styles.card3Bullet}>• 15% Off</Text>
            </View>
          </View>
          </TouchableOpacity>

          {/* Card 3 - Live Menu */}
          <TouchableOpacity onPress={ () => navigate('/menu')}>
            <View style={styles.card3}>
            <Text style={styles.card3Title}>Live Menu</Text>
            <View style={styles.card3Items}>
              <Text style={styles.card3Bullet}>• Water Bottle</Text>
              <Text style={styles.card3Bullet}>• Giant Chocolate Icecream</Text>
              <Text style={styles.card3Bullet}>• Parle Cake</Text>
            </View>
          </View>
          </TouchableOpacity>

          {/* Card 4 - Table Management */}
          <View style={styles.card4}>
            <Text style={styles.card4Text}>Table Management</Text>
            <Text style={styles.card1Amount}>28</Text>
          </View>
        </View>

        <View style={styles.secondCardRow}>
          <View style={styles.card5}>
            <Text style={styles.card5Title}>Order</Text>
            <FlatList
              contentContainerStyle={styles.card5ListCenter}
              data={tableOrders}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.card5Item}>
                  <View style={styles.card5Header}>
                    <View style={styles.card5TableWrapper}>
                      <Text style={styles.card5Table}>
                        Table no. #{item.table}
                      </Text>
                    </View>
                    <View style={styles.card5ButtonWrapper}>
                      <TouchableOpacity style={styles.acceptButton}>
                        <Text style={styles.acceptButtonText}>Accept</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.card5Row}>
                    <Text style={styles.card5Label}>Item name</Text>
                    <Text style={styles.card5Label}>Qut</Text>
                  </View>
                  <View style={styles.card5Row}>
                    <Text style={styles.card5Value}>{item.item}</Text>
                    <Text style={styles.card5Value}>{item.quantity}</Text>
                  </View>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View style={styles.card6}>
            <View style={styles.card6row1}>
              {/* LEFT SIDE */}
              <View style={styles.card6LeftNew}>
                <Text style={styles.card6Title}>Print Bill</Text>
                <View style={styles.searchWrapper}>
                  <Ionicons
                    name="search"
                    size={18}
                    color="#A9A9A9"
                    style={styles.searchIcon1}
                  />
                  <TextInput
                    style={styles.searchInput1}
                    placeholder="Search here..."
                    placeholderTextColor="#A9A9A9"
                    value={search1}
                    onChangeText={setSearch1}
                  />
                </View>
              </View>

              {/* RIGHT SIDE */}
              <View style={styles.card6RightNew}>
                <Text style={styles.historyText}>History</Text>
                <View style={{ width: 290 }} /> {/* Big gap */}
                <TouchableOpacity onPress={() => setShowCalendar(true)}>
                  <Ionicons name="calendar-outline" size={30} color="#555" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.tableContainer}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderCell}>Table No.</Text>
                <Text style={styles.tableHeaderCell}>Name</Text>
                <Text style={styles.tableHeaderCell}>Print</Text>
              </View>

              {/* Table Data */}
              <FlatList
                data={[
                  { id: "1", tableNo: "G-3", name: "XYZ" },
                  { id: "2", tableNo: "G-5", name: "ABC" },
                  { id: "3", tableNo: "G-1", name: "XYZ" },
                  { id: "4", tableNo: "G-2", name: "ABC" },
                  { id: "5", tableNo: "G-4", name: "XYZ" },
                  { id: "6", tableNo: "G-6", name: "ABC" },
                  { id: "7", tableNo: "G-7", name: "XYZ" },
                  { id: "8", tableNo: "G-8", name: "ABC" },
                ]}
                keyExtractor={(item) => item.id}
                style={{ maxHeight: 280 }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={styles.tableRow}>
                    {/* Table No. + Edit Icon */}
                    <View style={styles.tableCell}>
                      <Text>{item.tableNo}</Text>
                      <TouchableOpacity>
                        <Ionicons
                        name="create-outline"
                        size={16}
                        color="#007AFF"
                        style={{ marginLeft: 6 }}
                      />
                      </TouchableOpacity>
                    </View>

                    {/* Name */}
                    <View style={styles.tableCell}>
                      <Text>{item.name}</Text>
                    </View>

                    {/* Print Buttons */}
                    <View style={styles.tableCell}>
                      <TouchableOpacity style={styles.printButton}>
                        <Text style={styles.printButtonText}>Bill</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.printButton}>
                        <Text style={styles.printButtonText}>KOT</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const SEARCH_HEIGHT = 40;
const cardWidth = (SCREEN_WIDTH - 40 - 130) / 4;

const styles = StyleSheet.create({
  container: {
  flex: 1,
  paddingTop: 20,
  backgroundColor: "#fff",
  paddingLeft: 32, // KEEP left padding
  paddingRight: 0,
  },
  secondContainer: {
    backgroundColor: "#D3D3D3",
    marginTop: 20,
    paddingBottom: 30,
  },
  rowWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft : 16,
    paddingLeft : 6
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.7,
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
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 15,
  },

  // --- Card 1: Earning ---
  card1: {
    width: cardWidth,
    height: 170,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    justifyContent: "flex-start",
  },
  card1Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  card1Title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
  },
  card1Amount: {
    fontSize: 40,
    fontWeight: "bold",
    color: "green",
    textAlign: "left",
    paddingTop: 30,
  },

  // --- Card 2: Discount ---
  card2: {
    width: cardWidth,
    height: 170,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    justifyContent: "flex-start",
  },
  card2Title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  card2Details: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 15,
    paddingBottom: 15,
  },
  card2Item: {
    fontSize: 12,
    color: "#666",
  },

  // --- Card 3: Live Menu ---
  card3: {
    width: cardWidth,
    height: 170,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    justifyContent: "flex-start",
  },
  card3Title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
  },
  card3Items: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 15,
    paddingBottom: 15,
  },
  card3Bullet: {
    fontSize: 18,
    color: "#A9A9A9",
    paddingLeft: 4,
  },

  // --- Card 4: Table Management ---
  card4: {
    width: cardWidth,
    height: 170,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    justifyContent: "flex-start",
  },
  card4Text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
  },
  secondCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 15,
  },

  card5: {
    width: (SCREEN_WIDTH - 40 - 730) / 2,
    height: 450,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 25,
    justifyContent: "flex-start",
  },
  card5ListCenter: {
    paddingVertical: 10,
  },
  card5Title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    paddingBottom :10
  },
  card5Item: {
    width: "100%", // Use full width of parent
    backgroundColor: "#F9F9F9",
    borderRadius: 20,
    paddingHorizontal: 10, // Reduce horizontal padding
    paddingVertical: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  card5Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  card5Table: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  acceptButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },

  acceptButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  card5Row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
  },

  card5Label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888",
  },

  card5Value: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  card5TableWrapper: {
    flex: 1,
    justifyContent: "flex-start",
  },

  card5ButtonWrapper: {
    flex: 0,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  card6: {
    width: (SCREEN_WIDTH - 40 + 530) / 2,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    marginLeft : 12
  },
  card6Title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
  },
  card6row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom : 15
  },
  card6LeftNew: {
  flexDirection: "row",
  alignItems: "center",
  flex: 1,
  gap: 6, // gap between Print Bill and Search bar
},
card6RightNew: {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
},
  card6Left: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },

  card6Right: {
    flexDirection: "row",
    alignItems: "center",
  },
  historyText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllText: {
    fontSize: 14,
    color: "green",
    fontWeight: "600",
    paddingLeft: 12,
  },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    height: 30,
    width: 350,
  },
  searchIcon1: {
    marginRight: 6,
  },

  searchInput1: {
    flex: 1,
    fontSize: 14,
    color: "#000",
    paddingVertical: 0,
  },

  calendarIcon: {
    marginRight: 10, // calendar close to "see all"
  },
  calendarWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendarGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  tableContainer: {
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    width: "49%",
    borderWidth : 1,
    borderColor : "#A9A9A9"
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },

  tableHeaderCell: {
    flex: 1,
    fontWeight: "bold",
    color: "#333",
    fontSize: 14,
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },

  tableCell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  printButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
  },

  printButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
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
});
