import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const revenueData = [
    { name: 'Sunday', value: 300 },
    { name: 'Monday', value: 200 },
    { name: 'Tuesday', value: 400 },
    { name: 'Wednesday', value: 500 },
    { name: 'Thursday', value: 300 },
    { name: 'Friday', value: 600 },
    { name: 'Saturday', value: 400 },
];

const destinationsData = [
    { name: 'Burj Khalifa Dubai', value: 70 },
    { name: 'Future museum Dubai', value: 20 },
    { name: 'Dubai mall', value: 10 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const Dashboard = () => {
    return (
        <div className="flex w-full bg-gray-100 min-h-screen">
            {/* Sidebar */}
            

            {/* Main Content */}
            <div className="flex-1 p-8">
                <header className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">DASHBOARD</h2>
                    <div className="flex items-center">
                        <input type="text" placeholder="Search" className="p-2 rounded mr-4" />
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    </div>
                </header>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-sm text-gray-500 mb-2">Total Bookings</h3>
                        <p className="text-3xl font-bold">1200</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-sm text-gray-500 mb-2">Total New Customer</h3>
                        <p className="text-3xl font-bold">1200</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-sm text-gray-500 mb-2">Total Earning</h3>
                        <p className="text-3xl font-bold">1200</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold mb-4">Revenue overview</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h3 className="text-lg font-semibold mb-4">Top destinations</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={destinationsData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {destinationsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Total Trips */}
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold mb-4">Total trips: 1200</h3>
                    <div className="flex mb-2">
                        <div className="flex-grow bg-blue-200 h-8" style={{ width: '70%' }}></div>
                        <div className="flex-grow bg-blue-400 h-8" style={{ width: '20%' }}></div>
                        <div className="flex-grow bg-purple-500 h-8" style={{ width: '10%' }}></div>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Done: 1250</span>
                        <span>Booked: 250</span>
                        <span>Cancelled: 110</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;