import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from "firebase/auth";


const Login = () => {
 


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const auth = getAuth();

    try {
      // Configurando a persistência local do navegador para "LOCAL"
      await setPersistence(auth, browserLocalPersistence);
      
      // Realizando o login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Signed in
      window.alert('Login Realizado');
      const user = userCredential.user;
      // ...
    } catch (error) {
      window.alert('Senha errada');
     
    }
  };

  return (
    <>
      <View style={styles.loginTitle}>
        <Text style={styles.TextTitle}>CaixaEficiente App</Text>
        <Image source={require('../../../assets/logo.png')} />
      </View>
      <View style={styles.ContainerLogin}>
        <Text>Login</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}  activeOpacity={0.7} >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loginTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    fontWeight: '900',
  },
  TextTitle: {
    fontWeight: '900',
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
    backgroundColor: '#D0ECE7',
    borderRadius:10,
    height: 50,
    width: 300,
    marginBottom: 20,
    marginTop: 30,
    paddingLeft:30,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width:200,
   
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign:'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
    textDecorationLine: 'none',
  },
});

export default Login;
