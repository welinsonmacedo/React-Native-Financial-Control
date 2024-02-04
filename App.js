import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AppNavigator from './src/services/AppNavigator';
import Login from './src/components/Login/Login';
import firebaseConfig from './src/services/firebaseConfig';
firebaseConfig

const App = () => {
 
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });

    return () => unsubscribe();
  }, [initializing]);

  if (initializing) {
    return null;
  }

  return (
    <>
      {user ? <AppNavigator /> : <Login setUser={setUser} />}
    </>
  );
};



export default App;
