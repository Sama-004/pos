"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface JobHeaderProps {
  candidateCount: number;
}

export function JobHeader({ candidateCount }: JobHeaderProps) {
  return (
    <div className="flex flex-col border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-normal text-neutral-500"></h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-neutral-500">
            {candidateCount} Candidates
          </span>
          <div className="flex">
            <Button
              variant="outline"
              size="icon"
              className="rounded-none rounded-l-md border-r-0"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-none rounded-r-md"
            >
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>
      <Tabs defaultValue="compare" className="px-6">
        <TabsList className="h-auto p-0">
          <TabsTrigger
            value="compare"
            className="rounded-none border-0 px-4 py-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            Compare View
          </TabsTrigger>
          <TabsTrigger
            value="individual"
            className="rounded-none border-0 px-4 py-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            Individual view
          </TabsTrigger>
          <TabsTrigger
            value="shortlisted"
            className="rounded-none border-0 px-4 py-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
          >
            Shortlisted candidates
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
