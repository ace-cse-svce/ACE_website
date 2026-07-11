export type YearOfStudy = "II" | "III" | "IV";

export interface Role {
  name: string;
  eligibleYears: YearOfStudy[];
  note: string;
}

export const roles: Role[] = [
  // Core / executive roles
  { name: "President", eligibleYears: ["IV"], note: "4th years only" },
  { name: "Vice-President", eligibleYears: ["IV"], note: "4th years only" },
  { name: "Secretary", eligibleYears: ["III"], note: "3rd years only" },
  { name: "Treasurer", eligibleYears: ["III"], note: "3rd years only" },
  { name: "Operations Head", eligibleYears: ["III"], note: "3rd years only" },
  { name: "Joint Secretary", eligibleYears: ["II"], note: "2nd years only" },
  { name: "Executive Associate", eligibleYears: ["III"], note: "3rd years only" },
  { name: "Executive Member", eligibleYears: ["II"], note: "2nd years only" },

  // Design Team
  { name: "Member - Design Team", eligibleYears: ["II", "III"], note: "2nd & 3rd years" },
  { name: "Design Team Head", eligibleYears: ["IV"], note: "4th years only" },

  // Web Development Team
  { name: "Member - Web Development Team", eligibleYears: ["II", "III"], note: "2nd & 3rd years" },
  { name: "Web Development Team Head", eligibleYears: ["IV"], note: "4th years only" },

  // Video Production Team
  { name: "Member - Video Production Team", eligibleYears: ["II", "III"], note: "2nd & 3rd years" },
  { name: "Video Production Team Head", eligibleYears: ["IV"], note: "4th years only" },

  // Content Writing Team
  { name: "Member - Content Writing Team", eligibleYears: ["II", "III"], note: "2nd & 3rd years" },
  { name: "Content Writing Team Head", eligibleYears: ["IV"], note: "4th years only" },

  // Marketing and Outreach Team
  { name: "Member - Marketing and Outreach Team", eligibleYears: ["II", "III"], note: "2nd & 3rd years" },
  { name: "Marketing and Outreach Head", eligibleYears: ["IV"], note: "4th years only" },

  // Photography Team (no head role)
  { name: "Member - Photography Team", eligibleYears: ["II", "III"], note: "2nd & 3rd years" },
];

export const rolesForYear = (year: YearOfStudy | ""): Role[] =>
  year ? roles.filter((role) => role.eligibleYears.includes(year)) : [];

export const programmes = [
  "B.E Computer Science and Engineering",
  "B.Tech, Artificial Intelligence & Data Science",
] as const;

export const yearsOfStudy: YearOfStudy[] = ["II", "III", "IV"];

export const sections = ["A", "B", "C", "D", "E"] as const;

export const genders = ["Male", "Female"] as const;

export const residencies = ["Day Scholar", "Hosteller"] as const;
