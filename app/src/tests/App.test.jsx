import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {

  test("renders application heading", () => {
    render(<App />);

    expect(
      screen.getByText(/Performance Optimized Calendar/i)
    ).toBeInTheDocument();
  });

  test("renders statistics cards", () => {
    render(<App />);

    expect(screen.getByText(/Total Events/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
  });

});
