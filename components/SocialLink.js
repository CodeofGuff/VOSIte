import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SocialLink({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(20, 23, 25, 0.7)',
    padding: 12,
    borderRadius: 5,
    minWidth: 120,
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 14,
  },
}); 