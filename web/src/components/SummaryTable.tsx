import { useState, useEffect } from "react";
import { HabitDay } from "./HabitDay";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { api } from "../lib/axios";
import dayjs from "dayjs";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
let summaryDates = generateDatesFromYearBeginning();

const minimumSquares = 18 * 7;
let amountOfDaystoFill = minimumSquares - summaryDates.length;

type Summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

interface Props {
  update: boolean;
}

export function SummaryTable({ update }: Props) {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get("/summary").then((response) => {
      setSummary(response.data);
    });
  }, [update]);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => (
          <div
            key={`${weekDay}-${index}`}
            className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
          >
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, "day");
            });

            return (
              <HabitDay
                key={date.toString()}
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
            );
          })}
        {amountOfDaystoFill > 0 &&
          Array.from({ length: amountOfDaystoFill }).map((_, index) => (
            <div
              key={index}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            ></div>
          ))}
      </div>
    </div>
  );
}
