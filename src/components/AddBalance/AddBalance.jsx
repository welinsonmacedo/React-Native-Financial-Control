import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { db ,auth} from '../../services/firebaseConfig';

// Initialize Firebase


const AddBalance = () => {
  // Estado para armazenar os dados do novo saldo
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  // Função para lidar com o cadastro do saldo
  const handleAddBalance = async () => {
    try {
      // Adquira o usuário autenticado
      const user = auth.currentUser;

      // Verifique se o usuário está autenticado
      if (!user) {
        console.warn('User not authenticated.');
        return;
      }

      // Adquira a data atual
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      // Adicione um novo saldo à coleção "Balances" no Firestore
      await addDoc(collection(db, 'Balance'), {
        data: formattedDate,
        descricao: description,
        valor: amount,
        userId: user.uid, // Add user ID to the balance document
      });

      // Limpe os campos de entrada após adicionar o saldo
      setDescription('');
      setAmount('');

      // Exiba uma mensagem de sucesso ou navegue para outra tela, se necessário
      alert('Saldo adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar saldo: ', error);
      alert('Ocorreu um erro ao adicionar o saldo. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Lancar Saldo</Text>
      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        placeholder="Valor"
        style={styles.input}
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
      />
      <Button title="Adicionar Saldo" onPress={handleAddBalance} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: 300,
  },
});

export default AddBalance;
