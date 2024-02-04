// Import necessary libraries
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../../services/firebaseConfig'; // Import your Firestore and Authentication configurations

const AddExpense = () => {
  const [expense, setExpense] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [amount, setAmount] = useState('');
  const user = auth.currentUser;

  const handleAddExpense = async () => {
    try {
      if (!user) {
        console.warn('User not authenticated.');
        return;
      }

      // Add a new expense to the Firestore collection with the user ID
      await addDoc(collection(db, 'Despesas'), {
        dataAtual: serverTimestamp(),
        paid: '',
        despesa: expense,
        dataVencimento: dueDate,
        valor: amount,
        userId: user.uid, // Include the user ID
      });

      // Clear input fields after adding expense
      setExpense('');
      setDueDate('');
      setAmount('');

      Alert.alert('Success', 'Expense added successfully!');
    } catch (error) {
      console.error('Error adding expense: ', error);
      Alert.alert('Error', 'An error occurred while adding the expense. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Lançar Despesas</Text>
      <TextInput
        placeholder="Despesa"
        style={styles.input}
        value={expense}
        onChangeText={(text) => setExpense(text)}
      />
      <TextInput
        placeholder="Data Vencimento"
        style={styles.input}
        value={dueDate}
        onChangeText={(text) => setDueDate(text)}
        keyboardType="numeric"
        type="date"
      />
      <TextInput
        placeholder="Valor"
        style={styles.input}
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
      />
      <Button title="Adicionar Despesa" onPress={handleAddExpense} />
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
    marginBottom: 10,
    paddingLeft: 10,
    width: 300,
  },
});

export default AddExpense;
