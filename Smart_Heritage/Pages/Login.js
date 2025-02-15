// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     console.log("Email:", email, "Password:", password);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         placeholderTextColor="#888"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         placeholderTextColor="#888"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>

//       <Text style={styles.link} onPress={() => navigation.navigate("SignUp")}>
//         Don't have an account? <Text style={styles.linkBold}>Sign Up</Text>
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#1a434e", // Light green background
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#ffffff",
//     marginBottom: 20,
//   },
//   input: {
//     width: "100%",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 30,
//     padding: 12,
//     marginBottom: 15,
//     backgroundColor: "#FAF3E0", // Creamy white background
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: "#a188f8",
//     paddingVertical: 14,
//     paddingHorizontal: 30,
//     borderRadius: 30,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 2, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   link: {
//     marginTop: 15,
//     color: "#ffffff",
//     fontSize: 16,
//   },
//   linkBold: {
//     fontWeight: "bold",
//     color: "#a188f8",
//   },
// });

// export default Login;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ Store token
import { useNavigation } from "@react-navigation/native"; // ✅ For navigation

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation(); // ✅ Get navigation instance

  const handleLogin = async () => {
    
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      console.log(email, password);
      const response = await fetch(
        "http://10.5.6.0:5028/userLogin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email, // Ensure this matches what your API expects
            password: password,
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        const token = data.token; // ✅ Extract token from response

        // ✅ Store token in AsyncStorage for future authenticated requests
        await AsyncStorage.setItem("token", token);

        Alert.alert("Success", "Login Successful");

        // ✅ Navigate to HomeScreen after successful login
        navigation.replace("HomeScreen");
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.navigate("SignUp")}>
        Don't have an account? <Text style={styles.linkBold}>Sign Up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#1a434e",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 30,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#FAF3E0",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#52796f",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    color: "#ffffff",
    fontSize: 16,
  },
  linkBold: {
    fontWeight: "bold",
    color: "#a188f8",
  },
});

export default Login;
