import GuidePage from "./GuidePage";

const GUIDE = [
  {
    title: "Connect in a Nutshell",
    intro: "What can I expect?",
    subsections: [
      {
        subtitle: "What is CONNECT?",
        paragraphs: [
          "It is a program that brings together students from various cultural and linguistic backgrounds through a short-term virtual exchange, usually 4-5 weeks.",
        ],
      },
      {
        subtitle: "Why is CONNECT valuable?",
        paragraphs: [
          "It promotes intercultural communication, linguistic, and ICT skills – these are transferable skills that enable participants to operate effectively in international contexts.",
        ],
      },
      {
        subtitle: "How will students gain from it?",
        bullets: [
          "**English Communicative Competence:** Practice real-world communication in English within a safe and supportive context.",
          "**Intercultural Awareness:** Explore and appreciate diverse cultures while gaining insights into cultural differences and similarities.",
          "**Digital Proficiency:** Develop valuable digital skills for online communication.",
          "**Confidence and Global Connections:** Boost confidence in English while making friends worldwide.",
        ],
      },
    ],
  },
  {
    title: "Specific learning objectives",
    intro: "What can I learn?",
    subsections: [
      {
        subtitle: "Enhance English Confidence",
        paragraphs: [
          "Build students’ confidence in using English by employing diverse communicative strategies.",
        ],
      },
      {
        subtitle: "Promote Intercultural Understanding",
        paragraphs: [
          "Provide opportunities for students to lead and participate in authentic virtual conversations to deepen intercultural understanding.",
        ],
      },
      {
        subtitle: "Develop Digital Proficiency",
        paragraphs: [
          "Increase students’ digital dexterity through exposure to multimodal interaction in semi-synchronous online exchanges.",
        ],
      },
    ],
  },
  {
    title: "How is it carried out?",
    intro: "What is the process before the program?",
    subsections: [
      {
        subtitle: "Set up your account",
        bullets: [
          "**Complete** the online registration form.",
          "**Download** [Telegram](https://telegram.org/) on your mobile device and laptop or PC.",
          "**Create** a Telegram account and use your real name during the program so we know who you are.",
        ],
      },
      {
        subtitle: "Get ready for day one",
        bullets: [
          "**Check** your email for an invitation to join the group via the Telegram join link.",
          "**Turn on** your Telegram notifications to stay updated on the chats.",
          "**Record** a 90-second self-introduction video to upload to your Telegram group on the first day of the program.",
        ],
      },
    ],
  },
  {
    title: "During the Program",
    intro: "What must I do during the program?",
    subsections: [
      {
        subtitle: "Active Participation",
        paragraphs: [
          "Engage daily in text conversations and share photos.",
          "Use this opportunity to improve your English language skills.",
        ],
      },
      {
        subtitle: "Weekly Video Uploads",
        paragraphs: [
          "Create and upload a video each week based on the given theme.",
          "Crafting these videos will also help you develop presentation and ICT skills.",
        ],
      },
      {
        subtitle: "Good to know",
        bullets: [
          "**Beware of time differences:** When scheduling meetings and coordinating with members in different time zones, make use of tools like [Time Zone Converter](https://www.timeanddate.com/worldclock/converter.html), [Timezone Wizard](https://timezonewizard.com), or [UTC Converter](https://savvytime.com/converter/utc) to help you plan meetings effectively.",
          "**Attendance Requirement:** Ensure you attend 2 or more online meetups. These online meetings are essential to the success of your group.",
        ],
      },
    ],
  },
];

export default function StudentGuide() {
  return (
    <GuidePage eyebrow="FOR STUDENTS / GUIDE" title="Student" highlight="Guide." sections={GUIDE} />
  );
}
