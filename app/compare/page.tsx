"use client";

import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { Person } from "@/lib/types";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CandidatesSidebar } from "@/components/candidate-sidebar";
import { JobHeader } from "@/components/job-header";

export default function Page() {
  const { data, error, isLoading } = useSWR<Person[]>(
    "https://forinterview.onrender.com/people",
    fetcher,
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>No data found</div>;

  const firstFourPeople = data?.slice(0, 4) || [];
  console.log("4 person", firstFourPeople);
  const otherCandidates = data?.slice(4, 8) || [];

  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <CandidatesSidebar
          recommendedCandidates={firstFourPeople}
          otherCandidates={otherCandidates}
        />
        <main className="flex-1 p-6">
          <JobHeader candidateCount={firstFourPeople.length} />
        </main>
      </SidebarProvider>
    </div>
  );
}
