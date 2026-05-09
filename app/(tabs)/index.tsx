import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
// Eliminamos NavigationContainer porque Expo Router ya lo gestiona
import { MessagesStack } from 'Navigation/MessagesStack';
import AuthScreen from '../../components/AuthScreen';
import { supabase } from '@/lib/supabase';

export default function HomeScreen() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Comprobar sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#007AFF" /></View>;
  }

  return (
    <View style={styles.container}>
      {session ? <MessagesStack /> : <AuthScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Es vital que el contenedor ocupe toda la pantalla
  },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});