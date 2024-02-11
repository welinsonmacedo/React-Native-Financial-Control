import { Text, View, StyleSheet, Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';

//Components//
import CopyrightNotice from '../../components/Copyright/Copyright'
import ButtonsAll from '../../components/Buttons/ButtonsALL';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import BalanceScreen from '../../components/BalanceScreen/BalanceScreen';
import Title from '../../components/Title/Title'
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
      <HeaderTitle title='' />
      <Title text={'Receitas'} />
      <ButtonsAll onPress={handleAddBalancePress} title={'Lançar Saldo'} />
      <ButtonsAll onPress={handleBalanceHistoryPress} title={'Historico saldos'} />
      <BalanceScreen></BalanceScreen>
      <CopyrightNotice></CopyrightNotice>

    </>
  );
};


export default Balance;
