import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const HeaderTitle = ({ title, user }) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: user ? null : title,
    });
  }, [navigation, title, user]);

  return null; // Este componente não renderiza nada visível na interface do usuário
};

export default HeaderTitle;
