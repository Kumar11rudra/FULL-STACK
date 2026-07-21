import { render, screen, fireEvent } from "@testing-library/react";

import EventCard from "../components/EventCard";

const event = {
  id: 1,
  title: "Instagram Campaign",
  date: "2026-07-22",
  completed: false,
  color: "#2563eb"
};

describe("EventCard Component", () => {

  test("renders event information", () => {

    render(
      <EventCard
        event={event}
        toggleCompleted={() => {}}
      />
    );

    expect(
      screen.getByText("Instagram Campaign")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Pending/i)
    ).toBeInTheDocument();

  });

  test("calls toggleCompleted when button is clicked", () => {

    const mockToggle = jest.fn();

    render(
      <EventCard
        event={event}
        toggleCompleted={mockToggle}
      />
    );

    fireEvent.click(
      screen.getByRole("button")
    );

    expect(mockToggle).toHaveBeenCalledWith(1);

  });

});
