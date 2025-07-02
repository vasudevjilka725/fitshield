import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import TopBar from "../../components/TopBar";

const router = useRouter();

const goToUnverified = () => {
    router.push('/dashboard/edit-dish')
}

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

type DishType = {
  id: number;
  name: string;
  category: string;
  price: string;
  veg: boolean;
  image: string;
};

export default function Unverified() {
  const [search, setSearch] = useState("");
  const [selectedDish, setSelectedDish] = useState<string>("All");

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const dishCategories = [
    { name: "All", count: 20, type: "Dish" },
    { name: "Desserts", count: 6, type: "Dish" },
    { name: "Elevated", count: 8, type: "Dish" },
    { name: "Maa ka pyar", count: 5, type: "Dish" },
    { name: "Main Course", count: 4, type: "Dish" },
    { name: "Papa ka pyar", count: 7, type: "Dish" },
    { name: "Salad", count: 7, type: "Dish" },
    { name: "Shakes", count: 7, type: "Dish" },
    { name: "Sharbat", count: 7, type: "Dish" },
    { name: "Side dish", count: 7, type: "Dish" },
    { name: "Snacks", count: 7, type: "Dish" },
    { name: "starter", count: 7, type: "Dish" },
  ];

  const dummyDishes: Record<string, DishType[]> = {
    Desserts: [
      { id: 1, name: "Chocolate Cake", category: "Desserts", price: "₹120", veg: true, image: "/images/unverified_image.jpg" },
      { id: 2, name: "Ice Cream", category: "Desserts", price: "₹90", veg: true, image: "/images/unverified_image.jpg" },
    ],
    "South Indian": [
      { id: 3, name: "Masala Dosa", category: "South Indian", price: "₹70", veg: true, image: "/images/unverified_image.jpg" },
      { id: 4, name: "Idli Sambar", category: "South Indian", price: "₹50", veg: true, image: "/images/unverified_image.jpg" },
    ],
    Snacks: [
      { id: 5, name: "Samosa", category: "Snacks", price: "₹20", veg: true, image: "/images/unverified_image.jpg" },
      { id: 6, name: "Kachori", category: "Snacks", price: "₹25", veg: true, image: "/images/unverified_image.jpg" },
    ],
    Chinese: [
      { id: 7, name: "Manchurian", category: "Chinese", price: "₹110", veg: false, image: "/images/unverified_image.jpg" },
    ],
    Beverages: [
      { id: 8, name: "Cold Coffee", category: "Beverages", price: "₹60", veg: true, image: "/images/unverified_image.jpg" },
    ],
  };

  const selectedItems: DishType[] =
    selectedDish === "All"
      ? Object.values(dummyDishes).flat()
      : dummyDishes[selectedDish] || [];

  // Insert Add Dish card as first item
  const dataWithAddDish = [{ id: "add-dish" }, ...selectedItems];

  const renderCategoryItem = ({ item, index }: any) => {
    const selected = selectedDish;
    const onSelect = setSelectedDish;

    return (
      <View key={item.name}>
        <TouchableOpacity
          onPress={() => onSelect(item.name)}
          style={[
            styles.categoryItem,
            selected === item.name && styles.categoryItemSelected,
          ]}
        >
          <View style={styles.categoryContent}>
            <Text
              style={[
                styles.categoryText,
                selected === item.name && styles.categoryTextSelected,
              ]}
            >
              {item.name}
            </Text>
            <Text
              style={[
                styles.categoryCount,
                selected === item.name && styles.categoryTextSelected,
              ]}
            >
              {item.count}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderDishCard = ({ item }: { item: any }) => {
    if (item.id === "add-dish") {
      return (
        <TouchableOpacity
          style={styles.addDishCard}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addDishPlus}>+</Text>
          <Text style={styles.addDishText}>Add Dish</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.card}>
        <View style={styles.vegContainer}>
          <View
            style={[styles.vegBox, { borderColor: item.veg ? "green" : "red" }]}
          >
            <View
              style={[
                styles.vegCircle,
                { backgroundColor: item.veg ? "green" : "red" },
              ]}
            />
          </View>
        </View>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardCategory}>{item.category}</Text>
        <View style={styles.cardPriceBox}>
          <Text style={styles.cardPrice}>{item.price}</Text>
        </View>
        <TouchableOpacity style={styles.cardEditBox} onPress={() => goToUnverified()}>
          <Text style={styles.cardEdit}>✏️ Edit Dish</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <TopBar search={search} setSearch={setSearch} />

      <View style={styles.mainContent}>
        {/* Left Column */}
        <View style={styles.leftSection}>
          <View style={styles.unverifiedDishCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Unverified Dish</Text>
            </View>
            <ScrollView
              contentContainerStyle={styles.cardBody}
              showsVerticalScrollIndicator={true}
            >
              {dishCategories.map((item, index) =>
                renderCategoryItem({ item, index })
              )}
            </ScrollView>
          </View>
        </View>

        {/* Right Column */}
        <View style={styles.rightSection}>
          <FlatList
            data={dataWithAddDish}
            renderItem={renderDishCard}
            keyExtractor={(item, index) =>
              item.id === "add-dish" ? "add-dish" : item.id.toString()
            }
            numColumns={SCREEN_WIDTH > 1200 ? 4 : 2}
            contentContainerStyle={styles.dishList}
          />
        </View>
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalText}>Add Dish</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeIcon}
            >
              <Text style={{ fontSize: 18 }}>✖</Text>
            </TouchableOpacity>

            <TextInput
              label="Dish Name.."
              value={dishName}
              onChangeText={setDishName}
              mode="outlined"
              outlineColor="#72BF78"
              activeOutlineColor="#72BF78"
              style={styles.input}
            />
            <TextInput
              label="Description (Optional)"
              value={description}
              onChangeText={setDescription}
              mode="outlined"
              outlineColor="#72BF78"
              activeOutlineColor="#72BF78"
              style={styles.input}
            />
            <TextInput
              label="Price"
              value={price}
              onChangeText={setPrice}
              mode="outlined"
              outlineColor="#72BF78"
              activeOutlineColor="#72BF78"
              style={styles.input}
              keyboardType="numeric"
            />

            <Button
              mode="contained"
              onPress={() => {
                // handle add dish action
                setModalVisible(false);
              }}
              style={styles.addButton}
              labelStyle={{ color: "#fff" }}
              buttonColor="green"
            >
              Add
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingLeft: 32,
  },
  mainContent: {
    flexDirection: "row",
    paddingRight: 20,
    flex: 1,
  },
  leftSection: {
    width: 380,
    marginRight: 20,
  },
  rightSection: {
    flex: 1,
    paddingTop: 10,
  },
  unverifiedDishCard: {
    marginTop: 20,
    marginLeft: 20,
    height: SCREEN_HEIGHT - 100,
    width: 380,
    backgroundColor: "#ffffff",
    borderColor: "#FFFBF5",
    borderWidth: 1,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,
  },
  cardHeader: {
    backgroundColor: "#d3d3d3",
    padding: 12,
    paddingLeft: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardTitle: {
    fontSize: 30,
    fontWeight: "500",
    color: "#333",
  },
  cardBody: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  categoryItemSelected: {
    borderColor: "#72BF78",
  },
  categoryContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  categoryText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#333",
  },
  categoryCount: {
    fontSize: 16,
    fontWeight: "500",
    color: "#999",
  },
  categoryTextSelected: {
    color: "#72BF78",
    fontWeight: "bold",
  },
  dishList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    flexGrow: 1,
  },
  card: {
    width:
      SCREEN_WIDTH > 1200
        ? (SCREEN_WIDTH - 520) / 4 - 20
        : (SCREEN_WIDTH - 460) / 2 - 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addDishCard: {
    width:
      SCREEN_WIDTH > 1200
        ? (SCREEN_WIDTH - 520) / 4 - 20
        : (SCREEN_WIDTH - 460) / 2 - 15,
    height: 332, // adjust to match card height if needed
    backgroundColor: "#ffffff",
    borderWidth: 3,
    borderColor: "#ddd",
    borderStyle : "dashed",
    borderRadius: 10,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addDishPlus: {
    fontSize: 40,
    color: "#000",
    marginBottom: 5,
  },
  addDishText: {
    fontSize: 13,
    color: "#000",
    fontWeight: "bold",
  },
  vegContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  vegBox: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  vegCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  cardImage: {
    width: "100%",
    height: 150,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 6,
  },
  cardCategory: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginBottom: 6,
  },
  cardPriceBox: {
    backgroundColor: "green",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: "center",
    marginBottom: 6,
    width: 200,
    alignItems: "center",
  },
  cardPrice: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  cardEditBox: {
    backgroundColor: "#E0F0FF",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: "center",
    width: 200,
  },
  cardEdit: {
    fontSize: 14,
    color: "#007BBD",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalText : {
    fontSize : 30,
    fontWeight : "500",
    paddingBottom : 20
  },
  modalCard: {
    width: SCREEN_WIDTH > 600 ? 550 : SCREEN_WIDTH - 40,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    height : 400
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  input: {
    marginBottom: 18,
    backgroundColor: "#fff",
  },
  addButton: {
    marginTop: 10,
  },
});
