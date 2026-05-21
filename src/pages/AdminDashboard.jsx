import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from 'recharts';


export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 1247, stores: 342, ratings: 5689, avgRating: 4.2 });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentStores, setRecentStores] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/admin/dashboard-stats');
        if (res.data) {
          setStats(res.data.stats || { users: 1247, stores: 342, ratings: 5689, avgRating: 4.2 });
          setRecentUsers(res.data.recentUsers || []);
          setRecentStores(res.data.recentStores || []);
          setChartData(res.data.chartData || []);
        }
      } catch (err) {
        
        
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Arial, sans-serif', backgroundColor: '#f3f4f6' }}>
      
      {/* १. पर्पल टॉप बार */}
      <div style={{ backgroundColor: '#6366F1', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>Store Rating Platform - Admin Dashboard</h2>
        <div style={{ textAlign: 'right', fontSize: '13px' }}>
          <div style={{ fontWeight: 'bold' }}>Welcome, Admin</div>
          <button
            onClick={() => {
            localStorage.clear();
            window.location.href = "/";
            }}
            style={{
              marginTop: "8px",
              padding: "6px 12px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
              }}
            >
              Logout
          </button>
          <div style={{ opacity: 0.8 }}>prachilande47@gmail.com</div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        
        {/* २. डार्क ग्रे साईडबार */}
        <div style={{ width: '240px', backgroundColor: '#2A3E54', color: '#c7d1dd', padding: '20px 10px' }}>
          <div style={{ backgroundColor: '#3E5267', color: 'white', padding: '12px', borderRadius: '6px', marginBottom: '8px', cursor: 'pointer', fontWeight: 'bold' }}>📊 Dashboard</div>
          <div style={{ padding: '12px', cursor: 'pointer' }}onClick={() => window.location.href="/Admin/users"}>👥 Users Management </div>
          <div style={{ padding: '12px', cursor: 'pointer' }}onClick={() => window.location.href="/stores"}>🏪 Stores Management</div>
          <div style={{ padding: '12px', cursor: 'pointer' }}onClick={() => window.location.href="/ratings"}>⭐ Ratings Overview</div>
          
        </div>

        {/* ३. मुख्य माहिती विभाग */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          
          {/* ४ रंगांचे स्टॅट्स कार्ड्स */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            <div style={{ backgroundColor: '#3B82F6', color: 'white', padding: '20px', borderRadius: '6px', textAlign: 'center' }}>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '32px' }}>{stats.users}</h2>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Users</div>
            </div>
            <div style={{ backgroundColor: '#EF4444', color: 'white', padding: '20px', borderRadius: '6px', textAlign: 'center' }}>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '32px' }}>{stats.stores}</h2>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Stores</div>
            </div>
            <div style={{ backgroundColor: '#F59E0B', color: 'white', padding: '20px', borderRadius: '6px', textAlign: 'center' }}>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '32px' }}>{stats.ratings}</h2>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Ratings</div>
            </div>
            <div style={{ backgroundColor: '#10B981', color: 'white', padding: '20px', borderRadius: '6px', textAlign: 'center' }}>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '32px' }}>{stats.avgRating}</h2>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Avg Rating</div>
            </div>
          </div>

          {/* टेबल्स ग्रिड (Users & Stores) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '24px' }}>
            
            {/* रीसेंट युझर्स टेबल */}
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#374151', fontSize: '18px' }}>Recent Users</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e5e7eb', color: '#6b7280' }}>
                    <th style={{ paddingBottom: '10px' }}>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th style={{ textAlign: 'center' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((u, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 0', fontWeight: 'bold', color: '#111827' }}>{u.name}</td>
                      <td style={{ color: '#6b7280' }}>{u.email}</td>
                      <td style={{ color: '#374151' }}>{u.role}</td>
                      <td style={{ textAlign: 'center' }}><span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: u.status === 'active' ? '#10B981' : '#EF4444' }}></span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* रीसेंट स्टोअर्स टेबल */}
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#374151', fontSize: '18px' }}>Recent Stores</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #e5e7eb', color: '#6b7280' }}>
                    <th style={{ paddingBottom: '10px' }}>Store Name</th>
                    <th>Owner</th>
                    <th style={{ textAlign: 'center' }}>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStores.map((s, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 0', fontWeight: 'bold', color: '#111827' }}>{s.storeName}</td>
                      <td style={{ color: '#6b7280' }}>{s.owner}</td>
                      <td style={{ color: '#F59E0B', fontWeight: 'bold', textAlign: 'center' }}>{s.rating} ★</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ४. ग्रोथ ॲनालिटिक्स चार्ट */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#374151', fontSize: '18px' }}>Platform Growth Analytics</h3>
            <div style={{ height: '240px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} dot={{ r: 5, fill: '#3B82F6' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
