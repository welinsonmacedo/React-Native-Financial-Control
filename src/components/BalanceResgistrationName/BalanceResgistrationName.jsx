import React, { useState, useEffect } from 'react';
import { View, Text ,TextInput, Button, Alert, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, addDoc, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig'; 
import DeleteButton from '../Buttons/DeleteButton';
import HeaderTitle from '../HeaderTitle/HeaderTitle';

const BalanceResgistrationName = () => {
  const [nomeSaldo, setNomeSaldo] = useState('');
  const [saldos, setSaldos] = useState([]);

  useEffect(() => {
    fetchSaldos();
  }, []);

  const fetchSaldos = async () => {
    const saldosCollection = query(collection(db, 'BalanceName'), orderBy('nome'));
    const snapshot = await getDocs(saldosCollection);
    const saldosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSaldos(saldosData);
  };

  const handleCadastro = async () => {
    if (nomeSaldo.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira um nome para o saldo.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'BalanceName'), { nome: nomeSaldo.trim() });
      console.log('Documento cadastrado com ID: ', docRef.id);
      Alert.alert('Sucesso', 'Nome do saldo cadastrado com sucesso!');
      setNomeSaldo('');
      fetchSaldos(); // Atualiza a lista de saldos após o cadastro
    } catch (error) {
      console.error('Erro ao cadastrar nome do saldo: ', error);
      Alert.alert('Erro', 'Houve um erro ao cadastrar o nome do saldo. Por favor, tente novamente mais tarde.');
    }
  };

  const handleDeleteSaldo = async (id) => {
    try {
      await deleteDoc(doc(db, 'BalanceName', id));
      console.log('Saldo excluído com sucesso!');
      Alert.alert('Sucesso', 'Saldo excluído com sucesso!');
      fetchSaldos(); // Atualiza a lista de saldos após a exclusão
    } catch (error) {
      console.error('Erro ao excluir saldo: ', error);
      Alert.alert('Erro', 'Houve um erro ao excluir o saldo. Por favor, tente novamente mais tarde.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.saldoItem}>
      <Text>{item.nome}</Text>
      <DeleteButton onPress={() => handleDeleteSaldo(item.id)}/>
    </View>
  );

  return (
    <>
    <HeaderTitle text=''/>
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome do saldo"
          value={nomeSaldo}
          onChangeText={setNomeSaldo}
        />
        <Button title="Cadastrar" onPress={handleCadastro} />
      </View>
      <FlatList
        data={saldos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
    
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  saldoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
});

export default BalanceResgistrationName;
