import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import BalanceScreen from '../../components/BalanceScreen/BalanceScreen';
import { useNavigation } from '@react-navigation/native';



const Home = () => {
  const navigation = useNavigation();

  const handleExpensePress = () => {
    navigation.navigate('Expense');
  };

  const handleSaldosPress = () => {
    navigation.navigate('Saldos');
  };

  const handleCadastrosPress = () => {
    navigation.navigate('Cadastros');
  };
  return (
    <>
      <View style={styles.ContainerHome}>

        <Text style={styles.TextTitle}>Caixa Eficiente </Text>
      </View>

      <View>
        <TouchableOpacity style={styles.button}
        onPress={handleExpensePress}
         >
          <Text style={styles.buttonText}>Despesas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Saldos ( Em desenvolvimento)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cadastros(Em desenvolvimento)</Text>
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

export default Home
