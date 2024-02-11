import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../services/firebaseConfig';

const ExpenseScreen = () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                if (!auth.currentUser) {
                    console.warn('Usuário não autenticado.');
                    return;
                }

                const userId = auth.currentUser.uid;
                
                // Consulta as despesas não pagas do usuário atual
                const expenseScreenQuery = query(
                    collection(db, 'Despesas'),
                    where('paid', '==', false),
                    where('userId', '==', userId)
                );

                const unsubscribe = onSnapshot(expenseScreenQuery, (snapshot) => {
                    let totalValue = 0;
                    snapshot.forEach((doc) => {
                        totalValue += parseFloat(doc.data().valor || 0);
                    });
                    setValue(totalValue);
                });

                // Retorne a função de limpeza para cancelar a inscrição do ouvinte de snapshot
                return () => unsubscribe();
            } catch (error) {
                console.error('Erro ao buscar os dados:', error);
            }
        };

        fetchExpense();

        // Função de limpeza para desmontar
        return () => {};
    }, []); // Array de dependência vazio para executar apenas uma vez quando montado

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Despesas não pagas</Text>
            <Text style={styles.balanceText}>{`R$ ${value.toFixed(2)}`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 16,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    balanceText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00FF7F',
    },
});

export default ExpenseScreen;
