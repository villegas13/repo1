import React, { useState } from "react";
import { Button, TextInput, View, Alert, ActivityIndicator } from "react-native";
import { chatService } from "../src/services/chatService";



const InputChatBox = ({ chatroom_id, currentUserId }) => {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {

    
    if (!text.trim()) return;

    if (!currentUserId) {
      Alert.alert("Error", "No se detectó una sesión de usuario activa.");
      return;
    }

    if (!chatroom_id) {
      Alert.alert("Error", "ID de sala no válido.");
      return;
    }

    

    // Prevenir el envío a salas con IDs de prueba (no UUIDs válidos para la DB)
    if (chatroom_id && chatroom_id.toString().startsWith('default-')) {
      Alert.alert("Error de Sala", "No puedes enviar mensajes a salas de prueba. Por favor, selecciona una sala creada en la base de datos.");
      return;
    }

    setSending(true);

    const { error } = await chatService.sendMessage(
      chatroom_id,
      currentUserId,
      text.trim()
    );

    if (error) {
      console.error("Error al enviar mensaje:", error); // Log the full error for debugging
      Alert.alert(
        "Error al enviar",
        "No se pudo enviar el mensaje. Asegúrate de que la sala exista en la base de datos y que tengas permisos. Error: " + error.message
      );
    } else {
      setText(""); // Limpiamos el campo tras el éxito
    }
    setSending(false);
  };

  return (
    <View style={{ flexDirection: "row", padding: 10, backgroundColor: '#fff' }}>
      <TextInput
        value={text}
        onChangeText={setText}
        style={{
          flex: 1,
          borderWidth: 1,
          borderRadius: 20,
          paddingHorizontal: 15,
          marginRight: 10,
          height: 40
        }}
        placeholder="Escribe un mensaje..."
        editable={!sending}
      />
      {sending ? (
        <ActivityIndicator size="small" color="#007AFF" style={{ paddingHorizontal: 10 }} />
      ) : (
        <Button
          title="Enviar"
          onPress={handleSend}
          disabled={!text.trim()} 
        />
      )}
    </View>
  );
};

export default InputChatBox;