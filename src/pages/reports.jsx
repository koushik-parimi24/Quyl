import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement,
  Title, 
  Tooltip, 
  Legend,
  PointElement
} from 'chart.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const ReportsPage = () => {
  // Sample data for charts
  const barChartData = {
    labels: ['Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5'],
    datasets: [
      {
        label: 'Student Performance',
        data: [65, 78, 82, 75, 90],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'Course Progress',
        data: [10, 25, 45, 70, 85],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Reports</h1>

      <Tabs defaultValue="performance" className="w-full mb-8">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Student Performance by Chapter</CardTitle>
              <CardDescription>Average scores across all students</CardDescription>
            </CardHeader>
            <CardContent>
              <Bar data={barChartData} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Course Progress Over Time</CardTitle>
              <CardDescription>Percentage of course completed</CardDescription>
            </CardHeader>
            <CardContent>
              <Line data={lineChartData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Students</CardTitle>
            <CardDescription>Based on overall scores</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>1. John Doe - 95%</li>
              <li>2. Jane Smith - 92%</li>
              <li>3. Alex Johnson - 90%</li>
              <li>4. Emily Brown - 88%</li>
              <li>5. Michael Lee - 87%</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chapter Completion Rates</CardTitle>
            <CardDescription>Percentage of students who completed each chapter</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Chapter 1: 100%</li>
              <li>Chapter 2: 95%</li>
              <li>Chapter 3: 85%</li>
              <li>Chapter 4: 75%</li>
              <li>Chapter 5: 60%</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;

