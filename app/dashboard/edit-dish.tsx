import { loadFromLocalStorage, saveToLocalStorage } from "@/utils/storage";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import TopBar from "../../components/TopBar";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type Ingredient = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  description: string;
};

export default function EditDishPage() {
  const [search, setSearch] = useState("");
  const [selectedDish, setSelectedDish] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showInstructionModal, setShowInstructionModal] = useState(false);
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});
  const [showClaimsModal, setShowClaimsModal] = useState(false);
  const [showSaveSuccessModal, setShowSaveSuccessModal] = useState(false);
  const [showAddIngredientModal, setShowAddIngredientModal] = useState(false);
  const [ingredientName, setIngredientName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("g");
  const [description, setDescription] = useState("");
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isQuantityFocused, setIsQuantityFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  const [ingredientsTable, setIngredientsTable] = useState<Ingredient[]>([]);

  useEffect(() => {
    const storedTable = loadFromLocalStorage("ingredientsTable");
    if (storedTable) {
      setIngredientsTable(storedTable);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage("ingredientsTable", ingredientsTable);
  }, [ingredientsTable]);

  const dishNames = [
    "Aloo Matar Paneer",
    "Chickoo Pyazaa",
    "Chocolate Waffles",
    "Masala Dosa",
    "Butter Chicken",
    "Paneer Butter Masala",
    "Veg Biryani",
    "Chicken Biryani",
    "Dal Tadka",
    "Palak Paneer",
    "Kadhai Mushroom",
    "Chilli Paneer",
    "Veg Manchurian",
    "Hakka Noodles",
    "Schezwan Rice",
    "Chicken Curry",
    "Mutton Rogan Josh",
    "Fish Fry",
    "Ice Cream Sundae",
    "Gulab Jamun",
  ];

  const nutrientsMenu = [
    "Water Soluble Vitamin",
    "Fat Soluble Vitamin",
    "Minerals",
    "Fatty Acid Profile",
    "Cholestrol",
    "Suger",
    "Other",
  ];

  const alooMatarPaneerSteps = [
    "Heat oil in a pan and add cumin seeds to splutter.",
    "Add finely chopped onions and sauté until golden brown.",
    "Add ginger-garlic paste and sauté for a minute.",
    "Add chopped tomatoes and cook until soft and mushy.",
    "Add turmeric, red chili powder, coriander powder, and salt. Mix well.",
    "Add diced potatoes and green peas. Stir and cook for 2-3 minutes.",
    "Add water as needed, cover the pan, and cook until potatoes are soft.",
    "Add paneer cubes and gently mix. Cook for 2-3 minutes.",
    "Garnish with fresh coriander leaves and serve hot with roti or rice.",
  ];

  const toggleExpand = (item: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const renderNutrientItem = ({ item }: { item: string }) => (
    <View style={styles.nutrientBox}>
      <TouchableOpacity
        style={styles.nutrientItem}
        onPress={() => toggleExpand(item)}
      >
        <Text style={styles.nutrientItemText}>{item}</Text>
        <Text style={styles.arrowIcon}>{expandedItems[item] ? "▲" : "▼"}</Text>
      </TouchableOpacity>
      {expandedItems[item] && (
        <View style={styles.nutrientDetail}>
          <Text style={styles.nutrientDetailText}>
            Details about {item} go here...
          </Text>
        </View>
      )}
    </View>
  );

  const renderDishItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.dishButton}
      onPress={() => setSelectedDish(item)}
    >
      <Text style={styles.dishButtonText}>{item}</Text>
    </TouchableOpacity>
  );

  /** Card 1 **/
  const renderLeftSideCard = () => (
    <View style={styles.leftCardContainer}>
      <View style={styles.leftCardHeader}>
        <View style={styles.leftCardEmptyBox} />
        <TouchableOpacity>
          <Text style={styles.leftCardEditIcon}>✎</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.leftCardContentRow}>
        <Image
          source={{ uri: "/images/hour_image.png" }}
          style={styles.leftCardImage}
        />
        <View style={styles.leftCardDetails}>
          <View style={styles.leftCardDetailRow}>
            <Text style={styles.leftCardKey}>Dish:</Text>
            <Text style={styles.leftCardValue}>{selectedDish}</Text>
          </View>
          <View style={styles.leftCardDetailRow}>
            <Text style={styles.leftCardKey}>Category:</Text>
            <Text style={styles.leftCardValue}>Main Course</Text>
          </View>
          <View style={styles.leftCardDetailRow}>
            <Text style={styles.leftCardKey}>Qty:</Text>
            <Text style={styles.leftCardValue}>100</Text>
          </View>
        </View>
      </View>

      <View style={styles.leftCardPriceBox}>
        <Text style={styles.leftCardPriceText}>₹ 150</Text>
      </View>
    </View>
  );

  /** Card 2 (Pie chart) **/
  const renderMacroNutrientsCard = () => {
    const data = [
      { percentage: 9.1, color: "#4CAF50", label: "9.1% proteins (15.0g)" },
      { percentage: 30, color: "#2196F3", label: "30% carbs (35.1g)" },
      { percentage: 59.22, color: "#FFC107", label: "59.22% fat (133.1g)" },
      { percentage: 1.6, color: "#FF5722", label: "1.6% fibres (4.8g)" },
    ];

    const radius = 50;
    const strokeWidth = 10;
    const center = radius;
    const circleCircumference = 2 * Math.PI * radius;

    let cumulativePercent = 0;

    return (
      <View style={styles.rightCardContainer}>
        <View style={styles.macroCardContentRow}>
          <View style={styles.macroCardDetails}>
            <Text style={styles.macroCardTitle}>Macro Nutrients</Text>
            {data.map((item, index) => (
              <Text
                key={index}
                style={[styles.macroCardText, { color: item.color }]}
              >
                {item.label}
              </Text>
            ))}
          </View>

          <View style={styles.pieChartContainer}>
            <Svg width={radius * 2} height={radius * 2}>
              <G rotation={-90} originX={center} originY={center}>
                {data.map((item, index) => {
                  const { percentage, color } = item;
                  const strokeDasharray = `${
                    (percentage / 100) * circleCircumference
                  } ${circleCircumference}`;
                  const rotation = cumulativePercent * 360;

                  cumulativePercent += percentage / 100;

                  return (
                    <Circle
                      key={index}
                      cx={center}
                      cy={center}
                      r={radius}
                      stroke={color}
                      fill="transparent"
                      strokeWidth={strokeWidth}
                      strokeDasharray={strokeDasharray}
                      rotation={rotation}
                      originX={center}
                      originY={center}
                      strokeLinecap="round"
                    />
                  );
                })}
              </G>
            </Svg>
            <View style={styles.pieChartCenterOverlay}>
              <Text style={styles.pieChartCenterText}>899 kcal</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  /** Card 3 (Claims as per FSSAI) **/
  const renderClaimsCard = () => (
    <View style={styles.claimsCardContainer}>
      <Text style={styles.claimsCardTitle}>Claims as per FSSAI</Text>

      <View style={styles.claimButtonsRow}>
        <TouchableOpacity
          style={[styles.claimButton, styles.lightBlueButton]}
          onPress={() => setShowClaimsModal(true)}
        >
          <Text style={styles.lightBlueButtonText}>Saturated Fat Free</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.claimButton, styles.lightRedButton]}
          onPress={() => setShowClaimsModal(true)}
        >
          <Text style={styles.lightRedButtonText}>Gluten Free</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.claimButton, styles.lightGoldenButton]}
        onPress={() => setShowClaimsModal(true)}
      >
        <Text style={styles.lightGoldenButtonText}>Low in Sugars</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAllergiesCard = () => (
    <View style={styles.allergiesCardContainer}>
      <Text style={styles.allergiesCardText}>No Allergies Detected</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TopBar search={search} setSearch={setSearch} />

      <View style={styles.dishListContainer}>
        <FlatList
          data={dishNames}
          renderItem={renderDishItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <ScrollView style={styles.detailContainer}>
        {selectedDish && (
          <View style={styles.detailContent}>
            <View style={styles.headerRow}>
              <Text style={styles.dishTitle}>{selectedDish}</Text>
              <TouchableOpacity style={styles.verifyButton}>
                <View style={styles.whiteDot} />
                <Text style={styles.verifyButtonText}>
                  {" "}
                  Send for Verification
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.bigButton}
                onPress={() => setShowModal(true)}
              >
                <Text style={styles.bigButtonText}>
                  Details Nutrients Breakdown
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.bigButton}
                onPress={() => setShowDescriptionModal(true)}
              >
                <Text style={styles.bigButtonText}>Description</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.bigButton}
                onPress={() => setShowInstructionModal(true)}
              >
                <Text style={styles.bigButtonText}>Instructions</Text>
              </TouchableOpacity>
            </View>

            {/* ✅ Cards Row */}
            <View style={styles.cardsRow}>
              {renderLeftSideCard()}
              {renderMacroNutrientsCard()}
              {renderClaimsCard()}
            </View>

            {renderAllergiesCard()}

            <View style={styles.bottomRow}>
              <Text style={styles.bottomLeftText}>Custom Recipe</Text>
              <TouchableOpacity
                style={styles.saveChangesButton}
                onPress={() => {
                  const newIngredient = {
                    id: Date.now(),
                    name: ingredientName,
                    quantity: parseInt(quantity),
                    unit: unit,
                    description: description,
                  };
                  setIngredientsTable((prev) => [...prev, newIngredient]);
                  setShowAddIngredientModal(false);
                  setIngredientName("");
                  setQuantity("");
                  setDescription("");
                }}
              >
                <Text style={styles.saveChangesButtonText}>Save changes</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.ingredientsRow}>
              <Text style={styles.ingredientsLeftText}>Ingredients</Text>
              <View style={styles.ingredientsRightContainer}>
                <TouchableOpacity
                  onPress={() => setShowAddIngredientModal(true)}
                >
                  <Text style={styles.addIngredientsText}>
                    + Add ingredients
                  </Text>
                </TouchableOpacity>
                <Text style={styles.cookingStyleText}>Cooking style</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              {/* Table container */}
              <View style={{ flex: 4 }}>
                <View style={styles.tableContainer}>
                  {/* Table Header */}
                  <View style={styles.tableRow}>
                    <Text style={styles.tableHeaderCell}>Ingredient Name</Text>
                    <Text style={styles.tableHeaderCell}>Quantity</Text>
                    <Text style={styles.tableHeaderCell}>Description</Text>
                  </View>

                  {/* Table Data */}
                  {ingredientsTable.map((item) => (
                    <View key={item.id} style={styles.tableRow}>
                      {/* Ingredient Name with delete */}
                      <View style={styles.tableCell}>
                        <Text style={styles.tableCellText}>{item.name}</Text>
                        <TouchableOpacity
                          onPress={() =>
                            setIngredientsTable(
                              ingredientsTable.filter((i) => i.id !== item.id)
                            )
                          }
                        >
                          <Text style={styles.deleteIcon}>×</Text>
                        </TouchableOpacity>
                      </View>

                      {/* Quantity */}
                      <View style={styles.tableCellQuantity}>
                        <View style={styles.quantityBox}>
                          <Text style={styles.tableCellText}>
                            {item.quantity}
                          </Text>
                          <Text style={{ marginLeft: 2 }}>{item.unit}</Text>
                        </View>
                        <View style={styles.quantityButtons}>
                          <TouchableOpacity
                            onPress={() =>
                              setIngredientsTable(
                                ingredientsTable.map((i) =>
                                  i.id === item.id
                                    ? { ...i, quantity: i.quantity + 1 }
                                    : i
                                )
                              )
                            }
                          >
                            <Text style={styles.plusMinusButton}>+</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              setIngredientsTable(
                                ingredientsTable.map((i) =>
                                  i.id === item.id
                                    ? {
                                        ...i,
                                        quantity: Math.max(0, i.quantity - 1),
                                      }
                                    : i
                                )
                              )
                            }
                          >
                            <Text style={styles.plusMinusButton}>-</Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      {/* Description */}
                      <View style={styles.tableCell}>
                        <TextInput
                          style={styles.descriptionInput}
                          value={item.description}
                          onChangeText={(text) =>
                            setIngredientsTable(
                              ingredientsTable.map((i) =>
                                i.id === item.id
                                  ? { ...i, description: text }
                                  : i
                              )
                            )
                          }
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              {/* Empty Card */}
              <View style={styles.emptyCard}>
                <Text style={{ textAlign: "center", color: "#aaa" }}>
                  
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* ✅ Existing modals remain as is */}

      <Modal
        visible={showSaveSuccessModal}
        transparent
        onRequestClose={() => setShowSaveSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModalContainer}>
            <TouchableOpacity
              style={styles.successModalCloseIconContainer}
              onPress={() => setShowSaveSuccessModal(false)}
            >
              <Text style={styles.successModalCloseIcon}>✕</Text>
            </TouchableOpacity>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
              }}
              style={styles.successIcon}
            />
            <Text style={styles.successTitle}>Success</Text>
            <Text style={styles.successMessage}>Dish updated successfully</Text>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showModal}
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Details Nutrients Breakdown</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={nutrientsMenu}
              renderItem={renderNutrientItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={true}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={showDescriptionModal}
        transparent
        onRequestClose={() => setShowDescriptionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Description</Text>
              <TouchableOpacity onPress={() => setShowDescriptionModal(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              <Text style={styles.descriptionText}>
                This is the detailed description for the selected dish. You can
                write a full paragraph here explaining the dish, its
                ingredients, preparation method, history, and any other relevant
                information to display for this menu item to your users clearly
                and beautifully.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showInstructionModal}
        transparent
        onRequestClose={() => setShowInstructionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Instructions</Text>
              <TouchableOpacity onPress={() => setShowInstructionModal(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {alooMatarPaneerSteps.map((step, index) => (
                <Text key={index} style={styles.stepText}>
                  <Text style={{ fontSize: 22, fontWeight: "500" }}>
                    Step {index + 1}:-
                  </Text>{" "}
                  {step}
                </Text>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showClaimsModal}
        transparent
        onRequestClose={() => setShowClaimsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Claims as per FSSAI</Text>
              <TouchableOpacity onPress={() => setShowClaimsModal(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.claimsContentContainer}>
              {/* Left and Right parts container */}
              <View style={styles.claimsInnerContainer}>
                {/* Left Part */}
                <View style={styles.claimsLeftPart}>
                  <Text style={[styles.claimsText, { color: "#00BFFF" }]}>
                    Saturated Fats Free
                  </Text>
                  <Text style={[styles.claimsText, { color: "#FF6347" }]}>
                    Gluten Free
                  </Text>
                  <Text style={[styles.claimsText, { color: "#FFD700" }]}>
                    Low In Sugars
                  </Text>
                </View>

                {/* Divider */}
                <View style={styles.verticalDivider} />

                {/* Right Part */}
                <View style={styles.claimsRightPart}>
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/337/337946.png",
                    }}
                    style={styles.pdfIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.downloadText}>
                    Download your certificate
                  </Text>
                  <TouchableOpacity style={styles.downloadButton}>
                    <Text style={styles.downloadButtonText}>⬇ Download</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showAddIngredientModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAddIngredientModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.addIngredientModalContainer}>
            {/* Close Icon */}
            <TouchableOpacity
              style={styles.closeIcon1}
              onPress={() => setShowAddIngredientModal(false)}
            >
              <Text style={{ fontSize: 30, color: "#333", fontWeight: "500" }}>
                ×
              </Text>
            </TouchableOpacity>

            <ScrollView keyboardShouldPersistTaps="handled">
              {/* First View */}
              <View style={{ marginBottom: 40, marginTop: 20 }}>
                <Text style={styles.modalLabel}>Ingredient Name</Text>
                <View
                  style={[
                    styles.inputContainer,
                    isNameFocused && styles.inputContainerFocused,
                  ]}
                >
                  {(isNameFocused || ingredientName) && (
                    <Text style={styles.floatingLabel}>Ingredient Name</Text>
                  )}
                  <TextInput
                    style={styles.textInput}
                    placeholder={
                      !isNameFocused && !ingredientName
                        ? "Ingredient Name.."
                        : ingredientName
                    }
                    placeholderTextColor="#999"
                    value={ingredientName}
                    onChangeText={setIngredientName}
                    onFocus={() => setIsNameFocused(true)}
                    onBlur={() => setIsNameFocused(false)}
                  />
                </View>
              </View>

              {/* Second View */}
              <View style={{ marginBottom: 40 }}>
                <Text style={styles.modalLabel}>Quantity</Text>
                <View style={styles.quantityRow}>
                  <View
                    style={[
                      styles.inputContainer,
                      isQuantityFocused && styles.inputContainerFocused,
                      { flex: 1, marginRight: 10 },
                    ]}
                  >
                    {(isQuantityFocused || quantity) && (
                      <Text style={styles.floatingLabel}>Quantity</Text>
                    )}
                    <TextInput
                      style={styles.textInput}
                      placeholder={isQuantityFocused ? "" : "Quantity"}
                      placeholderTextColor="#999"
                      keyboardType="numeric"
                      value={quantity}
                      onChangeText={setQuantity}
                      onFocus={() => setIsQuantityFocused(true)}
                      onBlur={() => setIsQuantityFocused(false)}
                      underlineColorAndroid="transparent"
                    />
                  </View>

                  {/* Dropdown */}
                  <View style={{ flex: 1 }}>
                    <TouchableOpacity
                      style={[
                        styles.dropdownBox,
                        showUnitDropdown && styles.inputContainerFocused,
                      ]}
                      onPress={() => setShowUnitDropdown(!showUnitDropdown)}
                    >
                      <Text style={styles.dropdownText}>{unit}</Text>
                      <Text style={styles.dropdownArrow}>▼</Text>
                    </TouchableOpacity>

                    {showUnitDropdown && (
                      <View style={styles.dropdownList}>
                        {unit !== "g" && (
                          <TouchableOpacity
                            style={styles.dropdownOption}
                            onPress={() => {
                              setUnit("g");
                              setShowUnitDropdown(false);
                            }}
                          >
                            <Text style={styles.dropdownOptionText}>g</Text>
                          </TouchableOpacity>
                        )}
                        {unit !== "ml" && (
                          <TouchableOpacity
                            style={styles.dropdownOption}
                            onPress={() => {
                              setUnit("ml");
                              setShowUnitDropdown(false);
                            }}
                          >
                            <Text style={styles.dropdownOptionText}>ml</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {/* Third View */}
              <View style={{ marginBottom: 40 }}>
                <Text style={styles.modalLabel}>Description</Text>
                <View
                  style={[
                    styles.inputContainer,
                    isDescriptionFocused && styles.inputContainerFocused,
                  ]}
                >
                  {(isDescriptionFocused || description) && (
                    <Text style={styles.floatingLabel}>Description</Text>
                  )}
                  <TextInput
                    style={styles.textInput}
                    placeholder={isDescriptionFocused ? "" : "Description.."}
                    placeholderTextColor="#999"
                    value={description}
                    onChangeText={setDescription}
                    onFocus={() => setIsDescriptionFocused(true)}
                    onBlur={() => setIsDescriptionFocused(false)}
                    underlineColorAndroid="transparent"
                  />
                </View>
              </View>

              {/* Save Button */}
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  ingredientName && quantity
                    ? styles.saveButtonEnabled
                    : styles.saveButtonDisabled,
                ]}
                disabled={!(ingredientName && quantity)}
                onPress={() => {
                  if (ingredientName && quantity) {
                    const newIngredient: Ingredient = {
                      id: Date.now(),
                      name: ingredientName,
                      quantity: parseInt(quantity),
                      unit: unit,
                      description: description,
                    };

                    setIngredientsTable((prev) => [...prev, newIngredient]);

                    // Clear fields and close modal
                    setIngredientName("");
                    setQuantity("");
                    setDescription("");
                    setShowAddIngredientModal(false);
                  }
                }}
              >
                <Text
                  style={
                    ingredientName && quantity
                      ? styles.saveButtonTextEnabled
                      : styles.saveButtonTextDisabled
                  }
                >
                  Save
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingLeft: 32,
  },

  dishListContainer: {
    backgroundColor: "#f0f0f0",
    marginTop: 20,
    paddingVertical: 10,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: "#A9A9A9",
  },

  dishButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },

  dishButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },

  detailContainer: { flex: 1, marginTop: 10, marginRight: 20 },

  detailContent: { backgroundColor: "#fff", padding: 20 },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  dishTitle: { fontSize: 28, fontWeight: "bold", color: "#333", flexShrink: 1 },

  verifyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  verifyButtonText: { color: "#fff", fontSize: 16, fontWeight: "500" },

  whiteDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginRight: 6,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10,
  },

  bigButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    width: (SCREEN_WIDTH - 200) / 3,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  bigButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: SCREEN_WIDTH * 0.4,
    maxHeight: SCREEN_HEIGHT * 0.6,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },

  modalTitle: { fontSize: 20, fontWeight: "bold" },

  closeIcon: { fontSize: 20, color: "#333", fontWeight: "500" },

  nutrientBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  nutrientItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },

  nutrientItemText: { fontSize: 22, color: "#333" },

  arrowIcon: { fontSize: 14, color: "#888" },

  nutrientDetail: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },

  nutrientDetailText: { fontSize: 14, color: "#666" },

  descriptionText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    marginBottom: 90,
  },

  stepText: { fontSize: 20, color: "#333", marginBottom: 17 },

  /** Cards Row **/
  cardsRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 20,
  },

  /** Card 1 specific **/
  leftCardContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    width: 450,
    marginRight: 15,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#A9A9A9",
  },

  leftCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  leftCardEmptyBox: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },

  leftCardEditIcon: { fontSize: 30, color: "#333" },

  leftCardContentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  leftCardImage: {
    width: 100,
    height: 90,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "#eee",
  },

  leftCardDetails: { flex: 1 },

  leftCardDetailRow: { flexDirection: "row", marginBottom: 4 },

  leftCardKey: { fontSize: 20, color: "#333", marginRight: 4 },

  leftCardValue: { fontSize: 20, fontWeight: "bold", color: "#333" },

  leftCardPriceBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: "center",
  },

  leftCardPriceText: { fontSize: 16, fontWeight: "bold", color: "#333" },

  /** Card 2 specific **/
  rightCardContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    width: 450,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#A9A9A9",
    height: 210,
  },

  macroCardContentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  macroCardDetails: { flex: 1 },

  macroCardTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },

  macroCardText: { fontSize: 20, marginBottom: 4 },

  pieChartContainer: {
    position: "relative",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 90,
  },

  pieChartCenterOverlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },

  pieChartCenterText: { fontSize: 20, fontWeight: "bold", color: "#333" },
  claimsCardContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    width: 442,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#A9A9A9",
    height: 210,
  },

  claimsCardTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },

  claimButtonsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 10,
  },

  claimButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  lightBlueButton: {
    borderWidth: 1,
    borderColor: "#00BFFF",
    backgroundColor: "rgba(0,191,255,0.1)",
  },

  lightBlueButtonText: {
    color: "#00BFFF",
    fontSize: 18,
    fontWeight: "500",
  },

  lightRedButton: {
    borderWidth: 1,
    borderColor: "#FF6347",
    backgroundColor: "rgba(255,99,71,0.1)",
  },

  lightRedButtonText: {
    color: "#FF6347",
    fontSize: 18,
    fontWeight: "500",
  },

  lightGoldenButton: {
    borderWidth: 1,
    borderColor: "#FFD700",
    backgroundColor: "rgba(255,215,0,0.1)",
    width: 200,
  },

  lightGoldenButtonText: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "500",
  },
  claimsContentContainer: {
    marginTop: 20,
  },

  claimsInnerContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    height: 250,
  },

  claimsLeftPart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 20,
  },

  claimsRightPart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  claimsText: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 4,
    textAlign: "center",
  },

  verticalDivider: {
    width: 1,
    backgroundColor: "#ccc",
  },

  pdfIcon: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },

  downloadText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },

  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "green",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    width: 200,
    justifyContent: "center",
  },

  downloadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },

  allergiesCardContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 20,
    width: SCREEN_WIDTH - 170, // full screen width minus padding
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#A9A9A9",
    height: 100,
    justifyContent: "center",
  },
  allergiesCardText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: "#333",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
  },
  bottomLeftText: {
    fontSize: 30,
    fontWeight: "500",
    color: "#333",
  },
  saveChangesButton: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  saveChangesButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },

  successModalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    width: 500,
    height: 300,
  },
  successIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
  },
  successModalCloseIconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  successModalCloseIcon: {
    fontSize: 24,
    color: "#333",
    fontWeight: "500",
  },
  ingredientsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
  },

  ingredientsLeftText: {
    fontSize: 30,
    fontWeight: "500",
    color: "#333",
  },

  ingredientsRightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  addIngredientsText: {
    fontSize: 25,
    color: "green",
    marginRight: 20,
    fontWeight: "500",
  },

  cookingStyleText: {
    fontSize: 30,
    color: "#333",
    fontWeight: "500",
    marginRight: 120,
  },
  addIngredientModalContainer: {
    width: 550,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 35,
    position: "relative",
    height: 450,
  },

  closeIcon1: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },

  modalLabel: {
    fontSize: 25,
    fontWeight: "500",
    color: "#333",
    marginBottom: 10,
  },

  inputContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },

  inputContainerFocused: {
    borderColor: "#90EE90",
  },

  textInput: {
    height: 40,
    fontSize: 16,
    color: "#333",
    width: "100%",
    backgroundColor: "#fff",
    textAlignVertical: "center",
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  dropdownBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: "#fff",
  },

  dropdownArrow: {
    fontSize: 12,
    color: "#333",
  },

  dropdownList: {
    position: "absolute",
    top: 42,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    zIndex: 10,
  },

  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  dropdownOptionText: {
    fontSize: 16,
    color: "#333",
  },

  saveButton: {
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },

  saveButtonEnabled: {
    backgroundColor: "green",
  },

  saveButtonDisabled: {
    backgroundColor: "#ccc",
  },

  saveButtonTextEnabled: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },

  saveButtonTextDisabled: {
    color: "#666",
    fontSize: 18,
    fontWeight: "500",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  floatingLabel: {
    position: "absolute",
    top: -8,
    left: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 4,
    fontSize: 12,
    color: "#90EE90",
    zIndex: 5,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 10,
    width: 1000,
    marginLeft: 25,
    borderRadius: 10,
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },

  tableHeaderCell: {
    flex: 1,
    padding: 10,
    fontWeight: "500",
    borderRightWidth: 1,
    borderColor: "#ccc",
    fontSize: 20,
    textAlign: "center",
  },

  tableCell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },

  deleteIcon: {
    fontSize: 25,
    color: "red",
    marginLeft: 5,
  },

  tableCellQuantity: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },

  quantityBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 4,
  },

  quantityButtons: {
    flexDirection: "row",
    marginLeft: 10,
  },

  plusMinusButton: {
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 20,
    alignItems: "center",
    marginHorizontal: 2,
    justifyContent: "center",
  },

  descriptionInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 4,
    width: "100%",
  },
  tableCellText: {
    fontSize: 20,
    color: "#333",
    textAlign: "center",
  },
  emptyCard: {
  flex: 1,
  marginLeft: 20,
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  padding: 20,
  justifyContent: "center",
  backgroundColor: "#f9f9f9",
  marginTop : 10,
  height : 250
},

});
