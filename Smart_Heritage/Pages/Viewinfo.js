import React, { useState } from "react";
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { Image } from "react-native";
import assets from "../assets/assets";
import { Ionicons } from "@expo/vector-icons";
import Tts from "react-native-tts";
import { useContext } from "react";
import { MyContext } from "../Provider";
const BuildingInfo = ({ route }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [reloadbutton, setReloadbutton] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const { name, setName, voice, setVoice } = useContext(MyContext);

  useEffect(() => {
    console.log("1st");
    
    if (voice) {
      Tts.stop();
      console.log("vitra");
      handleVoice();
    }
  }, [name]);
  handleVoice = () => {
    console.log("2nd");
    if (voice) {
      setIsSpeaking(true);
    } else if (!voice) {
      setIsSpeaking(!isSpeaking);
    }
  };
  useEffect(() => {
    console.log("yoyo");
    readFile();
  }, []);
  useEffect(() => {
    if (hasMounted) {
      setReloadbutton(true);
    } else if (!hasMounted && !voice) {
      setHasMounted(true);
    } else if (voice) {
      console.log("3rd");
      readFile();
    }
  }, [name]);
  useEffect(() => {
    if (isSpeaking && filteredData) {
      const textToRead = `${filteredData.Name} is a temple dedicated to ${filteredData.Deity}. It was built by ${filteredData.BuiltBy} in ${filteredData.BuiltIn}. ${filteredData.Details}`;
      Tts.speak(textToRead);
    } else {
      Tts.stop();
    }
  }, [isSpeaking, filteredData]);
  useEffect(() => {
    return () => {
      Tts.stop(); // Stops TTS when the component unmounts
    };
  }, []);
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
      {reloadbutton ? (
        <View
          style={{
            position: "absolute",
            top: 10,
            left: 20,
            right: 20,
            backgroundColor: "#ffffff",
            borderRadius: 12,
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
            zIndex: 20,
          }}
        >
          <Image
            source={imageMap[name]} // Replace with your avatar URL
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              marginRight: 10,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              You are near {name}
            </Text>
            <TouchableOpacity
              onPress={() => {
                readFile();
              }}
            >
              <Text style={{ color: "#007bff", marginTop: 5 }}>
                Click to explore
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View></View>
      )}
      {filteredData ? (
        <>
          <Image
            source={imageMap[filteredData.Name]} // 'Krishnamandir ko thau ma name rakhna paryo'
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.dataContainer}>
            <Text style={styles.heading}>{filteredData.Name}</Text>
            {voice ? (
              <View></View>
            ) : (
              <TouchableOpacity
                style={[styles.button, isSpeaking && styles.activeButton]}
                onPress={() => handleVoice()}
              >
                <Ionicons
                  name={isSpeaking ? "mic-off" : "mic"}
                  size={24}
                  color="#ffffff"
                />
              </TouchableOpacity>
            )}
            <ScrollView>
              {filteredData ? (
                <View>
                  <Text style={styles.fileText}>
                    <Text style={styles.bold}>Details:</Text>{" "}
                    {filteredData.Details}
                  </Text>
                  <Text style={styles.fileText}>
                    <Text style={styles.bold}>Built By:</Text>{" "}
                    {filteredData.BuiltBy}
                  </Text>
                  <Text style={styles.fileText}>
                    <Text style={styles.bold}>Built In:</Text>{" "}
                    {filteredData.BuiltIn}
                  </Text>
                  <Text style={styles.fileText}>
                    <Text style={styles.bold}>Deity:</Text> {filteredData.Deity}
                  </Text>
                </View>
              ) : (
                <Text style={styles.fileText}>No data available.</Text>
              )}
            </ScrollView>
          </View>
        </>
      ) : (
        <Text>Loading.........</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    position: "relative",
  },
  text: {
    fontSize: 24,
    color: "black",
    marginBottom: 10,
  },
  heading: {
    fontSize: 32,
    color: "black",
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  dataContainer: {
    width: "100%",
    padding: 30,
    backgroundColor: "#1a434e",
    maxHeight: 300,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 0,
    marginTop: -40,
    zIndex: 20,
    textDecorationColor: "white",
  },
  fileText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    color: "white",
  },
  bold: {
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: "60%",
    marginBottom: 0,
    zIndex: 10,
  },
  floatingbutton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
    zIndex: 30,
  },
  button: {
    backgroundColor: "#6200ea",
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 5,
    top: 10,
  },
  activeButton: {
    backgroundColor: "#3700b3",
    position: "absolute",
    right: 5,
    top: 10,
  },
});

export default BuildingInfo;
