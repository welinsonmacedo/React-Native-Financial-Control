import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../pages/home/home.jsx';
import Expense from '../pages/expense/expense.jsx';
import AddExpense from '../components/AddExpense/AddExpense.jsx'
import ExpenseList from '../components/ExpenseList/ExpenseList.jsx'
import Balance from '../pages/balances/balances.jsx'
import AddBalance from '../components/AddBalance/AddBalance.jsx'
import BalanceHistory from '../components/BalanceHistory/BalanceHistory.jsx';
import ResetPassword from '../components/SendPasswordResetEmail/SendPasswordResetEmail.jsx'


const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
    
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Expense" component={Expense} />
      <Stack.Screen name="AddExpense" component={AddExpense} />
      <Stack.Screen name="ExpenseList" component={ExpenseList} />
      <Stack.Screen name="Balance" component={Balance} />
      <Stack.Screen name="AddBalance" component={AddBalance} />
      <Stack.Screen name="BalanceHistory" component={BalanceHistory} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
     
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
