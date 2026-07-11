export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export const teams: Record<string, TeamMember[]> = {
  "Core Team": [
    { name: "Mithun S", role: "President", image: "/mithun.webp" },
    { name: "Kiran M S", role: "Vice President", image: "/kiran.webp" },
    { name: "Srinidhi S", role: "Vice President", image: "/srinidhi.webp" },
    { name: "Harsh S", role: "Vice President", image: "/harsh.webp" },
    { name: "Jai Krishna Prasath D", role: "Secretary", image: "/jai.webp" },
    { name: "Sarvesh Raghav B", role: "Operations Head", image: "/raghav1.webp" },
    { name: "Ashika Haseen S", role: "Treasurer", image: "/ashika.webp" },
    { name: "Nirrmal G", role: "Joint Secretary", image: "/nirrms.webp" },
  ],
  "Executive Team": [
    { name: "Johan A", role: "Executive Associative", image: "/johan.webp" },
    { name: "Aravintth T", role: "Executive Associative", image: "/aravintth.webp" },
    { name: "Shrinithi Dasarathy", role: "Executive Associative", image: "/shrinithi.webp" },
    { name: "Kavya K P", role: "Executive Associative", image: "/kavya.webp" },
    { name: "Mirthun K S", role: "Executive Member", image: "/mirthun.webp" },
    { name: "Shree Kowsik S B", role: "Executive Member", image: "/kowsik.webp" },
    { name: "Salai B Dharshini", role: "Executive Member", image: "/salai.webp" },
    { name: "C Dhinesh", role: "Executive Member", image: "/dhinesh.webp" },
    { name: "Alagu Manikandan", role: "Executive Member", image: "/am.webp" },
    { name: "Rethinagiri S", role: "Executive Member", image: "/rethinagiri.webp" },
    { name: "Arpitha Paraneetharan", role: "Executive Member", image: "/arpritha.webp" },
    { name: "Kesava Navya", role: "Executive Member", image: "/kesava.webp" },
  ],
  "Web Team": [
    { name: "Sharmile S", role: "Web Team Lead", image: "/sharmile.webp" },
    { name: "Sri Ram R", role: "Web Team Member", image: "/sri.webp" },
    { name: "B Jashwanth Kumar", role: "Web Team Member", image: "/jaswanth.webp" },
  ],
  "Design Team": [
    { name: "Aneesh Kumar R", role: "Design Team Head", image: "/aneesh.webp" },
    { name: "Nantha Kishore S", role: "Design Team Member", image: "/nantha.webp" },
    { name: "Kanisha S", role: "Design Team Head", image: "/kanisha.webp" },
    { name: "Rajeshwari B C", role: "Design Team Member", image: "/raje.webp" },
    { name: "Kavinithi R P", role: "Design Team Member", image: "/kavinithi.webp" },
  ],
  "Content Team": [
    { name: "Sadhana S", role: "Content Team Head", image: "/sadhana.webp" },
    { name: "Mona Shree", role: "Content Team Member", image: "/mona.webp" },
    { name: "Vaishnavi Chitraa M", role: "Content Team Member", image: "/vaishnavi.webp" },
    { name: "Tharun Kumar T", role: "Content Team Member", image: "/tk.webp" },
  ],
  "Marketting And Outreach Team": [
    { name: "Shashank N S", role: "Marketting Team Head", image: "/shashank.webp" },
    { name: "Hariganesh A", role: "Outreach Team Head", image: "/hari.webp" },
    { name: "Priyanka A", role: "Marketting Team Member", image: "/priyanka.webp" },
    { name: "Sharmila M", role: "Marketting Team Member", image: "/sharmila.webp" },
    { name: "Bhavana G", role: "Marketting Team Member", image: "/bhavana.webp" },
  ],
  "Photography Team": [
    { name: "V Raghav", role: "Photography Team Member", image: "/raghav.webp" },
  ],
  "Faculty Co-ordinator": [
    { name: "Dr. G Janaka Sudha", role: "Faculty Coordinator", image: "/js.webp" },
    { name: "Mr. K Srinivasan", role: "Faculty Coordinator", image: "/srinivasan.webp" },
    { name: "Mr. R Gnanavel", role: "Faculty Coordinator", image: "/vel.webp" },
  ],
};
