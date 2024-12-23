import {OverviewCards} from '../components/admin/dashboard/overview'; 
import {RecentActivity} from '../components/admin/dashboard/recent-activity';
import {PerformanceChart} from '../components/admin/dashboard/performance-chart';
function DashBoard() {
    return (
        <div className="container mx-auto px-6 py-8">
         <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard view</h1>
         <OverviewCards />
         <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <RecentActivity />
              <PerformanceChart />
            </div>
        </div>
      );
}

export default DashBoard;
