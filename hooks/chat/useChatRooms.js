// src/hooks/chat/useChatRooms.js
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

// Fíjate en el "export const"
export const useChatRooms = () => {
  const [rooms, setRooms] = useState([
    { id: "1", name: "Sala General Profesional" },
    { id: "2", name: "Desarrollo Web" },
    { id: "3", name: "Videojuegos" },
    { id: "4", name: "Cine y Series" },
    { id: "5", name: "Música" },
  ]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("chatrooms")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Error al obtener salas:", error.message);
    } else {
      console.log("✅ Salas cargadas:", data?.length || 0);
      // Combinamos las salas por defecto con las de la base de datos evitando duplicados
      setRooms((prev) => {
        const existingIds = new Set(prev.map((r) => r.id));
        const newData = (data || []).filter((r) => !existingIds.has(r.id));
        return [...prev, ...newData];
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();

    // Configurar la escucha en tiempo real para nuevas salas
    const channel = supabase
      .channel("public:chatrooms")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chatrooms",
        },
        (payload) => {
          // Agregamos la nueva sala al inicio de la lista
          setRooms((current) => [payload.new, ...current]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { rooms, loading, refreshRooms: fetchRooms };
};
