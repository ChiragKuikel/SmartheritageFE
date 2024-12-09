import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AboutPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
        <Image source={require('./Logo.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome to Our App!</Text>
        <Text style={styles.paragraph}>
          Our innovative app revolutionizes the way tourists explore heritage sites by serving as a digital guide. Utilizing the power of ESP32, the app seamlessly connects with users' mobile devices to provide real-time information about their location.
        </Text>
        <Text style={styles.paragraph}>
          As tourists approach various points of interest, the app automatically detects their proximity and delivers detailed descriptions, historical facts, and other relevant content about the site.
        </Text>
        <Text style={styles.paragraph}>
          This interactive experience is enhanced with multimedia elements, making your exploration more engaging and informative.
        </Text>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  gradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
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
