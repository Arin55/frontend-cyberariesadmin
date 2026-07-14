import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const AuditProgress = () => {
  const overallData = [
    { name: 'Completed', value: 65, color: 'var(--status-green-text)' },
    { name: 'Pending', value: 35, color: 'var(--border-color)' },
  ];

  const domainData = [
    { name: 'Identify', completed: 80, pending: 20 },
    { name: 'Protect', completed: 60, pending: 40 },
    { name: 'Detect', completed: 45, pending: 55 },
    { name: 'Respond', completed: 70, pending: 30 },
    { name: 'Recover', completed: 90, pending: 10 },
  ];

  return (
    <div className="page">
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h1 className="page-title">Audit Progress</h1>
        <p className="page-subtitle">Track completion metrics across all active audits.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>Overall Progress</h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '200px', height: '200px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={overallData}
                    innerRadius={70}
                    outerRadius={90}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                  >
                    {overallData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-main)' }}>65%</span>
              </div>
            </div>
            
            <div style={{ width: '100%', marginTop: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Total Controls</span>
                <span style={{ fontWeight: 600 }}>29</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Completed</span>
                <span style={{ fontWeight: 600, color: 'var(--status-green-text)' }}>18</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Pending AI</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>8</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Manual Review</span>
                <span style={{ fontWeight: 600, color: 'var(--status-yellow-text)' }}>3</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>Progress by Security Domain (CSF)</h3>
          <div style={{ height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={domainData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-color)" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 13 }} width={80} />
                <Tooltip cursor={{ fill: 'var(--bg-main)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Bar dataKey="completed" stackId="a" fill="var(--primary)" radius={[0, 0, 0, 0]} barSize={24} />
                <Bar dataKey="pending" stackId="a" fill="var(--border-color)" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditProgress;
