import { Text, View, StyleSheet, Button,TouchableOpacity } from 'react-native';
import BalanceScreen from '../../components/BalanceScreen/BalanceScreen';
import { useNavigation } from '@react-navigation/native';


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
        <TouchableOpacity style={styles.button}
        onPress={handleAddExpensePress}
        >
          <Text style={styles.buttonText}>Lancar Nova Despesa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
         onPress={handleAddExpenseListPress}
        >
          <Text style={styles.buttonText}>Pagar Despesas</Text>
        </TouchableOpacity>
       
      </View>
      <View>
        <BalanceScreen></BalanceScreen>
      </View>
    </>


  )
}
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
  ButtonHome: {
    backgroundColor: 'black',
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

})

export default Expense