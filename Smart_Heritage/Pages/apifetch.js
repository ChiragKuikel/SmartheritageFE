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
import { StyleSheet, Button, View, Alert,Text} from "react-native";
import * as FileSystem from "expo-file-system";

export default function DownloadData() {
  const downloadFromUrl = async () => {
    const filename = "AreaInfo.json";
    const fileUri = FileSystem.documentDirectory + filename;
    try {
      const result = await FileSystem.downloadAsync(
        "http://192.168.254.3:5028/api/Area/download",
        fileUri
      );
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
      if (fileInfo.exists) {
        console.log("File exists:", fileInfo);
        Alert.alert("File Info", `File is located at: ${fileInfo.uri}`);
      } else {
        Alert.alert(
          "File Not Found",
          "The file does not exist. Download it first."
        );
      }
    } catch (error) {
      console.error("Error accessing file:", error);
      Alert.alert("Error", "Could not access the file.");
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Download and Save Locally" onPress={downloadFromUrl} />
      
      <Text></Text>
      <Button title="View Saved File Info" onPress={viewFile} />
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
});
