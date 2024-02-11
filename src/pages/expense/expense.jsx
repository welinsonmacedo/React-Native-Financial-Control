import { Text, View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Components//
import CopyrightNotice from '../../components/Copyright/Copyright'
import ButtonsAll from '../../components/Buttons/ButtonsALL';
import HeaderTitle from '../../components/HeaderTitle/HeaderTitle';
import BalanceScreen from '../../components/BalanceScreen/BalanceScreen';
import Title from '../../components/Title/Title'

const Expense = () => {
  const navigation = useNavigation();

  const handleAddExpensePress = () => {
    navigation.navigate('AddExpense');
  };
  const handleAddExpenseListPress = () => {
    navigation.navigate('ExpenseList');
  };
  const handlePaidExpensesListPress = () => {
    navigation.navigate('PaidExpensesList');
  };

  return (
    <>
      <HeaderTitle title='' />
      <Title text={'Despesas'} />
      <ButtonsAll onPress={handleAddExpensePress} title={'Lançar Nova Despesa'} />
      <ButtonsAll onPress={handleAddExpenseListPress} title={'Pagar Despesas'} />
      <ButtonsAll onPress={handlePaidExpensesListPress} title={'Despesas Pagas'} />
      <BalanceScreen></BalanceScreen>
      <CopyrightNotice></CopyrightNotice>
    </>
  );
};



export default Expense;
