import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, Picker, TextInput } from 'react-native';
import { addDoc, collection, serverTimestamp, getDocs } from 'firebase/firestore';
import { db, auth } from '../../services/firebaseConfig';


//Components//
import DateInput from '../DateInput/DateInput'; 
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import ButtonsAll from '../../components/Buttons/ButtonsALL';
import Title from '../Title/Title';
import HeaderTitle from '../HeaderTitle/HeaderTitle';




const AddExpense = () => {
  const [expense, setExpense] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [amount, setAmount] = useState('');
  const [despesaNames, setDespesaNames] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchDespesaNames = async () => {
      const querySnapshot = await getDocs(collection(db, 'DespesaName'));
      const names = querySnapshot.docs.map(doc => doc.data().nome);
      setDespesaNames(names);
    };

    fetchDespesaNames();
  }, []);

  const handleAddExpense = async () => {
    try {
      if (!user) {
        console.warn('User not authenticated.');
        return;
      }

      await addDoc(collection(db, 'Despesas'), {
        dataAtual: serverTimestamp(),
        paid: false,
        despesa: expense,
        dataVencimento: dueDate,
        valor: amount,
        userId: user.uid,
      });

      setExpense('');
      setDueDate(new Date());
      setAmount('');

      Alert.alert('Sucesso', 'Despesa adicionada com sucesso!');
    } catch (error) {
      console.error('Error adding expense: ', error);
      Alert.alert('Erro', 'Ocorreu um erro ao adicionar a despesa. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <HeaderTitle
     title={''} 
      />
      <Title 
      text={'Lançar Despesas'}
      />
      <Text>Categoria Despesa</Text>
      <Picker
        selectedValue={expense}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setExpense(itemValue)}
      >
        {despesaNames.map((name, index) => (
          <Picker.Item key={index} label={name} value={name} />
        ))}
      </Picker>
      <Text>Data Vencimento</Text>
      <DateInput
        date={dueDate}
        onChange={setDueDate}
      />
      <Text>Valor</Text>
      <CurrencyInput
        value={amount}
        onChange={(setAmount)}
      />
      <ButtonsAll 
        title={'Adicionar Despesa'}
        onPress={handleAddExpense}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: 200,
  },
});

export default AddExpense;
