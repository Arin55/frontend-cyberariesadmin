import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ExcelTable from '../components/ExcelTable';
import Modal from '../components/Modal';
import { ClipboardList } from 'lucide-react';

export default function AuditManagement() {
  const { audits, companies, clients, auditors, addAudit } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    client: '',
    auditor: '',
    rulebook: '',
    dueDate: '',
  });

  const columns = [
    { header: 'ID', accessor: 'id', sortable: true },
    { header: 'Company Name', accessor: 'company', sortable: true },
    { header: 'Client Contact', accessor: 'client', sortable: true },
    { header: 'Assigned Auditor', accessor: 'auditor', sortable: true },
    { header: 'Rulebook Standard', accessor: 'rulebook', sortable: true },
    { 
      header: 'Progress', 
      accessor: 'progress', 
      sortable: true,
      cell: (row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ flexGrow: 1, height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', width: '80px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${row.progress}%`, 
              height: '100%', 
              backgroundColor: row.progress === 100 ? '#10B981' : 'var(--primary)' 
            }}></div>
          </div>
          <span style={{ fontWeight: '600', fontSize: '12px' }}>{row.progress}%</span>
        </div>
      )
    },
    { header: 'Target Due Date', accessor: 'dueDate', sortable: true },
    { header: 'Audit Status', accessor: 'status', sortable: true, isStatus: true },
  ];

  const filterOptions = [
    { label: 'Status', key: 'status', options: ['In Progress', 'Pending Review', 'Completed'] },
    { label: 'Rulebook', key: 'rulebook', options: ['CSCRF Protect Framework', 'CSCRF Govern Framework', 'CSCRF Identify Framework', 'CSCRF Detect Framework', 'CSCRF Respond Framework', 'CSCRF Recover Framework'] },
    { label: 'Auditor', key: 'auditor', options: auditors.map(a => a.name) }
  ];

  const tableActions = [
    { label: 'Review Evidence', onClick: (row) => alert(`Opening evidence vault for: ${row.id}`) },
    { label: 'Modify Schedule', onClick: (row) => alert(`Modifying due date for: ${row.id}`) },
    { label: 'Update Progress', onClick: (row) => alert(`Updating progress for: ${row.id}`) },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.client || !formData.auditor || !formData.rulebook || !formData.dueDate) return;
    addAudit(formData);
    setFormData({ company: '', client: '', auditor: '', rulebook: '', dueDate: '' });
    setIsModalOpen(false);
  };

  // Filter clients based on selected company
  const filteredClients = clients.filter(c => c.company === formData.company);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Compliance Audit Registry</h1>
          <p className="page-subtitle">Track active assessments, assign reviewers, inspect progress, and set compliance timelines.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          + Create Audit
        </button>
      </div>

      <ExcelTable
        columns={columns}
        data={audits}
        searchPlaceholder="Search by ID, company, auditor, rulebook..."
        searchKeys={['id', 'company', 'auditor', 'rulebook']}
        filterOptions={filterOptions}
        actions={tableActions}
        tableName="Audits_Management"
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Compliance Audit">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Client Company</label>
            <select
              className="form-input"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value, client: '' })}
              required
            >
              <option value="">Select target company</option>
              {companies.map(comp => (
                <option key={comp.id} value={comp.name}>{comp.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Client Representative</label>
            <select
              className="form-input"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              required
              disabled={!formData.company}
            >
              <option value="">Select representative</option>
              {formData.company ? (
                filteredClients.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))
              ) : (
                <option disabled>Please select a company first</option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Assigned Lead Auditor</label>
            <select
              className="form-input"
              value={formData.auditor}
              onChange={(e) => setFormData({ ...formData, auditor: e.target.value })}
              required
            >
              <option value="">Select auditor</option>
              {auditors.filter(a => a.status === 'Active').map(aud => (
                <option key={aud.id} value={aud.name}>{aud.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Rulebook / Standard Framework</label>
            <select
              className="form-input"
              value={formData.rulebook}
              onChange={(e) => setFormData({ ...formData, rulebook: e.target.value })}
              required
            >
              <option value="">Select compliance standard</option>
              <option value="CSCRF Protect Framework">CSCRF Protect Framework</option>
              <option value="CSCRF Govern Framework">CSCRF Govern Framework</option>
              <option value="CSCRF Identify Framework">CSCRF Identify Framework</option>
              <option value="CSCRF Detect Framework">CSCRF Detect Framework</option>
              <option value="CSCRF Respond Framework">CSCRF Respond Framework</option>
              <option value="CSCRF Recover Framework">CSCRF Recover Framework</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Target Completion Date</label>
            <input
              type="date"
              className="form-input"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
          </div>

          <div className="modal-footer" style={{ margin: '24px -24px -24px -24px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <ClipboardList size={16} /> Schedule Audit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
