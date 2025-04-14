"use client";
import { Minus, Plus, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Person } from "@/lib/types";

interface CandidatesSidebarProps {
  recommendedCandidates: Person[];
  otherCandidates: Person[];
  onAddCandidateAction: (candidate: Person) => void;
  onRemoveCandidateAction: (candidate: Person) => void;
}

export function CandidatesSidebar({
  recommendedCandidates,
  otherCandidates,
  onAddCandidateAction,
  onRemoveCandidateAction,
}: CandidatesSidebarProps) {
  return (
    <Sidebar className="w-[280px] border-r">
      <SidebarContent className="p-0">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="border-b px-4 py-3 text-base font-medium">
            Most recommended
          </SidebarGroupLabel>
          <SidebarGroupContent className="p-0">
            {recommendedCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center justify-between px-4 py-3 text-muted-foreground"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage alt={candidate.name} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{candidate.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={() => onRemoveCandidateAction(candidate)}
                >
                  <Minus className="h-4 w-4 text-red-600" />
                  <span className="sr-only">Add candidate</span>
                </Button>
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-4 py-3 text-xs text-muted-foreground">
          Recommendations are based on your skill requirements and
          candidate&apos;s performance.
        </div>

        <div className="border border-black h-20"></div>

        <SidebarGroup className="p-0">
          <SidebarGroupContent className="p-0">
            {otherCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-6 w-6">
                    <AvatarImage alt={candidate.name} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{candidate.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={() => onAddCandidateAction(candidate)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add candidate</span>
                </Button>
              </div>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
