import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async () => {
    setLoading(true);

    if (isSignUp) {
      if (!username.trim()) {
        Alert.alert("Error", "El nombre de usuario es obligatorio");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          },
        },
      });

      if (error) {
        console.error("Signup Error:", error);
        Alert.alert("Error de registro", error.message);
      } else if (data.user) {
        // Insertar en la tabla profiles vinculando con el ID de Auth
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([{ id: data.user.id, username: username }]);

        if (profileError) {
          console.error("Error al crear perfil:", profileError.message);
        }
        Alert.alert("Éxito", "Revisa tu correo para confirmar la cuenta");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("Login Error:", error);
        Alert.alert(
          "Error de acceso",
          "Credenciales incorrectas o usuario no confirmado.",
        );
      }
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isSignUp ? "Crear Cuenta" : "Bienvenido"}
      </Text>

      {isSignUp && (
        <TextInput
          placeholder="Nombre de usuario"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
      )}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <View style={{ marginTop: 10 }}>
        <Button
          title={
            loading ? "Procesando..." : isSignUp ? "Registrarse" : "Entrar"
          }
          onPress={handleAuth}
          disabled={loading}
        />
      </View>

      <TouchableOpacity
        onPress={() => setIsSignUp(!isSignUp)}
        style={styles.switchBtn}
      >
        <Text style={styles.switchText}>
          {isSignUp
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Regístrate"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  switchBtn: { marginTop: 20, alignItems: "center" },
  switchText: { color: "#007AFF", fontWeight: "500" },
});
