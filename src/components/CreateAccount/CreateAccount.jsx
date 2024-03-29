import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <>
      <View style={styles.loginTitle}>
        <Text style={styles.TextTitle}>CaixaEficiente App</Text>
        <Image source={require('../../../assets/logo.png')} />
      </View>
      <View style={styles.ContainerLogin}>
        <Text>Cadasto Novo Usuario</Text>
        <TextInput
          placeholder='User'
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder='Password'
          style={styles.input}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Button title='Cadastrar' onPress={handleLogin} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loginTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
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
  input: {
    backgroundColor: '#F0F8FF',
    height: 50,
    width: 300,
    marginBottom: 20,
    marginTop: 30,
  },
});

export default CreateAccount ;
