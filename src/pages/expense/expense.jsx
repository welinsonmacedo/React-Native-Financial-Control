import { Text, View, StyleSheet, Pressable } from 'react-native';
import BalanceScreen from '../../components/BalanceScreen/BalanceScreen';
import { useNavigation } from '@react-navigation/native';
import CopyrightNotice from '../../components/Copyright/Copyright'

const Expense = () => {
  const navigation = useNavigation();

  const handleAddExpensePress = () => {
    navigation.navigate('AddExpense');
  };
  const handleAddExpenseListPress = () => {
    navigation.navigate('ExpenseList');
  };

  return (
    <>
      <View style={styles.ContainerHome}>
        <Text style={styles.TextTitle}>Despesas </Text>
      </View>

      <View>
        <Pressable
          style={styles.button}
          onPress={handleAddExpensePress}
          role="button" // Adicionando role para acessibilidade
        >
          <Text style={styles.buttonText}>Lançar Nova Despesa</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={handleAddExpenseListPress}
          role="button" // Adicionando role para acessibilidade
        >
          <Text style={styles.buttonText}>Pagar Despesas</Text>
        </Pressable>
      </View>
      <View>
        <BalanceScreen></BalanceScreen>
        <CopyrightNotice></CopyrightNotice>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  ContainerHome: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  TextTitle: {
    fontWeight: '800',
    color: '#fff',
    fontSize: 30,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Expense;
