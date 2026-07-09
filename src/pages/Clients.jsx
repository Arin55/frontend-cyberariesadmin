import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ExcelTable from '../components/ExcelTable';
import Modal from '../components/Modal';
import { UserPlus } from 'lucide-react';

export default function Clients() {
  const { clients, companies, addClient } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    status: 'Active'
  });

  const columns = [
    { header: 'ID', accessor: 'id', sortable: true },
    { header: 'Full Name', accessor: 'name', sortable: true },
    { header: 'Client Company', accessor: 'company', sortable: true },
    { header: 'Official Email', accessor: 'email', sortable: true },
    { header: 'Username', accessor: 'username', sortable: true },
    { header: 'Audit Phase', accessor: 'auditPhase', sortable: true },
    { header: 'Status', accessor: 'status', sortable: true, isStatus: true },
  ];

  const filterOptions = [
    { label: 'Status', key: 'status', options: ['Active', 'Suspended', 'Pending Review'] },
    { label: 'Company', key: 'company', options: companies.map(c => c.name) }
  ];

  const tableActions = [
    { label: 'Reset Password', onClick: (row) => alert(`Reset password trigger for: ${row.email}`) },
    { label: 'Edit Permissions', onClick: (row) => alert(`Editing permissions for: ${row.name}`) },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      alert('All fields are required.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    addClient(formData);
    setFormData({ name: '', company: '', email: '', username: '', password: '', confirmPassword: '', status: 'Active' });
    setIsModalOpen(false);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Client Contact Center</h1>
          <p className="page-subtitle">Manage client users, verify registration parameters, and audit phase logs.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          + Create Client
        </button>
      </div>

      <ExcelTable
        columns={columns}
        data={clients}
        searchPlaceholder="Search by name, company, email..."
        searchKeys={['name', 'company', 'email']}
        filterOptions={filterOptions}
        actions={tableActions}
        tableName="Clients_Registry"
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Client Account">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Tony Stark"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Client Company</label>
            <select
              className="form-input"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            >
              <option value="">Select client company</option>
              {companies.map(comp => (
                <option key={comp.id} value={comp.name}>{comp.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Official Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="rep@company.com"
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
              placeholder="e.g. tony_stark"
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
              <option value="Suspended">Suspended</option>
              <option value="Pending Review">Pending Review</option>
            </select>
          </div>

          <div className="modal-footer" style={{ margin: '24px -24px -24px -24px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <UserPlus size={16} /> Create Client
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
