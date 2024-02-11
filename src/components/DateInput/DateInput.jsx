import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const formatDate = (input) => {
  // Remove todos os caracteres que não sejam números
  const digits = input.replace(/\D/g, '');

  // Formata a data no formato DD/MM/YYYY
  const formatted = digits.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
  return formatted;
};

const DateInput = ({ value, onChange }) => {
  const [date, setDate] = useState(value);

  const handleChange = (input) => {
    // Formata a data conforme o usuário digita
    const formattedDate = formatDate(input);
    setDate(formattedDate);
    onChange(formattedDate);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="DD/MM/YYYY"
        style={styles.input}
        value={date} // Alterado de value para date
        onChangeText={handleChange} // Alterado de onChange para handleChange
        keyboardType="numeric"
        maxLength={10} // Define o comprimento máximo do texto como 10 caracteres (DD/MM/YYYY)
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: 200,
  },
});

export default DateInput;
