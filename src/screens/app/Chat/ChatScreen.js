import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChatRoomList from '../../../../src/components/ChatRoomList'; // Path from my-chat-app/src/screens/app/Chat to my-app/src/components

const ChatScreen = ({ navigation }) => {
  const handleRoomPress = (room) => {
    // Asegurarse de que el objeto 'room' contenga 'id' y 'name'
    if (room && room.id) {
      navigation.navigate('ChatRoom', { 
        chatroom_id: room.id, 
        roomName: room.name 
      });
    } else {
      console.warn("Se intentó navegar con un objeto de sala inválido:", room);
    }
  };

  return (
    <View style={styles.container}>
      <ChatRoomList onRoomPress={handleRoomPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default ChatScreen;