import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { TiInputChecked } from "react-icons/ti";
import { IoIosPerson } from "react-icons/io";
import { TbCurrencyDirham } from "react-icons/tb";
import { FiBell, FiSearch } from "react-icons/fi";
import Header from "./Header";

const revenueData = [
  { name: "Sun", value: 300 },
  { name: "Mon", value: 200 },
  { name: "Tue", value: 400 },
  { name: "Wed", value: 500 },
  { name: "Thu", value: 300 },
  { name: "Fri", value: 600 },
  { name: "Sat", value: 400 },
];

const destinationsData = [
  { name: "Tower of London", value: 70 },
  { name: "British Museum", value: 20 },
  { name: "London Eye", value: 10 },
];

const COLORS = ["#4318FF", "#6AD2FF", "#EFF4FB"];

const Dashboard = () => {
  const totalDestinationsValue = destinationsData.reduce(
    (total, destination) => total + destination.value,
    0
  );

  return (
    <div className="flex flex-col w-full bg-gray-100 min-h-screen">
      <div className="p-4 sm:p-6 md:p-8">
        <Header />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          <div className="bg-[#E8F5FE] p-4 rounded-lg flex items-center">
            <TiInputChecked className="w-12 h-12 text-[#6AD2FF] mr-4" />
            <div>
              <h3 className="text-sm text-[#0000006B]">Total Bookings</h3>
              <p className="text-2xl sm:text-3xl text-[#000000] font-bold">
                1200
              </p>
            </div>
          </div>
          <div className="bg-[#E8F5FE] p-4 rounded-lg flex items-center">
            <IoIosPerson className="w-12 h-12 text-[#6AD2FF] mr-4" />
            <div>
              <h3 className="text-sm text-[#0000006B]">Total New Customers</h3>
              <p className="text-2xl sm:text-3xl text-[#000000] font-bold">
                1200
              </p>
            </div>
          </div>
          <div className="bg-[#E8F5FE] p-4 rounded-lg flex items-center">
            <TbCurrencyDirham className="w-12 h-12 text-[#6AD2FF] mr-4" />
            <div>
              <h3 className="text-sm text-[#0000006B]">Total Earnings</h3>
              <p className="text-2xl sm:text-3xl text-[#000000] font-bold">
                1200
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Top Destinations</h3>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={destinationsData}
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {destinationsData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              {destinationsData.map((destination, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm text-gray-700 mb-2"
                >
                  <span>{destination.name}</span>
                  <span>
                    {(
                      (destination.value / totalDestinationsValue) *
                      100
                    ).toFixed(2)}
                    %
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
