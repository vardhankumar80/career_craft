"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BriefcaseIcon, LineChart, TrendingUp, TrendingDown, Brain } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DashboardView = ({ insights }) => {
  // Transform salary data safely
  const salaryData = (insights?.salaryRanges || []).map((range) => ({
    name: range.role,
    min: (range.min || 0) / 1000,
    max: (range.max || 0) / 1000,
    median: (range.median || 0) / 1000,
  }));

  const getDemandLevelColor = (level = "") => {
    switch (level?.toLowerCase()) {
      case "high": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook = "") => {
    switch (outlook?.toLowerCase()) {
      case "positive": return { icon: TrendingUp, color: "text-green-500" };
      case "neutral": return { icon: LineChart, color: "text-yellow-500" };
      case "negative": return { icon: TrendingDown, color: "text-red-500" };
      default: return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const { icon: OutlookIcon, color: outlookColor } = getMarketOutlookInfo(insights?.marketOutlook);

  // FIX: Use updatedAt from Prisma
  const lastUpdatedDate = insights?.updatedAt 
    ? format(new Date(insights.updatedAt), "dd/MM/yyyy") 
    : "Recently";

  const nextUpdateDistance = insights?.nextUpdate 
    ? formatDistanceToNow(new Date(insights.nextUpdate), { addSuffix: true })
    : "scheduled";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline">Last updated: {lastUpdatedDate}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Outlook Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Market Outlook</CardTitle>
            <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights?.marketOutlook || "Neutral"}</div>
            <p className="text-xs text-muted-foreground">Next update {nextUpdateDistance}</p>
          </CardContent>
        </Card>

        {/* Growth Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Industry Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(insights?.growthRate || 0).toFixed(1)}%</div>
            <Progress value={insights?.growthRate || 0} className="mt-2" />
          </CardContent>
        </Card>

        {/* Demand Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights?.demandLevel || "Medium"}</div>
            <div className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(insights?.demandLevel)}`} />
          </CardContent>
        </Card>

        {/* Skills Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {(insights?.topSkills || []).map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Salary Ranges by Role</CardTitle>
          <CardDescription>Values in thousands (K)</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="min" fill="#94a3b8" name="Min Salary" />
              <Bar dataKey="median" fill="#64748b" name="Median Salary" />
              <Bar dataKey="max" fill="#475569" name="Max Salary" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Trends & Recs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
            <CardHeader><CardTitle>Key Industry Trends</CardTitle></CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {(insights?.keyTrends || []).map((t, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {t}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Recommended Skills</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {(insights?.recommendedSkills || []).map(s => <Badge key={s} variant="outline">{s}</Badge>)}
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;