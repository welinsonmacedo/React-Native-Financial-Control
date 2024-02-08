import { Text, View, StyleSheet, Pressable } from 'react-native';
import BalanceScreen from '../../components/BalanceScreen/BalanceScreen';
import { useNavigation } from '@react-navigation/native';
import CopyrightNotice from '../../components/Copyright/Copyright'
import Logout from '../../components/Logout/Logout'
import UserProfile from '../../components/UserProfile/UserProfile'

const Home = () => {
  const navigation = useNavigation();

  const handleExpensePress = () => {
    navigation.navigate('Expense');
  };

  const handleBalancePress = () => {
    navigation.navigate('Balance');
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
        <Pressable style={styles.button} onPress={handleExpensePress}  role="button">
          <Text style={styles.buttonText}>Despesas</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleBalancePress}  role="button">
          <Text style={styles.buttonText}>Saldos</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleCadastrosPress}  role="button">
          <Text style={styles.buttonText}>(Em desenvolvimento)</Text>
        </Pressable>
      </View>
      <View>
        <BalanceScreen></BalanceScreen>
        <CopyrightNotice></CopyrightNotice>
      </View>
      <View>
        <Logout></Logout>
      </View>
      <View>
        < UserProfile></UserProfile>
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
