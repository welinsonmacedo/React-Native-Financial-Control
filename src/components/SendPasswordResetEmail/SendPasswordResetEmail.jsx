import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';


const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState(null);
  const auth = getAuth();
 

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setError(null);
    } catch (error) {
      console.error('Erro ao enviar e-mail de redefinição de senha:', error.message);
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redefinir Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        onChangeText={(text) => setEmail(text)}
      />
      {resetSent ? (
        <Text style={styles.successMessage}>
          Um e-mail de redefinição de senha foi enviado para o endereço fornecido.
        </Text>
      ) : (
        <Button title="Enviar E-mail de Redefinição" onPress={handleResetPassword} />
      )}
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      <Button title="Voltar para Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  successMessage: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});

export default ResetPassword;
