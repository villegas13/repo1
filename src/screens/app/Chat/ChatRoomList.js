import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

const ChatRoomList = ({ chatData, onChatPress }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onChatPress(item)}
      className="flex-row items-center p-4 border-b border-gray-100 active:bg-gray-50"
    >
      {/* Avatar */}
      <View className="relative">
        <Image
          source={{
            uri:
              item.avatar ||
              `https://ui-avatars.com/api/?name=${item.name}&background=random`,
          }}
          className="w-14 h-14 rounded-full"
        />
        {item.online && (
          <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
        )}
      </View>

      {/* Contenido del Mensaje */}
      <View className="flex-1 ml-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
          <Text className="text-xs text-gray-500">{item.time || ""}</Text>
        </View>
        <Text
          numberOfLines={1}
          className={`text-sm ${item.unread ? "font-semibold text-black" : "text-gray-500"}`}
        >
          {item.lastMessage || "Toca para empezar a chatear..."}
        </Text>
      </View>

      {/* Indicador de No Leídos */}
      {item.unread > 0 && (
        <View className="bg-blue-500 rounded-full px-2 py-1 ml-2">
          <Text className="text-white text-xs font-bold">{item.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={chatData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ChatRoomList;
