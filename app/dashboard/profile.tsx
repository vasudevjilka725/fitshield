import React, { useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import TopBar from "../../components/TopBar";

interface SavedCard {
  title: string;
  closed: boolean;
  date: string;
  fromTime: string;
  toTime: string;
}

const Profile = () => {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState("Restaurant Details");

  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(
    "/images/restaurant_image1.jpg"
  );
  const [restaurantName, setRestaurantName] = useState("");
  const [fssaiId, setFssaiId] = useState("");

  // Personal Details states
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");

  // Bank Details states
  const [bankName, setBankName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [sgst, setSgst] = useState("");
  const [cgst, setCgst] = useState("");
  const [includeGst, setIncludeGst] = useState(false);
  const [serviceChargeEnabled, setServiceChargeEnabled] = useState(false);
  const [serviceCharge, setServiceCharge] = useState("");

  // Time slots
  const [slots, setSlots] = useState([
    { day: "Sunday", start: "7:00 AM", end: "7:30 AM", closed: false },
  ]);
  const [modalVisible, setModalVisible] = useState<string | null>(null);

  const [closedDays, setClosedDays] = useState<{ [key: string]: boolean }>({});
  const [showSpecialInputs, setShowSpecialInputs] = useState(false);
  const [specialTitle, setSpecialTitle] = useState("");
  const [specialTitleFocused, setSpecialTitleFocused] = useState(false);
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [specialClosed, setSpecialClosed] = useState(false);
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const timeOptions: any = [];
  let hour = 7;
  let minute = 0;
  while (hour < 24) {
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    timeOptions.push(`${displayHour}:${minute === 0 ? "00" : "30"} ${ampm}`);
    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour++;
    }
    if (hour === 24) break;
    if (hour === 23 && minute > 30) break;
  }

  const fileInputRef = useRef<HTMLInputElement>(null);

  const menuItems = [
    "Restaurant Details",
    "Personal Details",
    "Bank Details",
    "Time",
    "Logout",
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <View style={styles.container}>
      <TopBar search={search} setSearch={setSearch} />

      <View style={styles.secondContainer}>
        <View style={styles.mainView}>
          {/* Left Side Menu */}
          <View style={styles.leftMenu}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.menuItem,
                  selectedItem === item && styles.menuItemSelected,
                ]}
                onPress={() => setSelectedItem(item)}
              >
                <Text
                  style={[
                    styles.menuItemText,
                    selectedItem === item && styles.menuItemTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}

            <View style={styles.profileCardContainer}>
              <Text style={styles.profileCardTitle}>Your Profile Progress</Text>
              <Text style={styles.profileCardSubtitle}>
                Complete your profile
              </Text>
              <View style={styles.progressBarBackground}>
                <View style={styles.progressBarFill} />
              </View>
            </View>
          </View>

          {/* Vertical Separator */}
          <View style={styles.separator} />

          {/* Right Side Content */}
          <View style={styles.rightContent}>
            {/* Restaurant Details */}
            {selectedItem === "Restaurant Details" && (
              <View style={styles.detailsContainer}>
                <View style={styles.rowBetween}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.sectionTitle}>Restaurant Details</Text>
                    <TouchableOpacity onPress={() => setEditMode(!editMode)}>
                      <Text style={styles.editIcon}>
                        {editMode ? "✖" : "✎"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.imageContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      if (editMode) fileInputRef.current?.click();
                    }}
                    style={{ position: "relative" }}
                  >
                    <img
                      src={profileImage}
                      alt="Profile"
                      style={{
                        width: 180,
                        height: 180,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: editMode
                          ? "4px solid #008000"
                          : "1px solid #ccc",
                        marginBottom: 20,
                      }}
                    />
                    {editMode && (
                      <View style={styles.plusOverlay}>
                        <Text style={styles.plusText}>+</Text>
                      </View>
                    )}
                  </TouchableOpacity>

                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </View>

                <View style={styles.inputsRow}>
                  <TextInput
                    style={[
                      styles.input,
                      !editMode && styles.inputDisabled,
                      editMode && styles.inputEnabled,
                    ]}
                    placeholder="Restaurant Name"
                    value={restaurantName}
                    onChangeText={setRestaurantName}
                    editable={editMode}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      !editMode && styles.inputDisabled,
                      editMode && styles.inputEnabled,
                    ]}
                    placeholder="FSSAI ID"
                    value={fssaiId}
                    onChangeText={setFssaiId}
                    editable={editMode}
                  />
                </View>

                <TouchableOpacity
                  style={[
                    styles.saveButton,
                    !editMode && styles.saveButtonDisabled,
                  ]}
                  disabled={!editMode}
                  onPress={() => setEditMode(false)}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Personal Details */}
            {selectedItem === "Personal Details" && (
              <View style={styles.detailsContainer}>
                <View style={styles.rowBetween}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.sectionTitle}>Personal Details</Text>
                    <TouchableOpacity onPress={() => setEditMode(!editMode)}>
                      <Text style={styles.editIcon}>
                        {editMode ? "✖" : "✎"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputsRow}>
                  <TextInput
                    style={[
                      styles.input,
                      !editMode && styles.inputDisabled,
                      editMode && styles.inputEnabled,
                    ]}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                    editable={editMode}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      !editMode && styles.inputDisabled,
                      editMode && styles.inputEnabled,
                    ]}
                    placeholder="Role"
                    value={role}
                    onChangeText={setRole}
                    editable={editMode}
                  />
                </View>

                <View style={styles.inputsRow}>
                  <TextInput
                    style={[
                      styles.input,
                      !editMode && styles.inputDisabled,
                      editMode && styles.inputEnabled,
                    ]}
                    placeholder="Contact No"
                    value={contactNo}
                    onChangeText={setContactNo}
                    editable={editMode}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      !editMode && styles.inputDisabled,
                      editMode && styles.inputEnabled,
                    ]}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    editable={editMode}
                  />
                </View>

                <TouchableOpacity
                  style={[
                    styles.saveButton,
                    !editMode && styles.saveButtonDisabled,
                  ]}
                  disabled={!editMode}
                  onPress={() => setEditMode(false)}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Bank Details */}
            {selectedItem === "Bank Details" && (
              <View style={styles.detailsContainer}>
                <View style={styles.rowBetween}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.sectionTitle}>Bank Details</Text>
                    <TouchableOpacity onPress={() => setEditMode(!editMode)}>
                      <Text style={styles.editIcon}>
                        {editMode ? "✖" : "✎"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.inputsRow}>
                  <TextInput
                    style={[
                      styles.input,
                      !editMode && styles.inputDisabled,
                      editMode && styles.inputEnabled,
                    ]}
                    placeholder="Bank Name"
                    value={bankName}
                    onChangeText={setBankName}
                    editable={editMode}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      !editMode && styles.inputDisabled,
                      editMode && styles.inputEnabled,
                    ]}
                    placeholder="UPI ID"
                    value={upiId}
                    onChangeText={setUpiId}
                    editable={editMode}
                  />
                </View>

                <Text style={styles.taxText}>Tax</Text>

                <View style={styles.inputsRow}>
                  <TextInput
                    style={[
                      styles.input,
                      !editMode && styles.inputDisabled,
                      editMode && styles.inputEnabled,
                    ]}
                    placeholder="SGST"
                    value={sgst}
                    onChangeText={setSgst}
                    editable={editMode}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      !editMode && styles.inputDisabled,
                      editMode && styles.inputEnabled,
                    ]}
                    placeholder="CGST"
                    value={cgst}
                    onChangeText={setCgst}
                    editable={editMode}
                  />
                </View>

                <View style={styles.checkboxRow}>
                  <input
                    type="checkbox"
                    checked={includeGst}
                    disabled={!editMode}
                    onChange={(e) => setIncludeGst(e.target.checked)}
                    style={{ width: 20, height: 20 }}
                  />
                  <Text style={styles.checkboxLabel}>
                    Include GST with menu price
                  </Text>
                </View>

                <View style={styles.toggleRow}>
                  <Text style={styles.serviceChargeText}>Service Charge</Text>
                  <Switch
                    value={serviceChargeEnabled}
                    onValueChange={setServiceChargeEnabled}
                    disabled={!editMode}
                    trackColor={{ false: "#ccc", true: "#008000" }}
                    thumbColor="#fff"
                  />
                </View>

                <TextInput
                  style={[
                    styles.input,
                    !editMode && styles.inputDisabled,
                    editMode && styles.inputEnabled,
                    { width: "30%", marginTop: 20 },
                  ]}
                  placeholder="Service Charge"
                  value={serviceCharge}
                  onChangeText={setServiceCharge}
                  editable={editMode}
                />

                <TouchableOpacity
                  style={[
                    styles.saveButton,
                    !editMode && styles.saveButtonDisabled,
                  ]}
                  disabled={!editMode}
                  onPress={() => setEditMode(false)}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Time slots section */}
            {selectedItem === "Time" && (
              <View style={styles.detailsContainer}>
                <View style={styles.rowBetween}>
                  <Text style={styles.sectionTitle}>Time</Text>

                  <View style={styles.timeButtonsContainer}>
                    <TouchableOpacity style={styles.addSlotButton}>
                      <Text style={styles.addSlotButtonText}>
                        + Add another slot
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setIsModalVisible(true)}
                      style={styles.goLiveButton}
                    >
                      <Text style={styles.goLiveButtonText}>Go Live ●</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <ScrollView style={{ maxHeight: 500, }}>
                  <View style={styles.timeSlotContainer}>
                    <Text style={styles.copyAllText}>Copy to all days</Text>

                    {[
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ].map((day) => (
                      <View key={day} style={styles.slotRow}>
                        <Text style={styles.dayText}>{day}</Text>

                        <select
                          style={{
                            width: 300,
                            height: 43,
                            fontSize: 16,
                            overflowY:
                              "auto" as React.CSSProperties["overflowY"],
                            borderRadius: 8,
                          }}
                          disabled={closedDays[day]}
                        >
                          {timeOptions.map((time: any) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>

                        <Text style={{ fontSize: 20, marginHorizontal: 10 }}>
                          to
                        </Text>

                        <select
                          style={{
                            width: 300,
                            height: 43,
                            fontSize: 16,
                            overflowY:
                              "auto" as React.CSSProperties["overflowY"],
                            borderRadius: 8,
                          }}
                          disabled={closedDays[day]}
                        >
                          {timeOptions.map((time: any) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>

                        <View style={styles.closeCheckboxContainer}>
                          <input
                            type="checkbox"
                            checked={closedDays[day] || false}
                            onChange={() => {
                              if (closedDays[day]) {
                                // If already checked, uncheck without modal
                                setClosedDays((prev) => ({
                                  ...prev,
                                  [day]: false,
                                }));
                              } else {
                                // If not checked, open modal
                                setModalVisible(day); // pass day to modal
                              }
                            }}
                            style={{
                              width: 20,
                              height: 20,
                              accentColor: "green",
                            }}
                          />
                          <Text style={{ fontSize: 20, marginLeft: 5 }}>
                            Close
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                  <View style={styles.specialDayContainer}>
                    <Text style={styles.specialDayText}>Special Day</Text>

                    <TouchableOpacity
                      style={styles.addSpecialDayButton}
                      onPress={() => setShowSpecialInputs(!showSpecialInputs)}
                    >
                      <Text style={styles.plusIcon}>+</Text>
                    </TouchableOpacity>
                  </View>
                  {showSpecialInputs && (
                    <View style={styles.specialInputsContainer}>
                      {/* First Row - Special Title Input */}
                      <View style={styles.inputRow}>
                        <TextInput
                          style={[
                            styles.specialTitleInput,
                            specialTitleFocused &&
                              styles.specialTitleInputActive,
                          ]}
                          placeholder="Special Title"
                          placeholderTextColor={
                            specialTitleFocused ? "#90EE90" : "#999"
                          }
                          value={specialTitle}
                          onChangeText={setSpecialTitle}
                          onFocus={() => setSpecialTitleFocused(true)}
                          onBlur={() => setSpecialTitleFocused(false)}
                        />
                      </View>

                      {/* Second Row */}
                      <View style={styles.secondRow}>
                        <TextInput
                          style={styles.dateInput}
                          placeholder="DD/MM/YYYY"
                          placeholderTextColor="#999"
                          value={date}
                          maxLength={10}
                          keyboardType="number-pad"
                          onChangeText={(text) => {
                            let formatted = text.replace(/[^0-9]/g, "");
                            if (formatted.length >= 3 && formatted[2] !== "/")
                              formatted =
                                formatted.slice(0, 2) +
                                "/" +
                                formatted.slice(2);
                            if (formatted.length >= 6 && formatted[5] !== "/")
                              formatted =
                                formatted.slice(0, 5) +
                                "/" +
                                formatted.slice(5);
                            setDate(formatted);
                          }}
                          onEndEditing={() => {
                            const [dd, mm, yyyy] = date.split("/").map(Number);
                            if (
                              !dd ||
                              !mm ||
                              !yyyy ||
                              dd < 1 ||
                              dd > 31 ||
                              mm < 1 ||
                              mm > 12 ||
                              yyyy < 1900 ||
                              yyyy > 2100
                            ) {
                              alert(
                                "Invalid date format. Please enter DD/MM/YYYY correctly."
                              );
                              setDate("");
                            }
                          }}
                        />

                        <View style={styles.timeSlotRow}>
                          <Text style={styles.timeSlotLabel}>From</Text>
                          <select
                            style={styles.timeDropdown}
                            value={fromTime}
                            onChange={(e) => setFromTime(e.target.value)}
                          >
                            <option value="">Select</option>
                            {timeOptions.map((time: any) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>

                          <Text style={styles.timeSlotLabel}>to</Text>

                          <select
                            style={styles.timeDropdown}
                            value={toTime}
                            onChange={(e) => setToTime(e.target.value)}
                          >
                            <option value="">Select</option>
                            {timeOptions.map((time: any) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>

                          <View style={styles.closeCheckboxContainer}>
                            <input
                              type="checkbox"
                              checked={specialClosed}
                              onChange={(e) =>
                                setSpecialClosed(e.target.checked)
                              }
                              style={{
                                width: 20,
                                height: 20,
                                accentColor: "green",
                              }}
                            />
                            <Text style={{ fontSize: 20, marginLeft: 5 }}>
                              Close
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* Third Row - Save Button */}
                      <TouchableOpacity
                        style={styles.saveButtonSpecial}
                        onPress={() => {
                          setSavedCards((prev) => [
                            ...prev,
                            {
                              title: specialTitle,
                              closed: specialClosed,
                              date,
                              fromTime,
                              toTime,
                            },
                          ]);
                          setSpecialTitle("");
                          setDate("");
                          setFromTime("");
                          setToTime("");
                          setSpecialClosed(false);
                          setShowSpecialInputs(false);
                        }}
                      >
                        <Text style={styles.saveButtonText}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {savedCards.map((card, index) => (
                    <View key={index} style={[styles.cardContainer]}>
                      <TouchableOpacity
                        style={styles.cardCloseIconContainer}
                        onPress={() =>
                          setSavedCards((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                      >
                        <Text style={styles.cardCloseIcon}>✖</Text>
                      </TouchableOpacity>

                      <View style={styles.cardRow}>
                        <Text style={styles.cardTitle}>{card.title}</Text>
                        {card.closed && (
                          <Text style={styles.closedText}>(Closed)</Text>
                        )}
                      </View>
                      <Text style={styles.cardDate}>{card.date}</Text>
                      <Text style={styles.cardTime}>
                        {card.closed
                          ? "Closed"
                          : `${card.fromTime} to ${card.toTime}`}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
            {modalVisible && (
              <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Are you sure?</Text>
                  <Text style={styles.modalSubtitle}>
                    Are you sure you want to close the restaurant on this day?
                  </Text>

                  <View style={styles.modalButtonRow}>
                    <TouchableOpacity
                      style={styles.modalCancelButton}
                      onPress={() => setModalVisible(null)}
                    >
                      <Text style={styles.modalCancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.modalYesButton}
                      onPress={() => {
                        // Set closed for example "Sunday" if required dynamically
                        // Here just closing modal for demo
                        // Implement your logic to set closedDays[day] = true based on your use case
                        setClosedDays((prev) => ({ ...prev, Sunday: true }));
                        setModalVisible(null);
                      }}
                    >
                      <Text style={styles.modalYesButtonText}>Yes</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            {isModalVisible && (
              <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                  <TouchableOpacity
                    style={styles.modalCloseIconContainer}
                    onPress={() => setIsModalVisible(false)}
                  >
                    <Text style={styles.modalCloseIcon}>×</Text>
                  </TouchableOpacity>
                  <View style={styles.greenTickContainer}>
                    <Text style={styles.greenTick}>✓</Text>
                  </View>
                  <Text style={styles.modalTitle}>Success</Text>
                  <Text style={styles.modalSubtitle}>
                    Restaurant details updated successfully
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingLeft: 30 },
  secondContainer: { backgroundColor: "#F2F2F2", marginTop: 20, flex: 1 },
  mainView: {
    flex: 1,
    flexDirection: "row",
    margin: 20,
    padding: 25,
    backgroundColor: "#fff",
    borderRadius: 7,
    position: "relative",
  },
  leftMenu: { width: "20%", paddingRight: 10 },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  menuItemSelected: { backgroundColor: "#90EE90" },
  menuItemText: { fontSize: 16, color: "#333" },
  menuItemTextSelected: { fontWeight: "bold", color: "#008000" },
  separator: {
    width: 1,
    backgroundColor: "#ccc",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "25%",
  },
  rightContent: { flex: 1, paddingLeft: 20, marginLeft: 53 },
  detailsContainer: {
    flex: 1,
    alignItems: "flex-start",
    overflowY: "scroll" as React.CSSProperties["overflowY"],
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "500",
    color: "#333",
    marginRight: 10,
  },
  editIcon: { fontSize: 30, color: "#008000", padding: 5, cursor: "pointer" },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    width: "100%",
    height: 50,
  },
  input: {
    flex: 0.45,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  inputEnabled: { borderColor: "#90EE90" },
  inputDisabled: { backgroundColor: "#eee" },
  saveButton: {
    backgroundColor: "#008000",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: "auto",
    alignSelf: "flex-end",
    width: 200,
    height: 50,
  },
  saveButtonDisabled: { backgroundColor: "#ccc" },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  taxText: { fontSize: 30, fontWeight: "500", marginTop: 10 },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  checkboxLabel: { marginLeft: 10, fontSize: 16 },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  serviceChargeText: { fontSize: 18, marginRight: 10 },
  imageContainer: {
    alignItems: "flex-start",
  },
  plusOverlay: {
    position: "absolute",
    bottom: 20,
    right: 25,
    backgroundColor: "#008000",
    width: 20,
    height: 20,
    borderRadius: 17.5,
    justifyContent: "center",
    alignItems: "center",
  },
  plusText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  timeButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  addSlotButton: {
    backgroundColor: "#fff",
    borderColor: "#008000",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginLeft: 600,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  addSlotButtonText: {
    color: "#008000",
    fontWeight: "500",
    fontSize: 20,
  },
  goLiveButton: {
    backgroundColor: "#008000",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    height: 50,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  goLiveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  slotRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 18,
  },
  slotDay: {
    width: 100,
    fontSize: 18,
    fontWeight: "500",
  },
  timeSlotContainer: {
    width: 970,
    backgroundColor: "#f9f9f9",
    padding: 30,
    borderRadius: 8,
    marginTop: 20,
    position: "relative",
    marginLeft: 22,
    marginRight: 22,
    height: 480,
  },

  copyAllText: {
    position: "absolute",
    top: 10,
    right: 20,
    fontSize: 20,
    color: "#008000",
    fontWeight: "500",
    cursor: "pointer",
  },

  dayText: {
    width: 120,
    fontSize: 20,
    fontWeight: "500",
    marginRight: 40,
  },

  closeCheckboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modalContainer: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 30,
    width: 450,
    height: 300,
    alignItems: "center",
    zIndex: 999,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
  },

  modalSubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 45,
    marginTop: 20,
    color: "#A9A9A9",
  },

  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  modalCancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 5,
    alignItems: "center",
  },

  modalCancelButtonText: {
    color: "lightgray",
    fontSize: 20,
  },

  modalYesButton: {
    flex: 1,
    backgroundColor: "green",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },

  modalYesButtonText: {
    color: "#fff",
    fontSize: 20,
  },
  specialDayContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 60,
    marginLeft: 22,
  },

  specialDayText: {
    fontSize: 25, // big text
    fontWeight: "500",
    color: "#333",
  },

  addSpecialDayButton: {
    width: 35,
    height: 35,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "green",
    backgroundColor: "#ccffcc", // light green background
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 13,
  },

  plusIcon: {
    fontSize: 30, // big plus sign
    color: "green",
    fontWeight: "bold",
  },
  specialInputsContainer: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: "95%",
  },

  inputRow: {
    marginBottom: 20,
  },

  specialTitleInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    width: "50%",
  },

  specialTitleInputActive: {
    borderColor: "#72BF78",
    color: "#72BF78",
  },

  secondRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    flexWrap: "wrap",
  },

  dateInput: {
    width: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginRight: 20,
  },

  timeSlotRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  timeSlotLabel: {
    fontSize: 16,
    marginHorizontal: 5,
  },

  timeDropdown: {
    width: 150,
    height: 40,
    fontSize: 16,
    borderRadius: 8,
    marginRight: 10,
  },

  saveButtonSpecial: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 6,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  cardContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginRight: 10,
  },

  cardDate: {
    fontSize: 16,
    color: "#555",
  },

  cardTime: {
    fontSize: 16,
    color: "#555",
  },
  closedText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardCloseIconContainer: {
    position: "absolute",
    top: 5,
    right: 20,
    padding: 5,
    zIndex: 1,
  },
  cardCloseIcon: {
    fontSize: 18,
    color: "#f00",
    fontWeight: "bold",
  },
  greenTickContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  greenTick: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  modalCloseIconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 1,
  },

  modalCloseIcon: {
    fontSize: 24,
    color: "gray",
    fontWeight: "bold",
  },
  profileCardContainer: {
  backgroundColor: "#fff",
  borderRadius: 8,
  padding: 15,
  marginTop: 100,
  marginBottom: 20,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 2,
  height : 150
},

profileCardTitle: {
  fontSize: 20,
  fontWeight: "500",
  marginBottom: 15,
  color: "#333",
},

profileCardSubtitle: {
  fontSize: 17,
  color: "#777",
  marginBottom: 15,
},

progressBarBackground: {
  width: "100%",
  height: 10,
  backgroundColor: "#eee",
  borderRadius: 5,
  overflow: "hidden",
},

progressBarFill: {
  width: "90%",
  height: "100%",
  backgroundColor: "green",
},

});
