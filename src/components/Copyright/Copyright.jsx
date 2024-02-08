import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CopyrightNotice = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>© Welinson Macedo 2024 App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0', // Cor de fundo (pode ser ajustada conforme necessário)
    padding: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#555', // Cor do texto (pode ser ajustada conforme necessário)
  },
});

export default CopyrightNotice;
