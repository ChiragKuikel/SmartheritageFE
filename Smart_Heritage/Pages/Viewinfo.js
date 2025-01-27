import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { Image } from "react-native";
import assets from "../assets/assets";
const BuildingInfo = ({ route }) => {
  const [fileData, setFileData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const { name } = route.params;
  const imageMap = {
    "Krishna Mandir": require("../assets/Krishnamandir.jpg"),
    "Bhimsen Temple": require("../assets/bhimsenmandir.jpg"),
    "Taleju Bhawani Temple": require("../assets/talejubhawanimandir.jpg"),
    KrishnaMandir: require("../assets/Krishnamandir.jpg"),
  };

  const readFile = async () => {
    const filename = "AreaInfo.json";
    const fileUri = FileSystem.documentDirectory + filename;

    try {
      // Read the JSON file from the file system
      const fileContents = await FileSystem.readAsStringAsync(fileUri);
      const jsonData = JSON.parse(fileContents);

      // Find data that matches the name
      const matchingData = jsonData.find(
        (item) => item.Name === name //yesko thau ma name huna paryo
      );

      if (matchingData) {
        setFilteredData(matchingData); // Set state for matching data
      } else {
        Alert.alert(
          "No Match",
          "No information available for the selected building."
        );
      }

      setFileData(jsonData); // Set the full data if needed
    } catch (error) {
      console.error("Error reading file:", error);
      Alert.alert(
        "Read Error",
        "Failed to read the file. Make sure it exists."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Building: {name}</Text>
      <Button title="View Info" onPress={readFile} />
      <ScrollView style={styles.dataContainer}>
        {filteredData ? (
          <View>
            <Image
              source={imageMap[name]} // 'Krishnamandir ko thau ma name rakhna paryo'
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.fileText}>
              <Text style={styles.bold}>Details:</Text> {filteredData.Details}
            </Text>
            <Text style={styles.fileText}>
              <Text style={styles.bold}>Built By:</Text> {filteredData.BuiltBy}
            </Text>
            <Text style={styles.fileText}>
              <Text style={styles.bold}>Built In:</Text> {filteredData.BuiltIn}
            </Text>
            <Text style={styles.fileText}>
              <Text style={styles.bold}>Deity:</Text> {filteredData.Deity}
            </Text>
          </View>
        ) : (
          <Text style={styles.fileText}>
            No data available. Click "View info" to load.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 24,
    color: "black",
    marginBottom: 10,
  },
  dataContainer: {
    marginTop: 20,
    width: "90%",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    maxHeight: 300,
  },
  fileText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default BuildingInfo;
