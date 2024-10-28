"use client";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const data = [
  {
    name: "Page A",
    CSE: 4000,
    ECE: 2400,
    MECH: 2400,
    CIV: 2400,

    amt: 2400,
  },
  {
    name: "Page B",
    CSE: 3000,
    ECE: 1398,
    MECH: 1398,
    CIV: 1398,

    amt: 2210,
  },
  {
    name: "Page C",
    CSE: 2000,
    ECE: 9800,
    MECH: 9800,
    CIV: 9800,

    amt: 2290,
  },
  {
    name: "Page D",
    CSE: 2780,
    ECE: 3908,
    MECH: 3908,
    CIV: 3908,

    amt: 2000,
  },
  {
    name: "Page E",
    CSE: 1890,
    ECE: 4800,
    MECH: 4800,
    CIV: 4800,

    amt: 2181,
  },
  {
    name: "Page F",
    CSE: 2390,
    ECE: 3800,
    MECH: 3800,
    CIV: 3800,

    amt: 2500,
  },
  {
    name: "Page G",
    CSE: 3490,
    ECE: 4300,
    MECH: 4300,
    CIV: 4300,

    amt: 2100,
  },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default class MixBarGraph extends PureComponent {
  static demoUrl = "https://codesandbox.io/p/sandbox/mixed-bar-chart-lv3l68";

  render() {
    return (
      <Card className="h-full w-full">
        <CardHeader>
          <CardTitle>Appeared to Placed Ratio</CardTitle>
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[310px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="CSE" stackId="a" fill="#e76e50" />
              <Bar dataKey="ECE" stackId="a" fill="#2a9d90" />
              <Bar dataKey="MECH" stackId="a" fill="#e8c468" />
              <Bar dataKey="CIV" stackId="a" fill="#274754" />

              <Bar dataKey="amt" fill="#ffc658" />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                January - June 2024
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    );
  }
}
