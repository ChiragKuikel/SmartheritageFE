import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import assets from './assets/assets';

const AboutPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gradient}>
        <Image source={assets.Mainlogo} style={styles.logo} />
        <Text style={styles.title}>Welcome to Smart Heritage!</Text>
        <Text style={styles.paragraph}>
          Smart Heritage revolutionizes the way tourists explore heritage sites by serving as a digital guide. Utilizing the power of ESP32, the app seamlessly connects with user's mobile devices to provide real-time information about their location.
        </Text>
        <Text style={styles.paragraph}>
          As tourists approach various points of interest, the app automatically detects their proximity and delivers detailed descriptions, historical facts, and other relevant content about the site.
        </Text>
        
     </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:"#1a434e",
  },
  gradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AboutPage;