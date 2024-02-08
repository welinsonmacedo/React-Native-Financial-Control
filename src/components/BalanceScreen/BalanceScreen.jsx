import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { collection, getDocs, query, onSnapshot, where } from 'firebase/firestore';
import { db, auth } from '../../services/firebaseConfig';

const BalanceSummary = () => {
  const [balances, setBalances] = useState([]);
  const [expensesTotal, setExpensesTotal] = useState(0);

  useEffect(() => {
    // Function to fetch balances
    const fetchBalances = async () => {
      try {
        if (!auth.currentUser) {
          console.warn('User not authenticated.');
          return;
        }

        const balancesQuery = query(
          collection(db, 'Balance'),
          where('userId', '==', auth.currentUser.uid)
        );

        // Subscribe to changes in the balances collection
        const unsubscribe = onSnapshot(balancesQuery, (snapshot) => {
          const balancesData = snapshot.docs.map(doc => doc.data());
          setBalances(balancesData);
        });

        // Make sure to unsubscribe when the component is unmounted
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching balances:', error);
      }
    };

    // Function to fetch the total expenses
    const fetchExpensesTotal = async () => {
      try {
        const expensesQuery = query(
          collection(db, 'Despesas'),
          where('paid', '==', true)
        );

        // Subscribe to changes in the expenses collection
        const unsubscribe = onSnapshot(expensesQuery, (snapshot) => {
          const total = snapshot.docs.reduce(
            (acc, doc) => acc + parseFloat(doc.data().valor || 0),
            0
          );

          setExpensesTotal(total);
        });

        // Make sure to unsubscribe when the component is unmounted
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    // Execute the fetch functions
    fetchBalances();
    fetchExpensesTotal();
  }, []); // Run once when the component is mounted

  // Calculate the total balance by summing the values of the balances
  const totalBalance = balances.reduce((acc, balance) => acc + parseFloat(balance.valor || 0), 0);

  // Calculate the current balance by subtracting the total expenses from the total balance
  const currentBalance = totalBalance - expensesTotal;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Saldo Atual:</Text>
      <Text style={styles.balanceText}>{`R$ ${currentBalance.toFixed(2)}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default BalanceSummary;
