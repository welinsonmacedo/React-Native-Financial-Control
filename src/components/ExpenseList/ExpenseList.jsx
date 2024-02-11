import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebaseConfig';
import DeleteButton from '../Buttons/DeleteButton';
import HeaderTitle from '../HeaderTitle/HeaderTitle';
import AlertModal from '../AlertModal/AlertModal';
import Title from '../Title/Title'


const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const user = auth.currentUser;
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [textStates, setTextStates] = useState('');
  
    const fetchData = async () => {
      try {
        if (!user) {
          console.warn('User not authenticated.');
          return;
        }

        const expensesCollection = collection(db, 'Despesas');
        const expensesSnapshot = await getDocs(expensesCollection);

        const userExpenses = expensesSnapshot.docs
          .filter((doc) => doc.data().userId === user.uid && doc.data().paid === false)
          .map((doc) => ({ id: doc.id, ...doc.data() }));

        const sortedExpenses = userExpenses.sort((a, b) => b.dataAtual - a.dataAtual);

        setExpenses(sortedExpenses);

        // Verificar despesas vencidas
        checkOverdueExpenses(userExpenses);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    useEffect(() => {
    fetchData();
  }, [user]);

  const checkOverdueExpenses = (userExpenses) => {
    const today = new Date().getTime();

    const overdueExpenses = userExpenses.filter((expense) => {
      const dueDate = new Date(expense.dataVencimento).getTime();
      return dueDate < today;
    });

    if (overdueExpenses.length > 0) {
      setShowAlert(true);
      setAlertMessage('Você possui despesas vencidas. Verifique sua lista de despesas.');
      setTextStates('Despesa Vencida');
      
    }
    else{
      setTextStates('Despesa Esta em dia ');
    }
  };

  const handlePayExpense = async (expenseId) => {
    try {
      const expenseRef = doc(db, 'Despesas', expenseId);
      await updateDoc(expenseRef, { paid: true });

      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === expenseId ? { ...expense, paid: true } : expense
        )
      );
      setShowAlert(true);
      setAlertMessage('Despesa Paga Com Sucesso')
    
    } catch (error) {
      console.error('Error paying expense:', error);
      setShowAlert(true);
      setAlertMessage('Erro ao realizar pagamento ,Tente Novamente')
     
    }
    fetchData()
  };

  const renderExpenseItem = ({ item }) => (
    <View style={styles.container}>
      <Text>{`Despesa: ${item.despesa}`}</Text>
      <Text>{`Valor: R$ ${parseFloat(item.valor).toFixed(2)}`}</Text>
      <Text>{`Data Vencimento: ${item.dataVencimento}`}</Text>
      <Text>{`Status: ${textStates}`}</Text>
      <Text>{`Pago: ${item.paid ? 'Sim' : 'Não'}`}</Text>
      {!item.paid && (
        <TouchableOpacity onPress={() => handlePayExpense(item.id)} style={[styles.payButton]}>
          <Text>Pagar Despesa</Text>
        </TouchableOpacity>
      )}
      <DeleteButton onPress={() => handleDeleteExpense(item.id)} />
    </View>
  );

  const handleDeleteExpense = async (expenseId) => {
    try {
      const expenseRef = doc(db, 'Despesas', expenseId);
      await deleteDoc(expenseRef);

      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId));
      setShowAlert(true);
      setAlertMessage('Despesa excluida com sucesso')
      
    } catch (error) {
      console.error('Erro ao excluir a despesa:', error);
      setShowAlert(true);
      setAlertMessage('Erro ao exluir a despesa , Tente novamente')
      
    }
    fetchData()
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  return (
    <>
      <HeaderTitle title='' />
      <Title text={'Pagar Despesas'}/>
      <View style={styles.container}>
        
        <FlatList
          style={styles.Item}
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={renderExpenseItem}
        />
         <AlertModal visible={showAlert} message={alertMessage} onClose={handleCloseAlert} />
      </View>
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
  payButton: {
    backgroundColor: '#66CDAA',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default ExpenseList;
