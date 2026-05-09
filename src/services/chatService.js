// src/services/chatService.js
import { supabase } from "../../lib/supabase";

export const chatService = {
  async sendMessage(chatroom_id, currentUserId, text) {
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          chatroom_id: chatroom_id, 
          sender_id: currentUserId,
          text: text,           
        },
      ])
      .select();

    return { data, error };
  },

  async createChatRoom(name) {
    const { data, error } = await supabase
      .from("chatrooms")
      .insert([{ name: name.trim() }])
      .select();

    return { data, error };
  },
};