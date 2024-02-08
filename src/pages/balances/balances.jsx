import { Text, View, StyleSheet, Pressable } from 'react-native';
import BalanceScreen from '../../components/BalanceScreen/BalanceScreen';
import { useNavigation } from '@react-navigation/native';
import CopyrightNotice from '../../components/Copyright/Copyright'


const Balance = () => {
  const navigation = useNavigation();

  const handleAddBalancePress = () => {
    navigation.navigate('AddBalance');
  };
  const handleBalanceHistoryPress = () => {
    navigation.navigate('BalanceHistory');
  };

  return (
    <>
      <View style={styles.ContainerHome}>
        <Text style={styles.TextTitle}>Saldos </Text>
      </View>

      <View>
        <Pressable
          style={styles.button}
          onPress={handleAddBalancePress}
          role="button" // Adicionando role para acessibilidade
        >
          <Text style={styles.buttonText}>Lancar Saldo</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={handleBalanceHistoryPress}
          role="button" // Adicionando role para acessibilidade
        >
          <Text style={styles.buttonText}>Historico saldos</Text>
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

export default Balance;
