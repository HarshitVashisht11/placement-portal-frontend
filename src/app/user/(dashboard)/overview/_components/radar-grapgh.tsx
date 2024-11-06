"use client";

import React, { PureComponent } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  {
    subject: "Software Developer",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "QA",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Business Analyst",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Web Developer",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "Patent Analyst",
    A: 65,
    B: 85,
    fullMark: 150,
  },
];

export default class RadarGraph extends PureComponent {
  static demoUrl = "https://codesandbox.io/p/sandbox/simple-radar-chart-2p5sxm";

  render() {
    return (
      <Card className="h-full w-full flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Job Roles Offered</CardTitle>
          <CardDescription>July - Oct 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Showing the variation in various roles offered by different
            companies.
          </div>
        </CardFooter>
      </Card>
    );
  }
}
