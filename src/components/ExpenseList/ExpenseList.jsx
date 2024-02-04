import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../services/firebaseConfig';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          console.warn('User not authenticated.');
          return;
        }

        const expensesCollection = collection(db, 'Despesas');
        const expensesSnapshot = await getDocs(expensesCollection);

        // Retrieve all expenses for the user
        const userExpenses = expensesSnapshot.docs
          .filter((doc) => doc.data().userId === user.uid)
          .map((doc) => ({ id: doc.id, ...doc.data() }));

        // Sort expenses from most recent to oldest
        const sortedExpenses = userExpenses.sort((a, b) => b.dataAtual - a.dataAtual);

        setExpenses(sortedExpenses);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchData();
  }, [user]);

  const handlePayExpense = async (expenseId) => {
    try {
      const expenseRef = doc(db, 'Despesas', expenseId);
      await updateDoc(expenseRef, { paid: true });

      // Update the local state to reflect the payment
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === expenseId ? { ...expense, paid: true } : expense
        )
      );

      Alert.alert('Success', 'Expense paid successfully!');
    } catch (error) {
      console.error('Error paying expense:', error);
      Alert.alert('Error', 'An error occurred while paying the expense. Please try again.');
    }
  };

  const handleCancelPayment = async (expenseId) => {
    try {
      const expenseRef = doc(db, 'Despesas', expenseId);
      await updateDoc(expenseRef, { paid: false });

      // Update the local state to reflect the canceled payment
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === expenseId ? { ...expense, paid: false } : expense
        )
      );

      Alert.alert('Success', 'Payment canceled successfully!');
    } catch (error) {
      console.error('Error canceling payment:', error);
      Alert.alert('Error', 'An error occurred while canceling the payment. Please try again.');
    }
  };

  const renderExpenseItem = ({ item }) => (
    <View style={styles.expenseItem}>
      <Text>{`Despesa: ${item.despesa}`}</Text>
      <Text>{`Valor: ${item.valor}`}</Text>
      <Text>{`Data Vencimento: ${item.dataVencimento}`}</Text>
      <Text>{`Pago: ${item.paid ? 'Sim' : 'Não'}`}</Text>
      {!item.paid && (
        <TouchableOpacity
          onPress={() => handlePayExpense(item.id)}
          style={[styles.payButton, { backgroundColor: isExpenseOverdue(item) ? 'red' : 'blue' }]}
        >
          <Text>Pagar Despesa</Text>
        </TouchableOpacity>
      )}
      {item.paid && (
        <TouchableOpacity
          onPress={() => handleCancelPayment(item.id)}
          style={styles.cancelPaymentButton}
        >
          <Text>Cancelar Pagamento</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const isExpenseOverdue = (expense) => {
    const dueDate = new Date(expense.dataVencimento);
    const currentDate = new Date();

    return dueDate < currentDate;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={renderExpenseItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  expenseItem: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
  },
  payButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  cancelPaymentButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default ExpenseList;
