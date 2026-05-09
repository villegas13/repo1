import { FlatList, View } from "react-native";

import MessageSimple from "../hooks/chat/MessageSimple";

// Prueba esta ruta primero (asumiendo que 'src' está en la raíz)
import { useChatMessages } from "../hooks/chat/useChatMessages"; // Ajusta esta ruta según tu estructura real






const ChatRoomScreen = ({ route }) => {

  const { chatroom_id, currentUserId } = route.params;
  const { messages } = useChatMessages(chatroom_id);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages}
        inverted
        renderItem={({ item }) => <MessageSimple message={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ChatRoomScreen;
