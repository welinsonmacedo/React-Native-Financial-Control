import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../pages/home/home.jsx';
import Expense from '../pages/expense/expense.jsx';
import AddExpense from '../components/AddExpense/AddExpense.jsx'
import ExpenseList from '../components/ExpenseList/ExpenseList.jsx'


const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Expense" component={Expense} />
      <Stack.Screen name="AddExpense" component={AddExpense} />
      <Stack.Screen name="ExpenseList" component={ExpenseList} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
