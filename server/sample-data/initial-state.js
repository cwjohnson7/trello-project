const initialState = {
  user: {
    _id: "sf24d",
    firstName: "Yegor",
    lastName: "Rodin",
    orgId: '64a720b83b8a0cd93ea4f327',
    orgName: "Parsity"
  },
  boards: [
    {
      _id: "089sd",
      title: "Daily Planner",
      lists: [
        {
          _id: "j2h43",
          name: "To Do",
          cards: [
            { _id: "sdfff", name: "Work Out" },
            { _id: "234dd", name: "Meal Prep" },
            { _id: "dgdsf", name: "Walk a Dog" },
            { _id: "gsf32", name: "Practice Coding" },
          ],
        },
        { _id: "34rfc", name: "Doing", cards: [] },
        { _id: "ok097", name: "Done", cards: [] },
      ],
    },
    {
      _id: "klm87",
      title: "Networking",
      lists: [
        {
          _id: "kiji5",
          name: "To Do",
          cards: [
            { _id: "vvbbh", name: "Attend Meetup" },
            { _id: "9idfd", name: "Follow up with CTO" },
            { _id: "00233", name: "Post on LinkedIn" },
            { _id: "vdfv4", name: "Speak at a Conference" },
          ],
        },
        { _id: "sdf34", name: "Doing", cards: [] },
        { _id: "09fgd", name: "Done", cards: [] },
      ],
    },
  ],
};