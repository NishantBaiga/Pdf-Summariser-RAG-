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
import { FileTextIcon, MenuIcon, SendIcon, XIcon } from "lucide-react";

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

  const [showPdfMobile, setShowPdfMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

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
        })),
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
    <>
      {/* Mobile Layout (sm: hidden on larger screens) */}
      <div className="lg:hidden flex flex-col h-full bg-gray-100 dark:bg-gray-900">
        {/* Mobile Header with PDF toggle */}
        <div className="flex-shrink-0 p-4 border-b bg-white dark:bg-gray-800 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowPdfMobile(!showPdfMobile)}
          >
            <FileTextIcon />
          </Button>
          <h1 className="text-sm font-medium">PDF Chat</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <MenuIcon />
          </Button>
        </div>

        {/* PDF Modal for mobile (when toggled) */}
        {showPdfMobile && (
          <div className="absolute inset-0 z-50 bg-white dark:bg-gray-900">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-medium">PDF Preview</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPdfMobile(false)}
              >
                <XIcon />
              </Button>
            </div>
            <div className="h-full">
              {pdfUrl ? (
                <iframe src={pdfUrl} className="w-full h-full" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  Loading PDF...
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sidebar for mobile */}
        {showSidebar && (
          <div className="absolute inset-0 z-50 bg-white dark:bg-gray-900">
            <MobileSidebar
              onClose={() => setShowSidebar(false)}
              fileId={fileId}
            />
          </div>
        )}

        {/* Main Chat Interface (default view) */}
        <ChatSection
          fileId={fileId}
          summary={summary}
          loading={loading}
          messages={messages}
          sending={sending}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          isMobile={true}
        />
      </div>

      {/* Desktop Layout (unchanged) */}
      <div className="h-full overflow-hidden bg-gray-100 dark:bg-gray-900 hidden lg:block">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* ... existing desktop layout ... */}

          {/* <div className="h-full overflow-hidden bg-gray-100 dark:bg-gray-900">
            <ResizablePanelGroup
              direction="horizontal"
              className="h-full hidden lg:flex"
            > */}
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
            {/* </ResizablePanelGroup>
          </div> */}
        </ResizablePanelGroup>
      </div>
    </>
  );
}

/* ---------------- CHAT SECTION ---------------- */

// function ChatSection({
//   fileId,
//   summary,
//   loading,
//   messages,
//   sending,
//   input,
//   setInput,
//   sendMessage,
// }: any) {
//   return (
//     <div className="flex flex-col h-full min-h-0 bg-white dark:bg-gray-950">
//       <div className="p-4 border-b text-xs text-gray-500">
//         File ID: {fileId}
//       </div>

//       <div className="flex-1 overflow-y-auto p-6 space-y-6">
//         <div>
//           <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">
//             Summary
//           </h3>
//           <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-900 text-xs font-mono whitespace-pre-wrap">
//             {loading ? "Summarizing..." : summary}
//           </div>
//         </div>

//         {messages.map((msg :any, i: any) => (
//           <div
//             key={i}
//             className={`p-3 rounded-xl max-w-[80%] text-sm ${
//               msg.role === "user"
//                 ? "bg-blue-600 text-white ml-auto"
//                 : "bg-gray-200 dark:bg-gray-800"
//             }`}
//           >
//             {msg.content}

//           </div>
//         ))}

//         {sending && <div className="text-sm">Thinking...</div>}

//       </div>

//       <div className="p-4 border-t flex gap-2">
//         <Input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Ask about this PDF..."
//         />
//         <Button onClick={sendMessage} disabled={sending}>
//           Send
//         </Button>
//       </div>

//     </div>
//   );
// }

// function ChatSection({
//   fileId,
//   summary,
//   loading,
//   messages,
//   sending,
//   input,
//   setInput,
//   sendMessage,
// }: any) {
//   return (
//     <div className="flex flex-col h-full bg-white dark:bg-gray-950">
//       {/* File ID header - fixed height */}
//       <div className="flex-shrink-0 p-4 border-b text-xs text-gray-500">
//         File ID: {fileId}
//       </div>

//       {/* Main content area - this should grow and contain scrollable messages */}
//       <div className="flex-1 flex flex-col min-h-0">
//         {/* Summary section - fixed height */}
//         <div className="flex-shrink-0 p-4 border-b">
//           <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">
//             Summary
//           </h3>
//           <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-900 text-xs font-mono whitespace-pre-wrap max-h-32 overflow-y-auto">
//             {loading ? "Summarizing..." : summary}
//           </div>
//         </div>

//         {/* Messages area - scrollable */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//           {messages.map((msg: any, i: any) => (
//             <div
//               key={i}
//               className={`p-3 rounded-xl max-w-[80%] text-sm ${
//                 msg.role === "user"
//                   ? "bg-blue-600 text-white ml-auto"
//                   : "bg-gray-200 dark:bg-gray-800"
//               }`}
//             >
//               {msg.content}
//             </div>
//           ))}

//           {sending && (
//             <div className="text-sm text-gray-500 italic">Thinking...</div>
//           )}
//         </div>
//       </div>

//       {/* Input section - fixed at bottom */}
//       <div className="flex-shrink-0 p-4 border-t flex gap-2">
//         <Input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Ask about this PDF..."
//         />
//         <Button onClick={sendMessage} disabled={sending}>
//           Send
//         </Button>
//       </div>
//     </div>
//   );
// }

// mobile opitmize chat section

function ChatSection({
  fileId,
  summary,
  loading,
  messages,
  sending,
  input,
  setInput,
  sendMessage,
  isMobile = false,
}: any) {
  const [showSummary, setShowSummary] = useState(true);
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950">
      {/* Summary (collapsible on mobile) */}
      <div className={`${isMobile ? "border-b" : ""}`}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-400 uppercase">
              Summary
            </h3>
            {isMobile && (
              <Button variant="ghost" size="sm">
                {showSummary ? "Hide" : "Show"}
              </Button>
            )}
          </div>
          {(!isMobile || showSummary) && (
            <div className="mt-2 p-3 rounded-lg bg-gray-100 dark:bg-gray-900 text-sm max-h-40 overflow-y-auto">
              {loading ? "Summarizing..." : summary}
            </div>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg: any, i: any) => (
          <div
            key={i}
            className={`p-3 rounded-xl max-w-[85%] text-sm ${
              msg.role === "user"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-200 dark:bg-gray-800"
            } ${isMobile ? "max-w-[90%]" : ""}`}
          >
            {msg.content}
          </div>
        ))}
        {sending && (
          <div className="text-sm text-gray-500 italic">Thinking...</div>
        )}
      </div>

      {/* Input Area (optimized for mobile) */}
      <div className="p-3 border-t bg-white dark:bg-gray-950">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about this PDF..."
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={sending}
            size={isMobile ? "default" : "default"}
            className="shrink-0"
          >
            {isMobile ? <SendIcon /> : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
}

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink } from "lucide-react";

function MobileSidebar({
  onClose,
  fileId,
}: {
  onClose: () => void;
  fileId: string;
}) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchFile = async () => {
      const res = await fetch(`/api/file?fileId=${fileId}`);
      if (!res.ok) return;
      const data = await res.json();
      setPdfUrl(data.url);
    };
    fetchFile();
  }, [fileId]);

  return (
    <Sheet open onOpenChange={onClose}>
      <SheetContent side="left" className="w-[85vw] p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>PDF Actions</SheetTitle>
        </SheetHeader>

        <div className="p-4 space-y-4">
          {pdfUrl && (
            <>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open(pdfUrl, "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open PDF in New Tab
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  window.open(pdfUrl);
                  onClose();
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                View PDF Preview
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = pdfUrl;
                  link.download = `document-${fileId}.pdf`;
                  link.click();
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </>
          )}

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-2">File ID:</p>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded block overflow-x-auto">
              {fileId}
            </code>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
