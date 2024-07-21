import { Document, Model } from "mongoose";

interface MonthData {
  month: string;
  count: number;
}

// This function generates analytics for the last 12 months
export async function generateLastMonthDate<T extends Document>(
  model: Model<T>
): Promise<{ Last12Months: MonthData[] }> {
  // This line initializes an empty array named Last12Months that will store the data for the last 12 months.
  const Last12Months: MonthData[] = [];
  const currentDate = new Date();

   // यो लूप १२ पटक दोहोरिन्छ ताकि पछिल्लो १२ महिनाको डेटा उत्पन्न होस्
  for (let i = 0; i < 12; i++) {
    // Calculate the end date as the first day of the current month minus i months
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 1);
    // Calculate the start date as the first day of the previous month
    const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1);
    
    // Format the month and year
    const monthYear = endDate.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    try {
      // Count the documents within the date range
      const count = await model.countDocuments({
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      });

      // Add the month data to the list
      Last12Months.push({ month: monthYear, count });
    } catch (error) {
      console.error(`Error counting documents for ${monthYear}:`, error);
      // Optionally handle the error (e.g., add a default count, rethrow the error, etc.)
      Last12Months.push({ month: monthYear, count: 0 });
    }
  }
  
  // Return the array of month data
  return { Last12Months };
}
