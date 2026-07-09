import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ExcelTable from '../components/ExcelTable';
import Modal from '../components/Modal';
import { Building2 } from 'lucide-react';

export default function Companies() {
  const { companies, addCompany } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
  });

  const columns = [
    { header: 'ID', accessor: 'id', sortable: true },
    { header: 'Company Name', accessor: 'name', sortable: true },
    { header: 'Industry Verticals', accessor: 'industry', sortable: true },
    { 
      header: 'Compliance Score', 
      accessor: 'complianceScore', 
      sortable: true,
      cell: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ flexGrow: 1, height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', width: '100px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${row.complianceScore}%`, 
              height: '100%', 
              backgroundColor: row.complianceScore > 85 ? '#10B981' : row.complianceScore > 70 ? '#F59E0B' : 'var(--primary)' 
            }}></div>
          </div>
          <span style={{ fontWeight: '600', fontSize: '13px' }}>{row.complianceScore}%</span>
        </div>
      )
    },
    { header: 'Creation Date', accessor: 'createdDate', sortable: true },
    { header: 'Compliance Audits', accessor: 'auditsCount', sortable: true },
    { header: 'Status', accessor: 'status', sortable: true, isStatus: true },
  ];

  const filterOptions = [
    { label: 'Status', key: 'status', options: ['Active', 'Pending Review', 'Non-Compliant'] },
    { label: 'Industry', key: 'industry', options: ['SaaS / Cloud', 'Fintech', 'Healthcare', 'Supply Chain', 'E-commerce', 'Cybersecurity'] }
  ];

  const tableActions = [
    { label: 'View Profile', onClick: (row) => alert(`Company Profile: ${row.name}`) },
    { label: 'Edit Parameters', onClick: (row) => alert(`Editing: ${row.name}`) },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.industry) return;
    addCompany(formData);
    setFormData({ name: '', industry: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Registered Companies</h1>
          <p className="page-subtitle">Manage client organizations, compliance scopes, and industrial frameworks.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          + Add Company
        </button>
      </div>

      <ExcelTable
        columns={columns}
        data={companies}
        searchPlaceholder="Search by name, industry, score..."
        searchKeys={['name', 'industry', 'id']}
        filterOptions={filterOptions}
        actions={tableActions}
        tableName="Companies_Registry"
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Company">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Acme Corp"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Industry Sector</label>
            <select
              className="form-input"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              required
            >
              <option value="">Select industry sector</option>
              <option value="SaaS / Cloud">SaaS / Cloud</option>
              <option value="Fintech">Fintech</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Supply Chain">Supply Chain</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Cybersecurity">Cybersecurity</option>
            </select>
          </div>

          <div className="modal-footer" style={{ margin: '24px -24px -24px -24px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Building2 size={16} /> Register Company
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
