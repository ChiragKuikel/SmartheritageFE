import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "@rneui/themed";

const HomePage = ({ navigation }) => {
  const handleLoginPress = () => {
    navigation.navigate("Login");
  };
  const handleSignUpPress = () => {
    navigation.navigate("SignUp");
  };
  const handleExplorePress = () => {
    navigation.navigate("Download");
  };
  const handleExplorePress2 = () => {
    navigation.navigate("About Us");
  };
  const handleAddPress = () => {
    navigation.navigate("bluetooth");
  };
  const handleLearnToUse = () => {
    navigation.navigate("learnToUse");
  };
  const [text, setText] = useState();
  const updateText = (value) => {
    setText(value);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <SearchBar
          placeholder="Type Here..."
          value={text}
          onChangeText={updateText}
          platform="default"
          lightTheme
          round
          style={styles.searchybar}
        />
        <View style={styles.authButtons}>
          <Button title="Login" onPress={handleLoginPress} />
          <Button title="Signup" onPress={handleSignUpPress} />
        </View>

        <TouchableHighlight
          underlayColor={"lightgrey"}
          onPress={handleExplorePress2}
        >
          <View style={styles.explain}>
            <Image source={require("../Patan1.jpg")} style={styles.img} />
            <Text style={styles.text_inside_img}>WHAT DO WE DO?</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={"lightgrey"}
          onPress={handleLearnToUse}
        >
          <View style={styles.explain}>
            <Image source={require("../Patan2.png")} style={styles.img} />
            <Text style={styles.text_inside_img}>LEARN TO USE</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={"lightgrey"}
          onPress={handleExplorePress}
        >
          <View style={styles.explain}>
            <Image source={require("../Patan3.png")} style={styles.img} />
            <Text style={styles.text_inside_img}>READ ARTICLE</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={handleAddPress}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  searchybar: {
    color: "black",
  },
  explain: {
    borderRadius: 10,
    margin: 15,
    position: "relative",
  },
  img: {
    borderRadius: 10,
    height: 280,
    width: 400, //376
  },
  text_inside_img: {
    position: "absolute",
    top: "70%",
    left: "50%",
    transform: [{ translateX: -87 }],
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  authButtons: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
    gap: 4,
    borderRadius: 10,
    padding: 4,
  },

  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007BFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  floatingButtonText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default HomePage;
