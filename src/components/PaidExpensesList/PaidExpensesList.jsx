import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebaseConfig';
import DeleteButton from '../Buttons/DeleteButton';
import HeaderTitle from '../HeaderTitle/HeaderTitle';
import AlertModal from '../AlertModal/AlertModal'; 
import Title from '../Title/Title'


const PaidExpensesList = () => {
  const [expenses, setExpenses] = useState([]);
  const [showAlert, setShowAlert] = useState(false); 
  const [alertMessage, setAlertMessage] = useState(''); 
  const user = auth.currentUser;


    const fetchData = async () => {
      try {
        if (!user) {
          console.warn('User not authenticated.');
          return;
        }

        const expensesCollection = collection(db, 'Despesas');
        const expensesSnapshot = await getDocs(expensesCollection);

        const userExpenses = expensesSnapshot.docs
          .filter((doc) => doc.data().userId === user.uid && doc.data().paid === true)
          .map((doc) => ({ id: doc.id, ...doc.data() }));

        const sortedExpenses = userExpenses.sort((a, b) => b.dataAtual - a.dataAtual);
        setExpenses(sortedExpenses);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    useEffect(() => {
    fetchData();
  }, [user]);

  const handleCancelPayment = async (expenseId) => {
    try {
      const expenseRef = doc(db, 'Despesas', expenseId);
      await updateDoc(expenseRef, { paid: false });

      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === expenseId ? { ...expense, paid: false } : expense
        )
      );

     
      setShowAlert(true);
      setAlertMessage('Pagamento cancelado com sucesso');
    } catch (error) {
      console.error('Error canceling payment:', error);
     
      setShowAlert(true);
      setAlertMessage('Erro ao cancelar pagamento , Tente Novamente');
    }
    fetchData()
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const expenseRef = doc(db, 'Despesas', expenseId);
      await deleteDoc(expenseRef);

      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId));

    
      setShowAlert(true);
      setAlertMessage('Despesa deletada com sucesso');
    } catch (error) {
      console.error('Error deleting expense:', error);
      
      setShowAlert(true);
      setAlertMessage('Erro ao deletar despesa ,Tente novamente');
    }
    fetchData()
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const renderExpenseItem = ({ item }) => (
    <View style={styles.container}>
      <Text>{`Despesa: ${item.despesa}`}</Text>
      <Text>{`Valor: R$ ${parseFloat(item.valor).toFixed(2)}`}</Text>
      <Text>{`Data Vencimento: ${item.dataVencimento}`}</Text>
      <Text>{`Pago: ${item.paid ? 'Sim' : 'Não'}`}</Text>
      {item.paid && (
        <TouchableOpacity onPress={() => handleCancelPayment(item.id)} style={styles.cancelPaymentButton}>
          <Text>Cancelar Pagamento</Text>
        </TouchableOpacity>
      )}
      <DeleteButton onPress={() => handleDeleteExpense(item.id)} />
    </View>
  );

  return (
    <>
      <HeaderTitle title='' />
      <Title text={'Despesas Pagas'}/>
      <View style={styles.container}>
        <FlatList
          style={styles.Item}
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={renderExpenseItem}
        />
      </View>
      
      <AlertModal visible={showAlert} message={alertMessage} onClose={handleCloseAlert} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    alignItems:'center',
    gap:20,
    borderBottomWidth: 2,
    borderBottomColor:'#000'
  },
 
  cancelPaymentButton: {
    backgroundColor: '#00FF7F',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default PaidExpensesList;
