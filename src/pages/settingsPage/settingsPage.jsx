import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
//Components//
import UserProfile from '../../components/UserProfile/UserProfile';
import ButtonsAll from '../../components/Buttons/ButtonsALL';
import CopyrightNotice from '../../components/Copyright/Copyright';
import Title from '../../components/Title/Title'
const SettingsPage = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(false);



  const handleExpenseRegistrationNamePress = () => {
    navigation.navigate('ExpenseRegistrationName');
  };
  const handleBalanceRegistrationNamePress = () => {
    navigation.navigate('BalanceRegistrationName');
  };


  return (
    <>
      <HeaderTitle title='' />
      <Title text={'Configurações'} />
      <UserProfile />
      <ButtonsAll onPress={handleExpenseRegistrationNamePress} title={'Cadastro Categoria Despesas'} />
      <ButtonsAll onPress={handleBalanceRegistrationNamePress} title={'Cadastro Categoria Saldos'} />
      <CopyrightNotice />
    </>
  );
};



export default SettingsPage;
