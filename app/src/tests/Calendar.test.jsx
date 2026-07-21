import { render, screen } from "@testing-library/react";

import Calendar from "../components/Calendar";

const events = [
  {
    id: 1,
    title: "Instagram Campaign",
    date: "2026-07-22",
    completed: false,
    color: "#2563eb"
  },
  {
    id: 2,
    title: "LinkedIn Article",
    date: "2026-07-24",
    completed: true,
    color: "#9333ea"
  }
];

describe("Calendar Component", () => {

  test("renders all events", () => {

    render(
      <Calendar
        events={events}
        toggleCompleted={() => {}}
      />
    );

    expect(
      screen.getByText("Instagram Campaign")
    ).toBeInTheDocument();

    expect(
      screen.getByText("LinkedIn Article")
    ).toBeInTheDocument();

  });

});
