import { SendIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

export default function ChatSection({
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
  // const [showSummary, setShowSummary] = useState(true);
  return (
    <div className="flex flex-col  h-full bg-white dark:bg-gray-950">
      {/* Summary (collapsible on mobile) */}
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4 max-h-[80vh] lg:max-h-[90vh]">
        <div className="space-y-3">
          {messages.map((msg: any, i: any) => (
            <div
              key={i}
              className={`p-3 rounded-xl max-w-[85%]  text-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              } ${isMobile ? "max-w-[90%]" : ""}`}
            >
              {msg.content}
            </div>
          ))}
          {sending && (
            <div className="text-sm text-gray-500 italic">Thinking...</div>
          )}
        </div>
      </ScrollArea>
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
