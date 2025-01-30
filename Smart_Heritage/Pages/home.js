import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { SearchBar } from "@rneui/themed";

const { width } = Dimensions.get("window");

const HomePage = ({ navigation }) => {
  const [text, setText] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>


        {/* Authentication Buttons */}
        <View style={styles.authButtons}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.floatingButtonPlus} onPress={() => navigation.navigate("bluetooth")}>
            <Text style={styles.floatingButtonText}>📍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.explain} onPress={() => navigation.navigate("About Us")}>
          <Image source={require("../Patan1.jpg")} style={styles.img} />
          <View style={styles.textContainer}>
            <Text style={styles.textInsideImg}>WHAT DO WE DO?</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.explain} onPress={() => navigation.navigate("learnToUse")}>
          <Image source={require("../Patan2.png")} style={styles.img} />
          <View style={styles.textContainer}>
            <Text style={styles.textInsideImg}>LEARN TO USE</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.explain} onPress={() => navigation.navigate("Download")}>
          <Image source={require("../Patan3.png")} style={styles.img} />
          <View style={styles.textContainer}>
            <Text style={styles.textInsideImg}>READ ARTICLE</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Floating Button */}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a434e", // Light green background 1a434e
  },
  searchContainer: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  searchInput: {
    backgroundColor: "#FAF3E0",
    borderRadius: 20,
    padding: 5,
  },
  authButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 10,
  },
  button: {
    height:50,
    backgroundColor: "#52796f",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#005",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  explain: {
    borderRadius: 15,
    margin: 15,
    position: "relative",
    backgroundColor: "#FAF3E0", // Creamy white background for text area
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: "center", // Center content
  },
  img: {
    borderRadius: 10,
    height: 200,
    width: width * 0.9,
    alignSelf: "center",
    marginBottom: 10, // Creates space for text below
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
  },
  textInsideImg: {
    fontSize: width * 0.05,
    color: "#4A4A4A",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    textAlign: "center",
  },
  floatingButton: {
    position:"relative",
    top:0,
    bottom:20,
    left:1,
    backgroundColor: "#a3c6c9",
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  floatingButtonPlus: {
    position:"relative",
    top:0,
    bottom:20,
    left:1,
    backgroundColor: "#a3c6c9",
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  floatingButtonText: {
    color: "white",
    fontSize: width * 0.08,
    fontWeight: "bold",
  },
});

export default HomePage;
