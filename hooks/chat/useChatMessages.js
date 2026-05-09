import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export const useChatMessages = (chatroom_id) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!chatroom_id) return;

    // 1. Cargar mensajes iniciales con el nombre del perfil
    const fetchMessages = async () => {
      // alert("fetching messages: " +  error.message);

      const { data, error } = await supabase
        .from("messages")
        .select("*, profiles(username)")
        .eq("chatroom_id", chatroom_id)
        .order("created_at", { ascending: false });

      if (error) console.error("❌ Error al cargar:", error.message);
      else setMessages(data || []);
    };

    fetchMessages();

    // 2. Suscripción en tiempo real
    const channel = supabase
      .channel(`room-${chatroom_id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `chatroom_id=eq.${chatroom_id}`,
        },
        async (payload) => {
          // 1. Añadimos el mensaje inmediatamente para una UI reactiva
          setMessages((current) => {
            if (current.some((m) => m.id === payload.new.id)) return current;
            return [payload.new, ...current];
          });

          // 2. Buscamos el perfil en segundo plano para completar la información
          const { data: profile } = await supabase
            .from("profiles")
            .select("username")
            .eq("id", payload.new.sender_id)
            .single();

          if (profile) {
            setMessages((current) =>
              current.map((m) =>
                m.id === payload.new.id ? { ...m, profiles: profile } : m,
              ),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatroom_id]);

  return { messages };
};
