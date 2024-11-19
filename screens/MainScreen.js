import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AudioPlayer from '../components/AudioPlayer';
import SocialLink from '../components/SocialLink';

export default function MainScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://i.imgur.com/0NI9XLf.png' }}
            style={styles.profileImage}
          />
        </View>

        <View style={styles.flexContainer}>
          <View style={styles.demoReel}>
            <Text style={styles.heading}>Voice Demos</Text>
            <AudioPlayer />
          </View>

          <View style={styles.aboutSection}>
            <Text style={styles.heading}>About Me</Text>
            <Text style={styles.welcomeText}>
              Welcome! I'm a versatile voice actor with experience in commercials, animation, video games, and narration. My voice has been described as warm, engaging, and adaptable to various character types.
            </Text>
            <View style={styles.skills}>
              <Text style={styles.subHeading}>Specialties</Text>
              <View style={styles.skillsList}>
                <Text style={styles.skillItem}>• Commercial Narration</Text>
                <Text style={styles.skillItem}>• Character Voices</Text>
                <Text style={styles.skillItem}>• Animation</Text>
                <Text style={styles.skillItem}>• Video Game Voices</Text>
                <Text style={styles.skillItem}>• Corporate Narration</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.connectSection}>
        <Text style={styles.heading}>Connect With Me</Text>
        <View style={styles.socialLinks}>
          <SocialLink 
            title="Bluesky"
            onPress={() => Linking.openURL('https://bsky.app')}
          />
          <SocialLink 
            title="LinkedIn"
            onPress={() => Linking.openURL('https://linkedin.com')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Converting CSS styles to React Native styles
  container: {
    flex: 1,
    backgroundColor: '#1b1f23',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: '100%',
    height: 400,
    maxWidth: 800,
    resizeMode: 'contain',
  },
  flexContainer: {
    flexDirection: 'row',
    padding: 16,
    flexWrap: 'wrap',
  },
  demoReel: {
    flex: 1,
    minWidth: 300,
    padding: 16,
  },
  aboutSection: {
    flex: 2,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    color: '#923ebf',
    marginBottom: 16,
    textShadowColor: 'rgba(146, 62, 191, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subHeading: {
    fontSize: 20,
    color: '#923ebf',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: '#a4a0b9',
    marginBottom: 16,
  },
  skillsList: {
    marginTop: 8,
  },
  skillItem: {
    fontSize: 16,
    color: '#a4a0b9',
    marginBottom: 4,
  },
  connectSection: {
    padding: 16,
    alignItems: 'center',
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
}); 