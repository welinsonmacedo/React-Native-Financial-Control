import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



const BalanceScreen = () => {


  return (
    <>
      <View style={styles.ContainerLogin}>
        <Text style={styles.TextTitle} >Saldo Atual:</Text>
        <Text style={styles.Text}>R$ (Em desenvolvimento)</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({

  TextTitle: {
    fontWeight: '800',
    color: '#32CD32',
    fontSize: 30,
    marginBottom: 70,
  },
  ContainerLogin: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  Text:{
    color:'blue',
  }
});

export default BalanceScreen ;
