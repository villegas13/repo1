import React, { useEffect, useState, useLayoutEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { supabase } from "../../../../lib/supabase";

// Subimos 3 niveles para llegar a 'src' y luego bajamos a 'hooks' y 'components'
import InputChatBox from "../../../../components/InputChatBox"; // Este se queda igual si está en la misma carpeta
import MessageSimple from "../../../../hooks/chat/MessageSimple";
import { useChatMessages } from "../../../../hooks/chat/useChatMessages";

const ChatRoomScreen = ({ route, navigation }) => {
  // 1. Obtener chatroom_id de los parámetros de navegación (enviado desde ChatScreen)
  const chatroom_id = route.params?.chatroom_id;
  const roomName = route.params?.roomName;
  const [currentUserId, setCurrentUserId] = useState(null);

  // Establecer el título de la sala en la cabecera
  useLayoutEffect(() => {
    navigation.setOptions({
      title: roomName || "Chat en Vivo",
    });
  }, [navigation, roomName]);

  // 2. Obtener el ID del usuario actual para permitir el envío y distinguir mis mensajes
  useEffect(() => {
    const getUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setCurrentUserId(user.id);
    };
    getUserId();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setCurrentUserId(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 3. Obtener mensajes y activar la escucha en tiempo real
  const { messages } = useChatMessages(chatroom_id);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        inverted
        renderItem={({ item }) => (
          <MessageSimple
            message={item}
            isMine={item.sender_id === currentUserId}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
      <InputChatBox chatroom_id={chatroom_id} currentUserId={currentUserId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  listContent: { paddingHorizontal: 10, paddingVertical: 20 },
});

export default ChatRoomScreen;
