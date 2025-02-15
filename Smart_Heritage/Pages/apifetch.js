/*import { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

const DownloadData = () => {
  const [returned, setReturned] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch("http://192.168.18.45:5028/api/controller", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log("Fetched Data:", json); // Debug
      if (Array.isArray(json)) {
        setReturned(json);
      } else {
        console.error("API response is not an array.");
        setError("Unexpected response format.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("Failed to fetch data.");
    }
  };

  return (
    <View>
      {error ? (
        <Text style={styles.txt}>{error}</Text>
      ) : returned.length > 0 ? (
        <FlatList
          data={returned}
          keyExtractor={(item) => item.areaID?.toString() || Math.random().toString()} // Ensure a unique key
          renderItem={({ item }) => (
            <View style={styles.bleCard}>
              <Text style={styles.txt}>Area ID: {item.areaID}</Text>
              <Text style={styles.txt}>Name: {item.name}</Text>
              <Text style={styles.txt}>Description: {item.description}</Text>
              <Text style={styles.txt}>Location: {item.location}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.txt}>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  txt: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
  bleCard: {
    width: "90%",
    padding: 10,
    alignSelf: "center",
    marginVertical: 10, // Fixed typo
    backgroundColor: "grey",
    elevation: 5,
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
});

export default DownloadData; */
import React from "react";
import {
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
  Alert,
  Text,
} from "react-native";
import * as FileSystem from "expo-file-system";

export default function DownloadData({ route }) {
  const placeName = route.params;
  console.log(placeName);
  const downloadFromUrl = async () => {
    const filename = "AreaInfo.json";
    const fileUri = FileSystem.documentDirectory + filename;
    try {
      const result = await FileSystem.downloadAsync(
        `http://10.5.6.0:5028/api/Area/checkForPlaces?areaName=${placeName.place.name}`,
        fileUri
      );
      console.log(result);
      console.log("File downloaded to:", result.uri);
      Alert.alert("Download Successful", `File saved to: ${result.uri}`);
    } catch (error) {
      console.error("File download failed:", error);
      Alert.alert(
        "Download Error",
        "Failed to download the file. Please try again."
      );
    }
  };

  const viewFile = async () => {
    const filename = "AreaInfo.json";
    const fileUri = FileSystem.documentDirectory + filename;

    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      
      // If the file is JSON, parse it
      try {
        const jsonData = JSON.parse(fileContent);
        console.log("Parsed JSON Data:", jsonData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
        
      if (fileInfo.exists) {
        console.log("File exists:", fileInfo);
        Alert.alert("File Info", `File is located at: ${fileInfo.uri}`);
      } else {
        Alert.alert(
          "File Not Found",
          "The file does not exist. Download it first."
        );
        const jsonData = JSON.parse(fileInfo);
        console.log("Parsed JSON Data:", jsonData);
      }
    } catch (error) {
      console.error("Error accessing file:", error);
      Alert.alert("Error", "Could not access the file.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardText}>
          Our App helps you navigate through {placeName.place.name} offline. For
          this you need to download the Area Information of{" "}
          {placeName.place.name} in your phone. Please click Download
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.download} onPress={downloadFromUrl}>
          <Text style={styles.buttonText}>Download </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.file} onPress={viewFile}>
          <Text style={styles.buttonText}>View File Location </Text>
        </TouchableOpacity>
      </View>

      {/* <Button style={styles.download} title="Download and Save Locally" onPress={downloadFromUrl} />

      <Text></Text>
      <Button style={styles.download} title="View Saved File Info" onPress={viewFile} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a434e",
    alignItems: "center",
    justifyContent: "center",
  },
  download: {
    backgroundColor: "#52796f",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 3,
  },
  file: {
    backgroundColor: "#52796f",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Adjusts spacing between buttons
    width: "100%", // Ensures buttons take full width of the parent
    paddingHorizontal: 10, // Adds some spacing on the sides
    marginTop: 15, // Adjust spacing from other elements
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    width: "90%", // Responsive width
    backgroundColor: "#FAF3E0", // Card background color
    padding: 20, // Padding inside the card
    borderRadius: 10, // Rounded corners
    alignItems: "center", // Center text inside the card
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20, // Space below the card
  },

  cardText: {
    fontSize: 15,
    color: "#333", // Darker text for readability
    textAlign: "center",
  },
});
