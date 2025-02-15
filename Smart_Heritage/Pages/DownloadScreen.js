import React, { useState } from "react";
import { View, Text,Image, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import assets from "../assets/assets";

const DownloadScreen = ({navigation}) => {
    
    
    return (
        <View style={styles.container}>
            <View style={styles.image}>
                {/* 🔹 Add the Image Here */}
                <Image 
                    source={assets.Mainlogo}  // Ensure the correct path
                    style={styles.image}
                    resizeMode="contain"
                />
                </View>
            <View style={styles.card}>
                <Text style={styles.cardText}>Please Search the required place you want to visit.</Text>
            </View>
            
            <TouchableOpacity 
                style={styles.download}
                onPress={()=>navigation.navigate("HomeScreen",{focusSearch:true})}
                >
                    <Text style={styles.buttonText}>Search</Text>
                  </TouchableOpacity>
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
            justifyContent: "space-between",  // Adjusts spacing between buttons
            width: "100%",  // Ensures buttons take full width of the parent
            paddingHorizontal: 10,  // Adds some spacing on the sides
            marginTop: 15,  // Adjust spacing from other elements
        },
        buttonText: {
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
        },
        card: {
            width: "90%",  // Responsive width
            backgroundColor: "#FAF3E0",  // Card background color
            padding: 20,  // Padding inside the card
            borderRadius: 10,  // Rounded corners
            alignItems: "center",  // Center text inside the card
            justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            marginBottom: 20,  // Space below the card
            marginTop:1,
        },

        cardText: {
            fontSize: 16,
            color: "#000000",  // Darker text for readability
            textAlign: "center",
            fontWeight: "bold"
        },
        image: {
            width: 500,  // Adjust width as needed
            top:20,
            height: 250,  // Adjust height as needed
            marginBottom: 1,  // Space below the image
            paddingbottom:200,
        },

    });



export default DownloadScreen;