import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db, auth } from '../../services/firebaseConfig';

const BalanceHistory = () => {
  const [balances, setBalances] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        if (!user) {
          console.warn('User not authenticated.');
          return;
        }

        const balancesQuery = query(
          collection(db, 'Balance'),
          where('userId', '==', user.uid)
        );
        const balancesSnapshot = await getDocs(balancesQuery);

        const userBalances = balancesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort balances from most recent to oldest
        const sortedBalances = userBalances.sort((a, b) => b.dataAtual - a.dataAtual);
        console.log(sortedBalances);
        setBalances(sortedBalances);
      } catch (error) {
        console.error('Error fetching balances:', error);
      }
    };

    fetchBalances();
  }, [user]);

  const handleDeleteBalance = async (balanceId) => {
    try {
      const balanceRef = collection(db, 'Balance'); // Reference to the collection
      const docRef = doc(balanceRef, balanceId); // Reference to the specific document
      await deleteDoc(docRef);

      // Update the local state to reflect the deletion
      setBalances((prevBalances) => prevBalances.filter((balance) => balance.id !== balanceId));

      Alert.alert('Success', 'Balance deleted successfully!');
    } catch (error) {
      console.error('Error deleting balance:', error);
      Alert.alert('Error', 'An error occurred while deleting the balance. Please try again.');
    }
  };

  const renderBalanceItem = ({ item }) => {
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(item.valor);

    const formattedDate = new Date(item.data).toLocaleDateString('pt-BR');
    console.log('Balance Item:', item); // Log balance data to the console
    return (
      <View style={styles.balanceItem}>
        <Text>{`Data Atual: ${formattedDate}`}</Text>
        <Text>{`Descrição: ${item.descricao}`}</Text>
        <Text>{`Valor: ${formattedValue}`}</Text>

        <TouchableOpacity
          onPress={() => handleDeleteBalance(item.id)}
          style={styles.deleteButton}
        >
          <Text>Delete Balance</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={balances}
        keyExtractor={(item) => item.id}
        renderItem={renderBalanceItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  balanceItem: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default BalanceHistory;
