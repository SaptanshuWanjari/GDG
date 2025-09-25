"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis } from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

export interface CategoryStat {
  name: string;
  value: number;
}

export interface MonthlyStat {
  month: string;
  books: number;
}

export default function AnalyticsCharts({
  categoryStats,
  monthlyStats,
  className,
}: {
  categoryStats: CategoryStat[];
  monthlyStats: MonthlyStat[];
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${className || ""}`}>
      {/* Category Distribution Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Book Categories Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: {
                label: "Books",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="min-h-0 h-64 sm:h-72 md:h-[300px]"
          >
            <PieChart>
              <Pie
                data={categoryStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius="70%"
                fill="#8884d8"
                dataKey="value"
              >
                {categoryStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Monthly Books Added Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Books Added Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              books: {
                label: "Books Added",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="min-h-0 h-64 sm:h-72 md:h-[300px]"
          >
            <BarChart data={monthlyStats} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} interval={0} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="books" fill="#8884d8" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
