"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function WorkSpacePage() {
  const params = useParams();
  const fileId = params?.fileId as string;

  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState("Loading summary...");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // INIT FILE
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
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setSummary(data.summary);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    prepareFile();
  }, [fileId]);

  // LOAD MESSAGES
  useEffect(() => {
    if (!fileId) return;
    const loadMessages = async () => {
      const res = await fetch(`/api/messages?fileId=${fileId}`);
      if (!res.ok) return;
      const data = await res.json();
      setMessages(
        data.map((m: any) => ({
          role: m.isUserMessage ? "user" : "assistant",
          content: m.text,
        }))
      );
    };
    loadMessages();
  }, [fileId]);

  // LOAD PDF
  useEffect(() => {
    if (!fileId) return;
    const fetchFile = async () => {
      const res = await fetch(`/api/file?fileId=${fileId}`);
      if (!res.ok) return;
      const data = await res.json();
      setPdfUrl(data.url);
    };
    fetchFile();
  }, [fileId]);

  async function sendMessage() {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    const question = input;
    setInput("");
    setSending(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileId, question }),
    });

    const data = await res.json();
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.answer || "No answer." },
    ]);
    setSending(false);
  }

  return (
    <div className="h-full overflow-hidden bg-gray-100 dark:bg-gray-900">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full hidden lg:flex"
      >
        {/* PDF PANEL */}
        <ResizablePanel defaultSize={45} minSize={30}>
          <div className="h-full p-4 bg-gray-200 dark:bg-gray-800">
            <div className="h-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow">
              {pdfUrl ? (
                <iframe src={pdfUrl} className="w-full h-full" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  Loading PDF...
                </div>
              )}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* CHAT PANEL */}
        <ResizablePanel defaultSize={55} minSize={35}>
          <ChatSection
            fileId={fileId}
            summary={summary}
            loading={loading}
            messages={messages}
            sending={sending}
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
          />
        </ResizablePanel>
      </ResizablePanelGroup>

    
    </div>
  );
}

/* ---------------- CHAT SECTION ---------------- */

function ChatSection({
  fileId,
  summary,
  loading,
  messages,
  sending,
  input,
  setInput,
  sendMessage,
}: any) {
  return (
    <div className="flex flex-col h-full min-h-0 bg-white dark:bg-gray-950">
      <div className="p-4 border-b text-xs text-gray-500">
        File ID: {fileId}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">
            Summary
          </h3>
          <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-900 text-xs font-mono whitespace-pre-wrap">
            {loading ? "Summarizing..." : summary}
          </div>
        </div>

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl max-w-[80%] text-sm ${
              msg.role === "user"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {sending && <div className="text-sm">Thinking...</div>}
      </div>

      <div className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask about this PDF..."
        />
        <Button onClick={sendMessage} disabled={sending}>
          Send
        </Button>
      </div>
    </div>
  );
}
