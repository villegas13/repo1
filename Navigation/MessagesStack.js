import { supabase } from "@/lib/supabase";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity } from "react-native";

// 1. Corregimos las rutas para que ambas apunten a la carpeta de screens
import ChatScreen from "@/src/screens/app/Chat/ChatScreen";
import ChatRoomScreen from "../src/screens/app/Chat/ChatRoomScreen"; // Usamos la versión completa con InputChatBox

const Stack = createStackNavigator();

export const MessagesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Chats"
      screenOptions={{
        headerStyle: { backgroundColor: "#f4511e" }, // Opcional: un poco de estilo
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Chats"
        component={ChatScreen}
        options={{
          title: "Mis Mensajes",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => supabase.auth.signOut()}
              style={{ marginRight: 15 }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Salir</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{ title: "Chat en Vivo" }}
      />
    </Stack.Navigator>
  );
};
