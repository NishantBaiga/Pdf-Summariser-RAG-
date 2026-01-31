"use client";

import { Search, Upload, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WorkspaceSidebarProps {
  fileId?: string;
  files?: Array<{
    id: string;
    name: string;
    createdAt: string;
  }>;
  onUpload?: () => void;
}

export default function WorkspaceSidebar({
  fileId,
  files = [],
  onUpload,
}: WorkspaceSidebarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileClick = (id: string) => {
    router.push(`/workspace/${id}`);
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search PDFs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-12"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={onUpload}
          >
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1">
          <SidebarMenu className="p-2">
            {filteredFiles.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                {searchQuery ? "No PDFs found" : "No PDFs uploaded yet"}
              </div>
            ) : (
              filteredFiles.map((file) => (
                <SidebarMenuItem key={file.id}>
                  <SidebarMenuButton
                    onClick={() => handleFileClick(file.id)}
                    isActive={fileId === file.id}
                    className="w-full justify-start"
                  >
                    <FileText className="mr-2 h-4 w-4 shrink-0" />
                    <div className="flex-1 overflow-hidden">
                      <div className="truncate font-medium">{file.name}</div>
                      <div className="text-xs text-gray-500 truncate">
                        {new Date(file.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            )}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center justify-between">
          <UserButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}