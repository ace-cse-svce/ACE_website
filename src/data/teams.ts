export interface TeamMember {
  name: string;
  role: string;
  image: string;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
  scale?: number;
}

export const teams: Record<string, TeamMember[]> = {
  "Core Team": [
    { name: "Sarvesh Ragav B", role: "President", image: "/Core-team/president/Sarvesh Ragav B.jpeg" },
    { name: "Harighanesh A", role: "Vice President", image: "/Core-team/Vice-president/Harighanesh A.webp", objectPosition: "top" },
    { name: "Shrinidhi Dasraty", role: "Vice President", image: "/Core-team/Vice-president/Shrinidhi Dasraty.jpg", objectPosition: "50% 15%", scale: 1.4 },
    { name: "NIRRMAL G", role: "Secretary", image: "/Core-team/Secretary/NIRRMAL G.jpg" },
    { name: "Priyanka A", role: "Treasurer", image: "/Core-team/Treasurer/Priyanka A.jpg", objectPosition: "top" },
    { name: "Sanjay Joshua Swaminathan", role: "Operations Head", image: "/Core-team/Operations head/Sanjay Joshua Swaminathan.jpg", objectPosition: "top" },
    { name: "Naresh Anand S", role: "Joint Secretary", image: "/Core-team/Joint Sec/Naresh Anand S.jpeg" },
  ],
  "Executive Team": [
    { name: "Ashwant P", role: "Executive Member", image: "/EXECUTIVE MEMBERS/Ashwant P.png", objectPosition: "top" },
    { name: "KEERTHANA JANAKIRAMAN", role: "Executive Member", image: "/EXECUTIVE MEMBERS/KEERTHANA JANAKIRAMAN.jpg", objectPosition: "50% 25%", scale: 1.5 },
    { name: "Kanchan R", role: "Executive Member", image: "/EXECUTIVE MEMBERS/Kanchan R.jpg" },
    { name: "Nainikaelarahakarthikha S", role: "Executive Member", image: "/EXECUTIVE MEMBERS/Nainikaelarahakarthikha. S.png" },
    { name: "sabiya M", role: "Executive Member", image: "/EXECUTIVE MEMBERS/sabiya M.jpeg" },
    { name: "Bhavana G", role: "Executive Associate", image: "/EXECUTIVE ASSOCIATES/Bhavana G.jpg" },
    { name: "Gaurav Kumar", role: "Executive Associate", image: "/EXECUTIVE ASSOCIATES/Gaurav Kumar (EA).png" },
    { name: "Kesavanavya", role: "Executive Associate", image: "/EXECUTIVE ASSOCIATES/Kesavanavya.jpg", objectPosition: "top" },
    { name: "Mirthun K S", role: "Executive Associate", image: "/EXECUTIVE ASSOCIATES/Mirthun K S.jpg" },
    { name: "jashwanth", role: "Executive Associate", image: "/EXECUTIVE ASSOCIATES/jashwanth.jpg" },
  ],
  "Web Team": [
    { name: "Aravindrajan A", role: "Web Team Lead", image: "/WEB TEAM/Aravindrajan A.jpg" },
    { name: "Diya S", role: "Web Team Member", image: "/WEB TEAM/Diya.S.jpg" },
    { name: "Sooraj D", role: "Web Team Member", image: "/WEB TEAM/Sooraj D.jpg" },
    { name: "Thamizhanban V", role: "Web Team Member", image: "/WEB TEAM/Thamizhanban V.jpg" },
  ],
  "Design Team": [
    { name: "Nantha Kishore S", role: "Design Team Lead", image: "/DESIGN TEAM/Nantha Kishore S.png", objectPosition: "top" },
    { name: "Lakshmipriya M", role: "Design Team Member", image: "/DESIGN TEAM/Lakshmipriya.M.jpg", objectPosition: "top" },
    { name: "M.Shamruth harish", role: "Design Team Member", image: "/DESIGN TEAM/M.Shamruth harish.PNG", objectPosition: "top" },
    { name: "Malathi R", role: "Design Team Member", image: "/DESIGN TEAM/Malathi R.jpg" },
    { name: "Yogavarshini M", role: "Design Team Member", image: "/DESIGN TEAM/Yogavarshini M.jpg", objectPosition: "top" },
  ],
  "Content Team": [
    { name: "Mona Shree", role: "Content Team Lead", image: "/CONTENT TEAM/Mona Shree.jpeg" },
    { name: "Konduru Sandhya", role: "Content Team Member", image: "/CONTENT TEAM/Konduru Sandhya.jpg" },
    { name: "Mithuna J", role: "Content Team Member", image: "/CONTENT TEAM/Mithuna J content.jpg", objectPosition: "top" },
    { name: "R.Lekshita Pranavi", role: "Content Team Member", image: "/CONTENT TEAM/R.Lekshita Pranavi.jpg" },
    { name: "Sai Vignesh P", role: "Content Team Member", image: "/CONTENT TEAM/Sai Vignesh.P.png", objectPosition: "top" },
  ],
  "Marketting And Outreach Team": [
    { name: "Arpitha Paraneetharan", role: "Marketing Head", image: "/MARKETING & OUTREACH TEAM/Arpitha Paraneetharan.jpeg" },
    { name: "Bhushika Rameshbabu", role: "Outreach Head", image: "/MARKETING & OUTREACH TEAM/Bhushika Rameshbabu.jpg" },
    { name: "Balaji B", role: "Marketting Team Member", image: "/MARKETING & OUTREACH TEAM/Balaji.B.jpg" },
    { name: "Sabharish S", role: "Marketting Team Member", image: "/MARKETING & OUTREACH TEAM/Sabharish S.jpg", objectPosition: "top" },
    { name: "Yaathra P", role: "Marketting Team Member", image: "/MARKETING & OUTREACH TEAM/Yaathra P.png", objectPosition: "top" },
  ],
  "Photography Team": [
    { name: "abdul", role: "Photography Team Member", image: "/PHOTOGRAPHY & VIDEOGRAPHY/abdul.jpeg" },
  ],
  "Faculty Co-ordinator": [
    { name: "Dr. G Janaka Sudha", role: "Faculty Coordinator", image: "/js.webp" },
    { name: "Mr. K Srinivasan", role: "Faculty Coordinator", image: "/srinivasan.webp" },
    { name: "Mr. R Gnanavel", role: "Faculty Coordinator", image: "/vel.webp" },
  ],
};
