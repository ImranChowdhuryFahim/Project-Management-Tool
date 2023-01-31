import Chance from "chance";
import type { CardSummary } from "@/component/Issue/Card";

const chance = new Chance(121);

export function dummyCardSummary(n: number, status: string): CardSummary[] {
  let result: CardSummary[] = [];
  for (let i = 0; i < n; i++) {
    let summary: CardSummary = {
      title: chance.sentence(),
      assignee: chance.name(),
      priority: chance.pickone(["high", "medium", "low"]),
      storyPoint: chance.integer({ min: 1, max: 40 }),
      issueId:
        "PP-" + String(chance.integer({ min: 1, max: 999 })).padStart(3, "0"),
      dueDate: chance.date({ year: 2023, month: 0, date: 31 }),
      status,
    };
    result.push(summary);
  }
  return result;
}
