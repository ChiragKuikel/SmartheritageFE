import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const LearnToUse = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Learn to Use</Text>

      {/* Introduction */}
      <Text style={styles.sectionTitle}>Introduction</Text>
      <Text style={styles.text}>
        Explore the heritage site with detailed building information, audio guides, and earn badges as you visit! Discover location-based content and make your visit more engaging.
      </Text>

      {/* Getting Started */}
      <Text style={styles.sectionTitle}>Getting Started</Text>
      <Text style={styles.text}>
        - Download the app from the App Store or Google Play.\n
        - Create an account and log in to access all features.\n
        - Allow location and notification permissions for the best experience.
      </Text>

      {/* Using the App */}
      <Text style={styles.sectionTitle}>Using the App</Text>
      <Text style={styles.text}>
        - When you enter a building, the app detects your location automatically using ESP32 devices.\n
        - View detailed information and play audio guides for the building.\n
        - Earn badges by visiting buildings and check your progress in the Badge Collection section.\n
        - Use the text-to-speech feature to listen to building information.
      </Text>

      {/* Navigation Tips */}
      <Text style={styles.sectionTitle}>Navigation Tips</Text>
      <Text style={styles.text}>
        - Use the Home tab to view general information.\n
        - Check the Map tab for building locations.\n
        - Visit the Profile tab to see your badges and account details.\n
        - Use the Search bar to find specific buildings or guides.
      </Text>

      {/* FAQ Section */}
      <Text style={styles.sectionTitle}>FAQ</Text>
      <Text style={styles.text}>
        - How does the app detect which building I’m in?\n
          The app uses ESP32 devices installed in the buildings to identify your location.\n
        - Why do I need to enable location services?\n
          Location services are necessary for the app to provide building-specific content.\n
        - How can I reset my password?\n
          Go to the Profile section, select "Forgot Password," and follow the instructions.
      </Text>

      {/* Support */}
      <Text style={styles.sectionTitle}>Support</Text>
      <Text style={styles.text}>
        If you have questions or need help, contact us at support@heritageapp.com.
      </Text>

      {/* Additional Features */}
      <Text style={styles.sectionTitle}>Additional Features</Text>
      <Text style={styles.text}>
        Stay tuned for upcoming features like interactive maps and personalized recommendations.
      </Text>

      {/* Contact Us Button */}
      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.contactButtonText}>Contact Support</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
    marginBottom: 12,
  },
  contactButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LearnToUse;