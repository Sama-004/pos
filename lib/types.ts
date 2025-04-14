export interface Person {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
}

export interface Skill {
  id: string;
  name: string;
  pos: {
    id: string;
    consensus_score: number;
  }[];
}

export interface Skillset {
  id: string;
  name: string;
  skills: Skill[];
}

export interface CandidateDetails {
  id: string;
  name: string;
  email: string;
  data: {
    data: {
      skillset: Skillset[];
    };
  };
}
