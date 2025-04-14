"use client";

import { Person, Skill, CandidateDetails } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { getInitials } from "@/lib/name-initials";
import { useEffect, useState } from "react";
import { getSkillColor } from "@/lib/get-skillColor";

type CandidateComparisonHeatmapProps = {
  candidates: Person[];
};

export function CandidateComparisonHeatmap({
  candidates,
}: CandidateComparisonHeatmapProps) {
  const [skillsData, setSkillsData] = useState<Record<string, Skill[]>>({});
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: this should be a hook or sepearate fn
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoadingSkills(true);
        const skillsMap: Record<string, Skill[]> = {};

        const promises = candidates.map(async (candidate) => {
          const response = await fetch(
            `https://forinterview.onrender.com/people/${candidate.id}`,
          );
          if (!response.ok)
            throw new Error(`Failed to fetch skills for ${candidate.name}`);
          const data: CandidateDetails = await response.json();

          // Extract all skills with their consensus scores
          const allSkills = data.data.data.skillset.flatMap((skillset) =>
            skillset.skills.map((skill) => ({
              ...skill,
              consensus_score: skill.pos[0]?.consensus_score || 0,
            })),
          );

          skillsMap[candidate.id] = allSkills;
        });

        await Promise.all(promises);
        setSkillsData(skillsMap);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch skills");
      } finally {
        setIsLoadingSkills(false);
      }
    };

    if (candidates.length > 0) {
      fetchSkills();
    }
  }, [candidates]);

  const allSkills = Array.from(
    new Set(
      Object.values(skillsData).flatMap((skills) =>
        skills.map((skill) => skill.name),
      ),
    ),
  );

  const getSkillLevel = (candidateId: string, skillName: string): number => {
    const candidateSkills = skillsData[candidateId] || [];
    const skill = candidateSkills.find((s) => s.name === skillName);
    return skill?.pos[0].consensus_score || 0;
  };

  if (isLoadingSkills) return <div className="p-4">Loading skills data...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (allSkills.length === 0)
    return <div className="p-4">No skills data found</div>;

  return (
    <div className="mt-4">
      <div className="mb-4">
        <Button variant="outline" size="sm" className="flex items-center">
          <span>Filter</span>
          <SlidersHorizontal className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2 w-64">Skill</th>
              {candidates.map((candidate) => (
                <th key={candidate.id} className="p-2 text-center">
                  <div className="flex flex-col items-center">
                    <div className="rounded-full bg-gray-200 h-8 w-8 mb-1 flex items-center justify-center">
                      {getInitials(candidate.name)}
                    </div>
                    <span className="text-xs">
                      {candidate.name.split(" ")[0]}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allSkills.map((skillName) => (
              <tr key={skillName} className="border-t border-gray-100">
                <td className="p-2 text-sm">{skillName}</td>
                {candidates.map((candidate) => {
                  const skillLevel = getSkillLevel(candidate.id, skillName);
                  return (
                    <td key={`${candidate.id}-${skillName}`} className="p-2">
                      <div
                        className={`h-6 w-6 rounded mx-auto ${getSkillColor(skillLevel)}`}
                        title={`${candidate.name}: ${skillName} - Level ${skillLevel}`}
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
