import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db, auth } from '../../services/firebaseConfig';
import DeleteButton from '../Buttons/DeleteButton';
import HeaderTitle from '../HeaderTitle/HeaderTitle';
import AlertModal from '../AlertModal/AlertModal'; 
import Title from '../Title/Title'



const BalanceHistory = () => {
  const [balances, setBalances] = useState([]);
  const [showAlert, setShowAlert] = useState(false); 
  const [alertMessage, setAlertMessage] = useState(''); 
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
      const balanceRef = collection(db, 'Balance'); 
      const docRef = doc(balanceRef, balanceId); 
      await deleteDoc(docRef);

     
      setBalances((prevBalances) => prevBalances.filter((balance) => balance.id !== balanceId));

     
      setShowAlert(true);
      setAlertMessage('Saldo excluído com sucesso!');
    } catch (error) {
      console.error('Error deleting balance:', error);
    
      setShowAlert(true);
      setAlertMessage('Ocorreu um erro ao excluir o saldo. Por favor, tente novamente.');
    }
  };

  const renderBalanceItem = ({ item }) => {
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(item.valor);

    const formattedDate = new Date(item.data).toLocaleDateString('pt-BR');
    console.log('Balance Item:', item); 
    return (
      <View style={styles.container}>
        <Text>{`Data Lancamento: ${formattedDate}`}</Text>
        <Text>{`Descrição: ${item.descricao}`}</Text>
        <Text>{`Valor: ${formattedValue}`}</Text>

        <DeleteButton 
          onPress={() => handleDeleteBalance(item.id)}
        />
       
      </View>
    );
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Title text={'Historico de Saldos'}/>
      <HeaderTitle title='' />
      <View >
        <FlatList
          data={balances}
          keyExtractor={(item) => item.id}
          renderItem={renderBalanceItem}
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
