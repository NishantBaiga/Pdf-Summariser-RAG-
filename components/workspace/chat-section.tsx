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
      <div className="flex flex-col h-full bg-white dark:bg-gray-950">
      {/* SUMMARY */}
      <div className=" hidden lg:block p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Summary
        </h2>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg: any, i: number) => (
          <div
            key={i}
            className={`
              p-3 rounded-xl text-sm
              ${msg.role === "user"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"}
              ${isMobile ? "max-w-[90%]" : "max-w-[85%]"}
            `}
          >
            {msg.content}
          </div>
        ))}

        {sending && (
          <div className="text-sm text-gray-500 italic">
            Thinking…
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="p-3 border-t bg-white dark:bg-gray-950">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask about this PDF…"
            className="flex-1"
          />

          <Button
            onClick={sendMessage}
            disabled={sending}
            className="shrink-0"
          >
            {isMobile ? <SendIcon className="h-4 w-4" /> : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
}
