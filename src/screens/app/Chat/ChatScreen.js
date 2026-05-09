import React, { useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useChatRooms } from "../../../../hooks/chat/useChatRooms";
import ChatRoomList from "./ChatRoomList";

const ChatScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");

  // Obtenemos las salas reales del hook
  const { rooms, loading } = useChatRooms();

  const handleChatPress = (chat) => {
    // Navegamos a 'ChatRoom' pasando los parámetros requeridos
    navigation.navigate("ChatRoom", {
      chatroom_id: chat.id,
      roomName: chat.name,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-6">
        <Text className="text-3xl font-extrabold text-gray-900">Mensajes</Text>

        {/* Barra de Búsqueda */}
        <View className="mt-4 bg-gray-100 rounded-xl px-4 py-2">
          <TextInput
            placeholder="Buscar contactos..."
            value={search}
            onChangeText={setSearch}
            className="text-base"
          />
        </View>
      </View>

      {/* Lista de Chats */}
      <View className="flex-1">
        {loading ? (
          <ActivityIndicator size="large" color="#f4511e" className="mt-10" />
        ) : (
          <ChatRoomList
            chatData={rooms.filter((c) =>
              c.name.toLowerCase().includes(search.toLowerCase()),
            )}
            onChatPress={handleChatPress}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
