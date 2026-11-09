import GuidePage from "./GuidePage";

const LEADER = [
  {
    title: "Meetup Leader",
    intro: "What is expected of a meetup leader?",
    subsections: [
      {
        subtitle: "Initiate meetups",
        paragraphs: [
          "**Be a meetup leader!** Challenge yourself and take the lead to organize online meetups with friends from different countries and time zones. It can be a fun and rewarding experience.",
          "Click on the [Online Meetup Resource Pack](https://docs.google.com/presentation/d/1c1YjgzS9AnoeVSe1o9_EGE3688FqUOI96-Y41caZVcU/edit) to help you get started.",
        ],
      },
    ],
  },
  {
    title: "What do meetup leaders do",
    subsections: [
      {
        subtitle: "Step by step",
        bullets: [
          "**Plan ahead:** Decide to organize a meetup and prepare early.",
          "**Coordinate with one person first:** Agree on a date and time with at least one group member.",
          "**Choose a platform:** Select Zoom, Teams, Google Meet, or another suitable tool.",
          "**Invite the group:** Post the meetup details (date, time, platform link) in the group chat.",
          "**Set an agenda and send reminders:** Decide what you’ll talk about and remind your group before the meetup.",
          "**Facilitate and record:** Lead the meetup, keep it engaging, and record the session.",
          "**Submit the recording:** Upload the recording using the provided form.",
        ],
      },
    ],
  },
  {
    title: "Conversation Tips",
    subsections: [
      {
        subtitle: "Ask Follow-Up Questions",
        paragraphs: [
          "Based on what the other person has said, ask questions that dig deeper into the topic.",
          "**Example:** You mentioned you enjoy cooking. What’s your favorite dish, and how do you prepare it?",
        ],
      },
      {
        subtitle: "Share Personal Experiences",
        paragraphs: [
          "Relate to the topic by sharing your own experiences, which can lead to more discussion.",
          "**Example:** I had a similar experience when I traveled abroad.",
        ],
      },
      {
        subtitle: "Use Transition Phrases",
        paragraphs: [
          "Transition smoothly from one topic to another related one to keep the conversation flowing.",
          "**Example:** Speaking of travel, have you ever been to Asia?",
        ],
      },
      {
        subtitle: "Ask Open-Ended Questions",
        paragraphs: [
          "These questions cannot be answered with a simple “yes” or “no” and encourage the other person to elaborate.",
          "**Example:** What do you enjoy most about your part-time job?",
        ],
      },
      {
        subtitle: "Reflective Responses",
        paragraphs: [
          "Reflect back what the other person has said to validate their feelings and encourage them to continue.",
          "**Example:** It sounds like you had a great vacation. Tell me more about the places you visited.",
        ],
      },
      {
        subtitle: "Express Curiosity",
        paragraphs: [
          "Show genuine curiosity and interest in the other person’s thoughts and experiences.",
          "**Example:** I’m really curious about your background. What led you to move to this city?",
        ],
      },
    ],
  },
];

export default function StudentLeader() {
  return (
    <GuidePage
      eyebrow="FOR STUDENTS / MEETUP LEADER"
      title="Meetup"
      highlight="Leader."
      sections={LEADER}
    />
  );
}
