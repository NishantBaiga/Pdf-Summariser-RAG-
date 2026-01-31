"use client";

import { useEffect, useState } from "react";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export function useMessages(fileId: string | undefined) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState<boolean>(false);
  const [loadingMessages, setLoadingMessages] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load messages
  useEffect(() => {
    if (!fileId) return;

    async function loadMessages() {
      try {
        setLoadingMessages(true);
        setError(null);

        const res = await fetch(`/api/messages?fileId=${fileId}`);
        if (!res.ok) throw new Error("Failed to load messages");

        const data = await res.json();
        setMessages(
          data.map((m: any) => ({
            role: m.isUserMessage ? "user" : "assistant",
            content: m.text,
          }))
        );
      } catch (err) {
        console.error(err);
        setError("Unable to load messages");
      } finally {
        setLoadingMessages(false);
      }
    }

    loadMessages();
  }, [fileId]);

  // Send message
  async function sendMessage(question: string) {
    if (!question.trim() || !fileId) return;

    setSending(true);

    // Optimistic update
    setMessages((prev) => [...prev, { role: "user", content: question }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId, question }),
      });

      if (!res.ok) throw new Error("Chat failed");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer || "No answer." },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  return {
    messages,
    sending,
    loadingMessages,
    error,
    sendMessage,
    setMessages, // optional escape hatch
  };
}
