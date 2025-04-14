"use client";

import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { Person } from "@/lib/types";

export default function Page() {
  const { data, error, isLoading } = useSWR<Person[]>(
    "https://forinterview.onrender.com/people",
    fetcher,
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">People List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((person) => (
          <div key={person.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{person.name}</h2>
            <p className="text-gray-600">{person.email}</p>
            <p className="text-gray-600">{person.phone}</p>
            <p className="text-gray-600">{person.address}</p>
            <p className="mt-2 text-gray-700">{person.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
