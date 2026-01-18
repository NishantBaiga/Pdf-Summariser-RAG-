"use client";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Pdf = {
  id: string;
  name: string;
  url: string;
  key: string;
  createdAt: string;
  updatedAt?: string;
  size?: string;
  summary?: string;
  extractedText?: string;
  uploadStatus?: string;
};

export default function PdfListingPage() {
  const [pdfs, setPdfs] = useState<Pdf[]>([]);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await fetch("/api/pdfs", { cache: "no-store" });
        const data = await response.json();
        console.log("Fetched PDFs:", data);
        setPdfs(data);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };
    fetchPdfs();
  }, []);

  return (
    <section className="py-20 md:py-28 max-w-5xl mx-auto px-4">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white text-center mb-10">
        Your <span className="text-orange-600">Uploaded PDFs</span>
      </h1>

      {pdfs.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
            No PDFs uploaded yet.
          </p>
          <Link href="/upload">
            <Button size="lg" className="shadow-xl shadow-orange-400/40">
              Upload Your First PDF
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {pdfs.map((pdf) => (
          <Link
            key={pdf.id}
            href={`/workspace/${pdf.id}`}
            className="group block p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-10 h-10 text-orange-600" />
            </div>
            <h2 className="font-semibold text-gray-900 dark:text-white text-lg group-hover:text-orange-600 transition-colors duration-200">
              {pdf.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {pdf.size ?
                pdf.size < 1024 ?
                  `${Math.round(pdf.size)} B` :
                pdf.size < 1048576 ?
                  `${Math.round(pdf.size / 1024)} KB` :
                  `${Math.round(pdf.size / 1048576)} MB`
              : "Unknown size"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Uploaded on {pdf.createdAt ? new Date(pdf.createdAt).toLocaleDateString() : "--"}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
