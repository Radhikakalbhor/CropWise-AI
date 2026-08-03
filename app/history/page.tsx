"use client";

import Link from "next/link";
import {
  getHistory,
  clearHistory,
  deleteHistory,
} from "@/lib/history";
import { generatePDF } from "@/lib/pdf";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  function handleClear() {
    if (!confirm("Clear all analysis history?")) return;

    clearHistory();
    setHistory([]);
    toast.success("History cleared successfully.");
  }

  function handleDelete(id: string) {
    deleteHistory(id);
    setHistory(getHistory());
    toast.success("Analysis deleted.");
  }

  const filteredHistory = history.filter((item) =>
    item.crop.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-8 sm:py-10 lg:py-14">

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h1 className="text-3xl font-extrabold text-green-800 sm:text-4xl lg:text-5xl">
              📜 Analysis History
            </h1>

            <p className="mt-3 text-sm text-gray-600 sm:text-base">
              View all your previous AI crop analyses.
            </p>

          </div>

          <button
            onClick={handleClear}
            className="w-full rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 sm:w-auto"
          >
            🗑 Clear History
          </button>

        </div>

        <input
          type="text"
          placeholder="🔍 Search Crop..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-8 w-full rounded-xl border bg-white p-4 shadow"
        />

        {filteredHistory.length === 0 ? (

          <div className="rounded-3xl bg-white p-8 text-center shadow-xl sm:p-10">

            <h2 className="text-2xl font-bold">
              No Analysis Found
            </h2>

            <p className="mt-4 text-gray-600">
              Perform an AI analysis first.
            </p>

            <Link
              href="/analyze"
              className="mt-8 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              🌾 Analyze Crop
            </Link>

          </div>

        ) : (

          <div className="space-y-6">

            {filteredHistory.map((item) => (

              <div
                key={item.id}
                className="rounded-3xl bg-white p-5 shadow-lg transition hover:shadow-2xl sm:p-7"
              >

                <div className="flex flex-col gap-6 xl:flex-row">

                  <div className="mx-auto w-full max-w-xs xl:mx-0 xl:w-56">

                    {item.image ? (

                      <img
                        src={item.image}
                        alt={item.crop}
                        className="h-48 w-full rounded-2xl object-cover"
                      />

                    ) : (

                      <div className="flex h-48 items-center justify-center rounded-2xl bg-gray-100 text-6xl">
                        🌾
                      </div>

                    )}

                  </div>

                  <div className="flex-1">

                    <h2 className="text-2xl font-bold text-green-800 sm:text-3xl">
                      🌾 {item.crop}
                    </h2>

                    <div className="mt-4 space-y-2 text-gray-700">

                      <p>
                        🦠 <strong>Disease:</strong> {item.disease}
                      </p>

                      <p>
                        📊 <strong>Confidence:</strong> {item.confidence}
                      </p>

                      <p>
                        📍 {item.district}, {item.state}
                      </p>

                      <p>
                        📅 {item.date}
                      </p>

                    </div>

                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">

                    <Link
                      href={`/history/${item.id}`}
                      className="rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                    >
                      👁 View Report
                    </Link>

                    <button
                      onClick={() => {
                        generatePDF(item.result);
                        toast.success("PDF downloaded.");
                      }}
                      className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                      📄 Download PDF
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}