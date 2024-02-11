import React from 'react';
import {  View,  Pressable ,StyleSheet,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsButton = () => {
  const navigation = useNavigation();

  const handleSettingsPress = () => {
    navigation.navigate('SettingsPage');
  };
  return (

    <View>
      <Pressable style={styles.button} onPress={handleSettingsPress} role="button" >
        <Image style={styles.icon} source={require('../../../assets/icons8-configurações-64.png')}/>
       
      </Pressable>
    </View>

  );
};

export default SettingsButton;
const styles = StyleSheet.create({

  icon: {
    width: 32, 
    height: 32, 
  },
  button: {
    backgroundColor: 'transparent',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },

})