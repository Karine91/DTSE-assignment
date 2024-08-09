import { getFormattedDaysRange } from "./date-utils";
import { render, screen } from "@/testing/test-utils";

describe("date range format", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("should use current date from 00:00 to current time if range not provided", () => {
    jest.setSystemTime(new Date("2024-07-09T07:00:00").getTime());

    const dateFormat = "dd/MM/yyyy HH:mm";
    const data = getFormattedDaysRange(undefined, dateFormat);
    render(<div>{data}</div>);

    expect(
      screen.getByText("09/07/2024 00:00 - 09/07/2024 07:00")
    ).toBeInTheDocument();
  });

  test("should use current date from 00:00 to current time if provided only 'from' date", () => {
    jest.setSystemTime(new Date("2024-08-09T07:00:00").getTime());

    const dateFormat = "dd/MM/yyyy HH:mm";
    const data = getFormattedDaysRange({ from: new Date() }, dateFormat);
    render(<div>{data}</div>);

    expect(
      screen.getByText("09/08/2024 00:00 - 09/08/2024 07:00")
    ).toBeInTheDocument();
  });

  test("should use end date with 23:59 time if end date before current day", () => {
    jest.setSystemTime(new Date("2024-08-09T07:00:00").getTime());

    const dateFormat = "dd/MM/yyyy HH:mm";
    const data = getFormattedDaysRange(
      {
        from: new Date("2024-08-05T07:00:00"),
        to: new Date("2024-08-06T07:00:00"),
      },
      dateFormat
    );
    render(<div>{data}</div>);

    expect(
      screen.getByText("05/08/2024 00:00 - 06/08/2024 23:59")
    ).toBeInTheDocument();
  });

  test("should use time from 0 to current hours if both start and end date is current day", () => {
    jest.setSystemTime(new Date("2024-08-09T07:00:00").getTime());

    const dateFormat = "dd/MM/yyyy HH:mm";
    const data = getFormattedDaysRange(
      {
        from: new Date("2024-08-09T07:00:00"),
        to: new Date("2024-08-09T07:00:00"),
      },
      dateFormat
    );
    render(<div>{data}</div>);

    expect(
      screen.getByText("09/08/2024 00:00 - 09/08/2024 07:00")
    ).toBeInTheDocument();
  });
});
