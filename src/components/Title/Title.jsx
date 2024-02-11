import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Title = ({ text }) => {
  return (
    <View style={styles.ContainerTitle}>
      <Text style={styles.TextTitle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerTitle: {
    backgroundColor: 'green',
    marginTop: 10,
    marginBottom: 10,
    width:'100%'
  },
  TextTitle: {
    fontWeight: '800',
    color: '#fff',
    fontSize: 30,
    marginBottom: 10,
    padding: 10,
    textAlign: 'left',
  },
});

export default Title;
