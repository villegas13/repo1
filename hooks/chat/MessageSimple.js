import { StyleSheet, Text, View } from "react-native";

const MessageSimple = ({ message, isMine }) => {
  // Si el mensaje no tiene texto real, no renderizamos la burbuja
  if (!message.text || message.text.trim() === "") return null;

  return (
    <View
      style={[
        styles.container,
        isMine ? styles.myContainer : styles.theirContainer,
      ]}
    >
      <View style={[styles.card, isMine ? styles.myCard : styles.theirCard]}>
        {!isMine && (
          <Text style={styles.username}>{message.profiles?.username || "Usuario"}</Text>
        )}
        <Text style={[styles.body, isMine && styles.myText]}>
          {message.text}
        </Text>
        <Text style={[styles.time, isMine && styles.myText]}>
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    width: "100%",
  },
  myContainer: {
    alignItems: "flex-end",
  },
  theirContainer: {
    alignItems: "flex-start",
  },
  card: {
    borderRadius: 8,
    padding: 10,
    maxWidth: "80%",
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 3,
  },
  myCard: {
    backgroundColor: "#007AFF",
    borderBottomRightRadius: 2,
  },
  theirCard: {
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 2,
  },
  body: {
    fontSize: 15,
    color: "#333",
  },
  myText: {
    color: "#fff",
  },
  username: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 2,
  },
  time: {
    fontSize: 10,
    color: "#999",
    marginTop: 5,
    textAlign: "right",
  },
});

export default MessageSimple;
