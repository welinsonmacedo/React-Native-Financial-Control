import React, { useState, useEffect } from 'react';
import { View, Text ,TextInput, Button, Alert, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, addDoc, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig'; 
import DeleteButton from '../Buttons/DeleteButton';
import HeaderTitle from '../HeaderTitle/HeaderTitle'
const ExpenseRegistrationName = () => {
  const [nomeDespesa, setNomeDespesa] = useState('');
  const [despesas, setDespesas] = useState([]);

  useEffect(() => {
    fetchDespesas();
  }, []);

  const fetchDespesas = async () => {
    const despesasCollection = query(collection(db, 'DespesaName'), orderBy('nome'));
    const snapshot = await getDocs(despesasCollection);
    const despesasData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDespesas(despesasData);
  };

  const handleCadastro = async () => {
    if (nomeDespesa.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira um nome para a despesa.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'DespesaName'), { nome: nomeDespesa.trim() });
      console.log('Documento cadastrado com ID: ', docRef.id);
      Alert.alert('Sucesso', 'Nome da despesa cadastrado com sucesso!');
      setNomeDespesa('');
      fetchDespesas(); // Atualiza a lista de despesas após o cadastro
    } catch (error) {
      console.error('Erro ao cadastrar nome da despesa: ', error);
      Alert.alert('Erro', 'Houve um erro ao cadastrar o nome da despesa. Por favor, tente novamente mais tarde.');
    }
  };

  const handleDeleteDespesa = async (id) => {
    try {
      await deleteDoc(doc(db, 'DespesaName', id));
      console.log('Despesa excluída com sucesso!');
      Alert.alert('Sucesso', 'Despesa excluída com sucesso!');
      fetchDespesas(); // Atualiza a lista de despesas após a exclusão
    } catch (error) {
      console.error('Erro ao excluir despesa: ', error);
      Alert.alert('Erro', 'Houve um erro ao excluir a despesa. Por favor, tente novamente mais tarde.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.despesaItem}>
      <Text>{item.nome}</Text>
      <DeleteButton onPress={() => handleDeleteDespesa(item.id)}/>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderTitle text=''/>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome da despesa"
          value={nomeDespesa}
          onChangeText={setNomeDespesa}
        />
        <Button title="Cadastrar" onPress={handleCadastro} />
      </View>
      <FlatList
        data={despesas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
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
  despesaItem: {
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

export default ExpenseRegistrationName;
