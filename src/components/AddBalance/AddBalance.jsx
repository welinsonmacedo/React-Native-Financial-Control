import React, { useState, useEffect } from 'react';
import { View, Text,  StyleSheet, Picker } from 'react-native';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../services/firebaseConfig';
import HeaderTitle from '../HeaderTitle/HeaderTitle';
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import ButtonsAll from '../Buttons/ButtonsALL';
import AlertModal from '../AlertModal/AlertModal'; 
import Title from '../Title/Title'


const AddBalance = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [balanceNames, setBalanceNames] = useState([]); 
  const [showAlert, setShowAlert] = useState(false); 
  const [alertMessage, setAlertMessage] = useState(''); 
  const user = auth.currentUser;

  useEffect(() => {
 
    const fetchBalanceNames = async () => {
      const querySnapshot = await getDocs(collection(db, 'BalanceName'));
      const names = querySnapshot.docs.map(doc => doc.data().nome);
      setBalanceNames(names);
    };

    fetchBalanceNames();
  }, []);

  const handleAddBalance = async () => {
    try {
      if (!user) {
        console.warn('User not authenticated.');
        return;
      }

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      await addDoc(collection(db, 'Balance'), {
        data: formattedDate,
        descricao: description,
        valor: amount,
        userId: user.uid,
      });

      setDescription('');
      setAmount('');

     
      setShowAlert(true);
      setAlertMessage('Saldo adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar saldo: ', error);
   
      setShowAlert(true);
      setAlertMessage('Ocorreu um erro ao adicionar o saldo. Por favor, tente novamente.');
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Title text={'Lançar Saldos'} />
      <View style={styles.container}>
        <HeaderTitle title='' />
        <Text>Categoria Saldo</Text>
        <Picker
          selectedValue={description}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => setDescription(itemValue)}
        >
          {balanceNames.map((name, index) => (
            <Picker.Item key={index} label={name} value={name} />
          ))}
        </Picker>
        <Text>Valor</Text>
        <CurrencyInput
          value={amount}
          onChange={setAmount}
        />
        <ButtonsAll title={'Lançar Saldo'} onPress={handleAddBalance} />
      </View>
     
      <AlertModal visible={showAlert} message={alertMessage} onClose={handleCloseAlert} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    padding: 50,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: 200,
  },
});

export default AddBalance;
