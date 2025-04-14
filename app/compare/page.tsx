"use client";

import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { Person } from "@/lib/types";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CandidatesSidebar } from "@/components/candidate-sidebar";
import { JobHeader } from "@/components/job-header";
import { CandidateComparisonHeatmap } from "@/components/comparison-heatmap";
import { useEffect, useState } from "react";

const recommendedCount = 4;
const otherCount = 4;

export default function Page() {
  const { data, error, isLoading } = useSWR<Person[]>(
    "https://forinterview.onrender.com/people",
    fetcher,
  );

  const [recommendedCandidates, setRecommendedCandidates] = useState<Person[]>(
    [],
  );
  const [otherCandidates, setOtherCandidates] = useState<Person[]>([]);

  useEffect(() => {
    if (data) {
      setRecommendedCandidates(data.slice(0, recommendedCount));
      setOtherCandidates(
        data.slice(recommendedCount, recommendedCount + otherCount),
      );
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <CandidatesSidebar
          recommendedCandidates={recommendedCandidates}
          otherCandidates={otherCandidates}
        />
        <main className="flex-1 p-6">
          <JobHeader candidateCount={recommendedCandidates.length} />
          <CandidateComparisonHeatmap candidates={recommendedCandidates} />
        </main>
      </SidebarProvider>
    </div>
  );
}
