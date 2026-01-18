"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function WorkSpacePage() {
  const params = useParams();
  const fileId = params?.fileId as string;
  // console.log("WorkSpacePage fileId:", fileId);

  // STATES
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState("Loading summary...");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // FETCH extracted text + summary
  useEffect(() => {
    if (!fileId) return;
    const prepareFile = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/workspace/init", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileId }),
        });
        //  throw error
        if (!res.ok) throw new Error("Request failed: " + (await res.text()));
        const data = await res.json();
        setSummary(data.summary);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    prepareFile();
  }, [fileId]);

  // Fetch messages
  useEffect(() => {
    if (!fileId) return;
    const loadMessages = async () => {
      try {
        const res = await fetch(`/api/messages?fileId=${fileId}`);
        if (!res.ok) return;
        const data = await res.json();

        setMessages(
          data.map((m: any) => ({
            role: m.isUserMessage ? "user" : "assistant",
            content: m.text,
          })),
        );
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };
    loadMessages();
  }, [fileId]);

  // Fetch Pdf URL from db for Preview
  useEffect(() => {
    if (!fileId) return;

    const fetchFile = async () => {
      try {
        const res = await fetch(`/api/file?fileId=${fileId}`);
        if (!res.ok) return;
        const data = await res.json();
        setPdfUrl(data.url);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFile();
  }, [fileId]);

  // SEND MESSAGE FUNCTION
  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg: { role: "user" | "assistant"; content: string } = {
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMsg]);
    const question = input;
    setInput("");
    setSending(true);

    const res = await fetch("/api/pdf-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileId,
        question,
      }),
    });
    const data = await res.json();
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.answer || "No answer." },
    ]);
    setSending(false);
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 lg:flex-row">
      {/* LEFT SIDE PDF VIEWER */}
      <div className="w-full lg:w-[45%] h-[50vh] lg:h-full border-r border-gray-200 dark:border-gray-800 bg-gray-200 dark:bg-gray-800 relative">
        <div className="absolute inset-0 p-4">
          <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
            {pdfUrl ? (
              <iframe src={pdfUrl} className="w-full h-full" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Loading PDF...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE SUMMARY + CHAT */}
      <div className="w-full lg:w-[55%] h-[50vh] lg:h-full flex flex-col bg-white dark:bg-gray-950">
        {/* HEADER */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-950 z-10">
          <div>
            {/* <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Document Summary
            </h2> */}
            <p className="text-xs text-gray-500">File ID: {fileId}</p>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* SUMMARY BOX */}
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Summarised Text
            </h3>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap font-mono text-xs">
              {/* {loading ? "Summarizing..." : summary} */}
            </div>
          </div>

          {/* CHAT HISTORY */}
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl max-w-[80%] text-sm whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-blue-600 dark:bg-blue-950 text-white ml-auto"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {sending && (
              <div className="p-3 rounded-xl bg-gray-300 dark:bg-gray-700 w-fit text-gray-800 dark:text-gray-200 text-sm">
                Thinking...
              </div>
            )}
          </div>
        </div>

        {/* CHAT INPUT */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="relative flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask a question about this PDF..."
              className="flex-1 pl-4 pr-4 py-3 bg-gray-100 dark:bg-gray-900 rounded-xl text-sm border border-gray-300 dark:border-gray-700"
            />

            <Button
              onClick={sendMessage}
              disabled={sending}
              className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
