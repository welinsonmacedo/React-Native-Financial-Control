import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const CurrencyInput = ({ value, onChange }) => {
  const [amount, setAmount] = useState(value);

  const handleChange = (input) => {
    // Remove todos os caracteres que não sejam números
    const digits = input.replace(/[^\d]/g, '');

    // Formata o valor com R$ e duas casas decimais
    const formattedAmount = `R$ ${(Number(digits) / 100).toFixed(2)}`;

    setAmount(formattedAmount);
    onChange(digits);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="R$ 0,00"
        style={styles.input}
        value={value}
        onChangeText={onChange}
        keyboardType="numeric"
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

export default CurrencyInput;
