import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ExcelTable from '../components/ExcelTable';
import Modal from '../components/Modal';
import { ShieldAlert } from 'lucide-react';

export default function Auditors() {
  const { auditors, addAuditor } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    status: 'Active'
  });

  const columns = [
    { header: 'ID', accessor: 'id', sortable: true },
    { header: 'Full Name', accessor: 'name', sortable: true },
    { header: 'Official Email', accessor: 'email', sortable: true },
    { header: 'Username', accessor: 'username', sortable: true },
    { header: 'Active Assignments', accessor: 'assignments', sortable: true },
    { header: 'Status', accessor: 'status', sortable: true, isStatus: true },
  ];

  const filterOptions = [
    { label: 'Status', key: 'status', options: ['Active', 'Inactive'] }
  ];

  const tableActions = [
    { label: 'View Assignments', onClick: (row) => alert(`Assignments for: ${row.name}`) },
    { label: 'Contact Auditor', onClick: (row) => alert(`Drafting email to: ${row.email}`) },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      alert('All fields are required.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    addAuditor(formData);
    setFormData({ name: '', email: '', username: '', password: '', confirmPassword: '', status: 'Active' });
    setIsModalOpen(false);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Compliance Auditors</h1>
          <p className="page-subtitle">Manage staff auditors, security engineers, assessors, and expertise frameworks.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          + Create Auditor
        </button>
      </div>

      <ExcelTable
        columns={columns}
        data={auditors}
        searchPlaceholder="Search by name, email, username..."
        searchKeys={['name', 'email', 'username']}
        filterOptions={filterOptions}
        actions={tableActions}
        tableName="Auditors_Registry"
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Auditor">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Christian Wolff"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Official Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="auditor@cyberaries.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. c_wolff"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-input"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="modal-footer" style={{ margin: '24px -24px -24px -24px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <ShieldAlert size={16} /> Create Auditor
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
