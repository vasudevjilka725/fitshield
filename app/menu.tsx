import React, { useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import TopBar from "../components/TopBar";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

type DishType = {
  id: number;
  name: string;
  category: string;
  price: string;
  veg: boolean;
  image: string;
};

export default function Menu() {
  const [search, setSearch] = useState("");
  const [selectedDish, setSelectedDish] = useState<string>("All");

  const dishCategories = [
    { name: "All", count: 20, type: "Dish" },
    { name: "Snacks", count: 8, type: "Dish" },
    { name: "Beverages", count: 5, type: "Dish" },
    { name: "Desserts", count: 6, type: "Dish" },
    { name: "South Indian", count: 4, type: "Dish" },
    { name: "Chinese", count: 7, type: "Dish" },
  ];

  const comboCategories = [
    { name: "Breakfast Combo", count: 3, type: "Combo" },
    { name: "Lunch Combo", count: 4, type: "Combo" },
    { name: "Evening Combo", count: 2, type: "Combo" },
    { name: "Dinner Combo", count: 5, type: "Combo" },
  ];

  const combinedCategories = [...dishCategories, ...comboCategories];

  const dummyDishes: Record<string, DishType[]> = {
    Desserts: [
      { id: 1, name: "Chocolate Cake", category: "Desserts", price: "₹120", veg: true, image: "/images/food_image.jpg" },
      { id: 2, name: "Ice Cream", category: "Desserts", price: "₹90", veg: true, image: "/images/food_image.jpg" },
    ],
    "South Indian": [
      { id: 3, name: "Masala Dosa", category: "South Indian", price: "₹70", veg: true, image: "/images/food_image.jpg" },
      { id: 4, name: "Idli Sambar", category: "South Indian", price: "₹50", veg: true, image: "/images/food_image.jpg" },
    ],
    Snacks: [
      { id: 5, name: "Samosa", category: "Snacks", price: "₹20", veg: true, image: "/images/food_image.jpg" },
      { id: 6, name: "Kachori", category: "Snacks", price: "₹25", veg: true, image: "/images/food_image.jpg" },
    ],
    Chinese: [
      { id: 7, name: "Manchurian", category: "Chinese", price: "₹110", veg: false, image: "/images/food_image.jpg" },
    ],
    Beverages: [
      { id: 8, name: "Cold Coffee", category: "Beverages", price: "₹60", veg: true, image: "/images/food_image.jpg" },
    ],
  };

  const selectedItems: DishType[] =
    selectedDish === "All"
      ? Object.values(dummyDishes).flat()
      : dummyDishes[selectedDish] || [];

  const renderCategoryItem = ({ item, index }: any) => {
    const isDish = item.type === "Dish";
    const selected = isDish ? selectedDish : "";
    const onSelect = isDish ? setSelectedDish : () => {};

    const showHeader =
      index === 0 || combinedCategories[index - 1].type !== item.type;

    return (
      <View key={item.name}>
        {showHeader && (
          <Text style={styles.sectionLabel}>
            {item.type === "Dish" ? "Dish Category" : "Combo Category"}
          </Text>
        )}
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

  const renderDishCard = ({ item }: { item: DishType }) => (
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
      <TouchableOpacity style={styles.cardEditBox}>
        <Text style={styles.cardEdit}>✏️ Edit Dish</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.screen}>
      <TopBar search={search} setSearch={setSearch} />

      <View style={styles.mainContent}>
        {/* Left Column */}
        <View style={styles.leftSection}>
          <View style={styles.liveMenuCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Live Menu</Text>
            </View>
            <ScrollView
              contentContainerStyle={styles.cardBody}
              showsVerticalScrollIndicator={true}
            >
              {combinedCategories.map((item, index) =>
                renderCategoryItem({ item, index })
              )}
            </ScrollView>
          </View>

          <View style={styles.addComboWrapper}>
            <TouchableOpacity style={styles.addComboBox}>
              <Text style={styles.addComboText}>+ Add Combo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Right Column */}
        <View style={styles.rightSection}>
          <FlatList
            data={selectedItems}
            renderItem={renderDishCard}
            keyExtractor={(item) => item.id.toString()}
            numColumns={SCREEN_WIDTH > 1200 ? 4 : 2}
            contentContainerStyle={styles.dishList}
          />
        </View>
      </View>
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
  liveMenuCard: {
    marginTop : 20,
    marginLeft : 20,
    height: SCREEN_HEIGHT * 0.5, // ✅ 50% height
    width: 380,
    backgroundColor: "#ffffff",
    borderColor: "#FFFBF5",
    borderWidth: 1,
    borderTopLeftRadius : 21,
    borderTopRightRadius : 21,
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
    borderTopLeftRadius : 20,
    borderTopRightRadius : 20,
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
  sectionLabel: {
    fontSize: 20,
    fontWeight: "400",
    marginTop: 10,
    marginBottom: 6,
    color: "#A9A9A9",
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
  addComboWrapper: {
    backgroundColor: "#fff",
    borderColor: "#FFFBF5",
    borderWidth: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
    marginTop: 40,
    paddingVertical: 15,
    alignItems: "center",
    paddingBottom : 100,
    marginLeft : 20,
    width : 380
  },
  addComboBox: {
    width: "90%",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#72BF78",
    borderRadius: 6,
    alignItems: "center",
    backgroundColor: "#fff", // ✅ NOT filled green
  },
  addComboText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#72BF78",
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
    width : 200,
    alignItems : "center"
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
    width : 200
  },
  cardEdit: {
    fontSize: 14,
    color: "#007BBD",
    fontWeight: "bold",
  },
});
