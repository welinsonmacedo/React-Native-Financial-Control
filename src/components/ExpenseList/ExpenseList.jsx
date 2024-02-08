import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, getDocs, updateDoc, doc ,deleteDoc} from 'firebase/firestore';
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

  const handleDeleteExpense = async (expenseId) => {
    try {
      const expenseRef = doc(db, 'Despesas', expenseId);
      await deleteDoc(expenseRef);
  
      // Atualize o estado local para refletir a exclusão
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId));
  
      Alert.alert('Sucesso', 'Despesa excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir a despesa:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao excluir a despesa. Tente novamente.');
    }
  };


  const isExpenseOverdue = (expense) => {
    const dueDateParts = expense.dataVencimento.split('/');
    const dueDate = new Date(
      parseInt(dueDateParts[2], 10),
      parseInt(dueDateParts[1], 10) - 1,
      parseInt(dueDateParts[0], 10)
    );
  
    const currentDate = new Date();
  
    // Removendo a parte do tempo para garantir que estamos comparando apenas as datas
    dueDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
  
    return dueDate < currentDate;
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
       <TouchableOpacity
      onPress={() => handleDeleteExpense(item.id)}
      style={styles.deleteButton}
    >
      <Text>Excluir Despesa</Text>
    </TouchableOpacity>
    </View>
  );



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
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default ExpenseList;
