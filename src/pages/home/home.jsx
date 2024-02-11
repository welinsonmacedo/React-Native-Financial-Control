import React, { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


//Components//

import Logout from '../../components/Logout/Logout'
import UserProfile from '../../components/UserProfile/UserProfile'
import SettingsButton from '../../components/Buttons/SettingsButton';
import ExpenseScreen from '../../components/ExpenseScreen/ExpenseScreen';
import ButtonsAll from '../../components/Buttons/ButtonsALL';
import CopyrightNotice from '../../components/Copyright/Copyright'
import BalanceScreen from '../../components/BalanceScreen/BalanceScreen';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import Title from '../../components/Title/Title';
/////////////////////


const Home = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(false);



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
      <HeaderTitle title={''} />
      <Title text={'GerenteFinanceiro '} />
      <SettingsButton />
      <View style={styles.ContainerMain}>
        <ButtonsAll onPress={handleExpensePress} title={'Despesas'} />

        <ButtonsAll onPress={handleBalancePress} title={'Receitas'} />

      </View>

      <View>

        <BalanceScreen />
        <ExpenseScreen />
        <CopyrightNotice />
      </View>
      <View>
        <Logout />
      </View>
      <View>
        < UserProfile />
      </View>
    </>


  )
}
const styles = StyleSheet.create({

  ContainerMain: {
    flexDirection: 'row',
    width: '100%',
    gap: 30,
    justifyContent: 'center',
    padding: 20,
  }


});


export default Home
