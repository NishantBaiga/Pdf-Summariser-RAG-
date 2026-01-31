"use client";

import { useEffect, useState } from "react";

type UseWorkspaceReturn = {
  summary: string;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

export function useWorkspace(
  fileId: string | undefined
): UseWorkspaceReturn {
  const [summary, setSummary] = useState<string>("Loading summary...");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function initWorkspace() {
    if (!fileId) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/workspace/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data = await res.json();
      setSummary(data.summary);
    } catch (err) {
      console.error("Workspace init failed:", err);
      setError("Failed to load workspace summary.");
      setSummary("Unable to load summary.");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    if (!fileId) return;
    initWorkspace();
  }, [fileId]);

  return {
    summary,
    loading,
    error,
    refresh: initWorkspace, // manual re-fetch if needed
  };
}
