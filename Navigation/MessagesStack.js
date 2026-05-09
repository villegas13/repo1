import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';
import { supabase } from '@/lib/supabase';

// 1. Corregimos las rutas para que ambas apunten a la carpeta de screens
// Subimos un nivel (fuera de Navigation) y entramos a screens/app/Chat/
import ChatScreen from '@/src/screens/app/Chat/ChatScreen';
import ChatRoomScreen from '../../../../src/components/ChatRoomScreen'; // Apunta a la versión funcional en my-app/src/components

const Stack = createStackNavigator();

export const MessagesStack = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Chats"
      screenOptions={{
        headerStyle: { backgroundColor: '#f4511e' }, // Opcional: un poco de estilo
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen 
        name="Chats" 
        component={ChatScreen} 
        options={{ 
          title: 'Mis Mensajes',
          headerRight: () => (
            <TouchableOpacity onPress={() => supabase.auth.signOut()} style={{ marginRight: 15 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Salir</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen 
        name="ChatRoom" 
        component={ChatRoomScreen} 
        options={{ title: 'Chat en Vivo' }}
      />
    </Stack.Navigator>
  );
};