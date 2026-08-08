export const eventData = {
  title: "Prompt Forge",
  description: "Learn Prompt Engineering and compete in an AI Image Recreation Challenge.",
  date: "12 August 2026",
  time: "6:30 PM",
  mode: "Online",
  poster: "/master_before_you_compete_ai.png",
  registrationDeadline: "10 August 2026",
  aboutText: [
    "Prompt Forge is an online technical event designed to introduce participants to prompt engineering through a hands-on workshop followed by an AI image recreation challenge. Participants will learn how to craft effective prompts and apply those skills in two competitive rounds.",
    "The event focuses on creativity, prompt quality, and efficiency while encouraging practical learning in a fun and competitive environment."
  ],
  highlights: [
    {
      icon: "Brain",
      title: "Prompt Engineering Workshop",
      description: "Learn the fundamentals of writing effective prompts.",
    },
    {
      icon: "Image",
      title: "AI Image Challenge",
      description: "Recreate provided images using AI generation tools.",
    },
    {
      icon: "Layers",
      title: "2 Competition Rounds",
      description: "Test your skills in progressively harder rounds.",
    },
    {
      icon: "Clock",
      title: "Limited Prompt Attempts",
      description: "Optimize prompts within a strict attempt limit.",
    },
    {
      icon: "Laptop",
      title: "Online Event",
      description: "Participate remotely from anywhere.",
    },
    {
      icon: "Award",
      title: "Recognition & Certificates",
      description: "Earn certificates for participation and winning.",
    }
  ],
  schedule: [
    {
      time: "8 Aug, 9:00 AM",
      title: "Registration Opens",
      description: "Secure your spot for Prompt Forge.",
      icon: "Presentation"
    },
    {
      time: "12 Aug, 5:00 PM",
      title: "Registration Closes",
      description: "Final deadline to register for the event.",
      icon: "Clock"
    },
    {
      time: "6:30 PM - 7:10 PM",
      title: "Welcome & Prompt Engineering Workshop",
      description: "Learn the fundamentals of writing effective prompts.",
      icon: "Brain"
    },
    {
      time: "7:15 PM - 7:30 PM",
      title: "Round 1 - Recreate Image",
      description: "Recreate the image using a maximum of 2 Prompts.",
      icon: "Image"
    },
    {
      time: "7:30 PM - 7:40 PM",
      title: "Round 1 Submission",
      description: "Submit Round 1 results via Google Form.",
      icon: "UploadCloud"
    },
    {
      time: "7:40 PM - 8:05 PM",
      title: "Round 2 - Recreate Image",
      description: "Recreate the image using a maximum of 3-4 Prompts.",
      icon: "Image"
    },
    {
      time: "8:05 PM - 8:15 PM",
      title: "Round 2 Submission",
      description: "Submit Round 2 results via Google Form.",
      icon: "UploadCloud"
    },
    {
      time: "8:20 PM - 8:40 PM",
      title: "End of the event",
      description: "Thank you note and event conclusion.",
      icon: "CheckCircle"
    }
  ],
  competitionFormat: {
    description: "The event begins with a hands-on workshop followed by two competitive image recreation rounds. Participants are evaluated based on accuracy, prompt quality, and completion time.",
    stages: [
      {
        id: "workshop",
        icon: "Brain",
        title: "Prompt Engineering Workshop",
        description: "A short interactive session covering prompt writing, optimization techniques, and best practices for AI image generation.",
        details: ["Prompt Fundamentals", "Prompt Optimization", "Best Practices"]
      },
      {
        id: "round1",
        icon: "Image",
        title: "Round 1 — Image Recreation",
        description: "Participants recreate a medium-complexity reference image using a maximum of two prompts.",
        details: ["Medium Difficulty", "Maximum 2 Prompts", "Limited Time"]
      },
      {
        id: "round2",
        icon: "Sparkles",
        title: "Round 2 — Advanced Challenge",
        description: "Participants recreate a more complex reference image while optimizing prompt quality within the allowed prompt limit.",
        details: ["High Difficulty", "Maximum 3–4 Prompts", "Limited Time"]
      },
      {
        id: "evaluation",
        icon: "Award",
        title: "Evaluation Criteria",
        description: "Final rankings are determined by the average score across both rounds.",
        scores: [
          { label: "Image Similarity", points: "40 Marks" },
          { label: "Prompt Quality", points: "40 Marks" },
          { label: "Completion Time", points: "20 Marks" }
        ]
      }
    ],
    submission: {
      requirements: [
        "ChatGPT / LLM Conversation Link",
        "Prompts Used",
        "Final Generated Image"
      ],
      note: "Submissions exceeding the allowed prompt limit will not be considered during evaluation."
    }
  }
};
