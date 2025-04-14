"use client";

import { Person } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { getInitials } from "@/lib/name-initials";

type Skill = {
  name: string;
  category: "experience" | "skills" | "research" | "other";
};

const skills: Skill[] = [
  { name: "Experience", category: "experience" },
  { name: "Can join in", category: "experience" },
  { name: "Minimum salary expected", category: "experience" },
  { name: "Creating Wireframes", category: "skills" },
  { name: "Creating Basic Prototypes", category: "skills" },
  { name: "Creation of Brands", category: "skills" },
  { name: "Applying Color Theory", category: "skills" },
  { name: "Using Figma for Design", category: "skills" },
  { name: "Application of Typography", category: "skills" },
  { name: "Creating Effective Icons", category: "skills" },
  { name: "Optimizing Touch Points", category: "skills" },
  { name: "Addressing User Pain Points", category: "research" },
  { name: "Conducting User Research", category: "research" },
  { name: "Applying Questioning Skills", category: "research" },
  { name: "Conducting Heuristic Evaluation", category: "research" },
  { name: "Gathering User Feedback", category: "research" },
  { name: "Conducting Usability Tests", category: "research" },
  { name: "Creating User Personas", category: "research" },
  { name: "Conducting Market Research", category: "research" },
  { name: "Crafting Effective Questions", category: "research" },
  { name: "Creating Effective Surveys", category: "other" },
  { name: "Creating Sitemaps", category: "other" },
  { name: "Designing User Flows", category: "other" },
];

type CandidateComparisonHeatmapProps = {
  candidates: Person[];
};

export function CandidateComparisonHeatmap({
  candidates,
}: CandidateComparisonHeatmapProps) {
  // Mock function to generate skill level data (1-5) for each candidate and skill
  const getSkillLevel = (): number => {
    // In a real app, this would come from your API
    return Math.floor(Math.random() * 5) + 1;
  };

  // Function to get color based on skill level
  const getSkillColor = (level: number) => {
    if (level === 0) return "bg-gray-100";
    if (level === 1) return "bg-green-100";
    if (level === 2) return "bg-green-200";
    if (level === 3) return "bg-green-300";
    if (level === 4) return "bg-green-400";
    return "bg-green-500";
  };

  return (
    <div className="mt-4">
      {/* Filter button */}
      <div className="mb-4">
        <Button variant="outline" size="sm" className="flex items-center">
          <span>Filter</span>
          <SlidersHorizontal className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Heatmap grid */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2 w-64"></th>
              {candidates.map((candidate) => (
                <th key={candidate.id} className="p-2 text-center">
                  <div className="flex flex-col items-center">
                    <div className="rounded-full bg-gray-200 h-8 w-8 mb-1"></div>
                    <span className="text-xs">
                      {getInitials(candidate.name)}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.name} className="border-t border-gray-100">
                <td className="p-2 text-sm">{skill.name}</td>
                {candidates.map((candidate) => {
                  const skillLevel = getSkillLevel();
                  return (
                    <td key={`${candidate.id}-${skill.name}`} className="p-2">
                      <div
                        className={`h-6 w-6 rounded mx-auto ${getSkillColor(skillLevel)}`}
                        title={`${candidate.name}: ${skill.name} - Level ${skillLevel}`}
                      ></div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
