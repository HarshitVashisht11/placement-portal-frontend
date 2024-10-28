"use client";

import * as React from "react";
import { Label, Pie, Sector, PieChart, Legend } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { browser: "chrome", visitors: 18, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 9, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 2, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 3, fill: "var(--color-edge)" },
];

const chartConfig = {
  visitors: {
    label: "Total Students",
  },
  chrome: {
    label: "Computer Science and Engineering",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Electronics and Communication Engineering",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Civil Engineering",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Mechanical Engineering",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function PieGraph() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Number of Students Placed by Branch</CardTitle>
        <CardDescription>July - Oct 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing the number of placed students for each branch.
        </div>
      </CardFooter>
    </Card>
  );
}
