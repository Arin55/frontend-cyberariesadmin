import React, { useState, useEffect } from 'react';
import { useClient } from '../context/ClientContext';
import { Link } from 'react-router-dom';
import { Search, Eye, Filter } from 'lucide-react';

export default function MyAudits() {
  const { controls } = useClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [filteredControls, setFilteredControls] = useState([]);

  useEffect(() => {
    let result = [...controls];

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(c => 
        c.id.toLowerCase().includes(term) ||
        c.name.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term) ||
        c.standard.toLowerCase().includes(term)
      );
    }

    // Filter by domain
    if (selectedDomain !== 'All Domains') {
      result = result.filter(c => c.domain === selectedDomain);
    }

    // Filter by status
    if (selectedStatus !== 'All Statuses') {
      result = result.filter(c => c.status === selectedStatus);
    }

    setFilteredControls(result);
  }, [controls, searchTerm, selectedDomain, selectedStatus]);

  // Unique domains list for filter select
  const domainsList = ['All Domains', ...new Set(controls.map(c => c.domain))];
  const statusesList = ['All Statuses', 'Completed', 'In Progress', 'Action Required'];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed': return 'badge badge-completed';
      case 'In Progress': return 'badge badge-in_progress';
      case 'Action Required': return 'badge badge-action-required';
      default: return 'badge';
    }
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">My Audits & Controls Inventory</h1>
          <p className="page-subtitle">Inspect requirements, upload evidence files, and verify status for all controls.</p>
        </div>
      </div>

      {/* Excel Table Container with Filters Toolbar */}
      <div className="excel-table-container">
        <div className="table-toolbar">
          <div className="toolbar-left">
            <div className="table-search-wrapper">
              <Search size={16} className="table-search-icon" />
              <input 
                type="text" 
                placeholder="Search by ID, name, reference..." 
                className="table-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter Domain */}
            <select 
              className="table-filter-select"
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
            >
              {domainsList.map(dom => (
                <option key={dom} value={dom}>{dom}</option>
              ))}
            </select>

            {/* Filter Status */}
            <select 
              className="table-filter-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusesList.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
          
          <div className="toolbar-right">
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Showing {filteredControls.length} of {controls.length} Controls
            </span>
          </div>
        </div>

        {/* Table layout */}
        <div className="table-scrollable">
          <table className="excel-table">
            <thead>
              <tr>
                <th style={{ width: '120px' }}>Control ID</th>
                <th>Control Name</th>
                <th>Security Domain</th>
                <th>Standard Reference</th>
                <th>Status</th>
                <th style={{ width: '120px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredControls.map((ctrl) => (
                <tr key={ctrl.id}>
                  <td style={{ fontWeight: '700', color: 'var(--primary)' }}>{ctrl.id}</td>
                  <td style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{ctrl.name}</td>
                  <td>{ctrl.domain}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                    {ctrl.standard}
                  </td>
                  <td>
                    <span className={getStatusBadgeClass(ctrl.status)}>
                      {ctrl.status}
                    </span>
                  </td>
                  <td>
                    <Link 
                      to={`/control-details?id=${ctrl.id}`}
                      className="btn btn-secondary" 
                      style={{ padding: '6px 12px', fontSize: '12.5px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Eye size={14} /> View Details
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredControls.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: 'var(--text-secondary)' }}>
                    No controls match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
