import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

const TRACKS = [
  {
    title: 'Character Demo Main',
    url: 'YOUR_AUDIO_URL_1'
  },
  {
    title: 'Character Demo',
    url: 'YOUR_AUDIO_URL_2'
  },
  {
    title: 'Commercial Demo',
    url: 'YOUR_AUDIO_URL_3'
  }
];

export default function AudioPlayer() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function loadAudio(trackIndex) {
    if (sound) {
      await sound.unloadAsync();
    }
    
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: TRACKS[trackIndex].url },
      { shouldPlay: false }
    );
    
    setSound(newSound);
    setCurrentTrack(trackIndex);
    
    const status = await newSound.getStatusAsync();
    setDuration(status.durationMillis);
  }

  async function togglePlay() {
    if (!sound) {
      await loadAudio(currentTrack);
    }
    
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
        <Text style={styles.playButtonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
      
      <Slider
        style={styles.progressBar}
        value={position}
        maximumValue={duration}
        minimumTrackTintColor="#923ebf"
        maximumTrackTintColor="#1b1f23"
        thumbTintColor="#923ebf"
        onSlidingComplete={async (value) => {
          if (sound) {
            await sound.setPositionAsync(value);
          }
        }}
      />
      
      <View style={styles.trackList}>
        {TRACKS.map((track, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.track,
              currentTrack === index && styles.activeTrack
            ]}
            onPress={() => loadAudio(index)}
          >
            <Text style={styles.trackText}>{track.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  playButton: {
    backgroundColor: '#923ebf',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  playButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  progressBar: {
    height: 40,
    marginBottom: 16,
  },
  trackList: {
    gap: 8,
  },
  track: {
    backgroundColor: 'rgba(20, 23, 25, 0.7)',
    padding: 12,
    borderRadius: 5,
  },
  activeTrack: {
    backgroundColor: '#923ebf',
  },
  trackText: {
    color: '#ffffff',
  },
}); 