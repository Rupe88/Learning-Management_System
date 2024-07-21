import { Document, Model } from "mongoose";

interface MonthData {
  month: string;
  count: number;
}
// this func generate last 12 months analytics
export async function generateLastMonthDate<T extends Document>(
  model: Model<T>
): Promise<{
  Last12Months: MonthData[];
}> {
  //This line initializes an empty array named Last12Months that will store the data for the last 12 months.
  const Last12Months: MonthData[] = [];
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  //this for loop iterates 12 times in last 12 months array

  for (let i = 11; i >= 0; i--) {
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - i * 28
    );
    const startDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate() - 28
    );
    const monthYear = endDate.toLocaleString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const count = await model.countDocuments({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    });
    Last12Months.push({ month: monthYear, count });
  }
  return { Last12Months };
}
