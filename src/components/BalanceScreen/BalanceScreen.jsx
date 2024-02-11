import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { collection, getDocs, query, onSnapshot, where } from 'firebase/firestore';
import { db, auth } from '../../services/firebaseConfig';

const BalanceSummary = () => {
  const [balances, setBalances] = useState([]);
  const [expensesTotal, setExpensesTotal] = useState(0);

  useEffect(() => {
    
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

    
        const unsubscribe = onSnapshot(balancesQuery, (snapshot) => {
          const balancesData = snapshot.docs.map(doc => doc.data());
          setBalances(balancesData);
        });

     
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching balances:', error);
      }
    };

  
    const fetchExpensesTotal = async () => {
      try {
        const expensesQuery = query(
          collection(db, 'Despesas'),
          where('paid', '==', true),
          where('userId', '==', auth.currentUser.uid) // Adiciona este filtro
        );
    
        const unsubscribe = onSnapshot(expensesQuery, (snapshot) => {
          const total = snapshot.docs.reduce(
            (acc, doc) => acc + parseFloat(doc.data().valor || 0),
            0
          );
    
          setExpensesTotal(total);
        });
    
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };


    fetchBalances();
    fetchExpensesTotal();
  }, []);

 
  const totalBalance = balances.reduce((acc, balance) => acc + parseFloat(balance.valor || 0), 0);


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
    fontWeight:700,
  },
  balanceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'#00FF7F'
  },
});

export default BalanceSummary;
