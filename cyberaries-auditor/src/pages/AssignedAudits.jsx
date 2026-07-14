import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import ExcelTable from '../components/ExcelTable';

const AssignedAudits = () => {
  const navigate = useNavigate();

  const audits = [
    { id: '1', client: 'ABC Securities', name: 'CSCRF Audit FY 25', status: 'Pending', priority: 'High', due: '12 Jul 2025', assigned: '01 Jun 2025' },
    { id: '2', client: 'XYZ Finance', name: 'CSCRF Audit FY 25', status: 'AI Reviewed', priority: 'Medium', due: '15 Jul 2025', assigned: '05 Jun 2025' },
    { id: '3', client: 'PQR Capital', name: 'CSCRF Audit FY 25', status: 'Compliant', priority: 'Low', due: '10 Aug 2025', assigned: '10 Jun 2025' },
    { id: '4', client: 'LMN Investments', name: 'CSCRF Audit FY 25', status: 'Overdue', priority: 'Critical', due: '01 Jul 2025', assigned: '15 May 2025' },
    { id: '5', client: 'Aether Technologies', name: 'SOC 2 Type II', status: 'Pending', priority: 'High', due: '20 Jul 2025', assigned: '20 Jun 2025' },
  ];

  const columns = [
    { header: 'Client Name', accessor: 'client' },
    { header: 'Audit Name', accessor: 'name' },
    { header: 'Status', accessor: 'status', isStatus: true },
    { header: 'Priority', accessor: 'priority' },
    { header: 'Due Date', accessor: 'due' },
    { header: 'Assigned Date', accessor: 'assigned' },
    {
      header: 'Action',
      accessor: 'action',
      sortable: false,
      cell: (row) => (
        <div style={{ display: 'flex', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
          <Link to={`/audit-review/${row.id}`} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}>
            Review
          </Link>
          <button 
            className="btn btn-outline" 
            style={{ padding: '6px 12px', fontSize: '12px' }}
            onClick={() => alert(`Viewing details for ${row.client} - ${row.name}`)}
          >
            <Eye size={14} />
          </button>
        </div>
      )
    }
  ];

  const filterOptions = [
    { label: 'Status', key: 'status', options: ['Pending', 'AI Reviewed', 'Compliant', 'Overdue'] },
    { label: 'Priority', key: 'priority', options: ['High', 'Medium', 'Low', 'Critical'] }
  ];

  return (
    <div className="page-container" style={{ padding: 0 }}>
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Assigned Audits</h1>
          <p className="page-subtitle">Manage and review your assigned client audits.</p>
        </div>
      </div>

      <ExcelTable 
        columns={columns}
        data={audits}
        searchPlaceholder="Search audits..."
        searchKeys={['client', 'name', 'status', 'priority']}
        filterOptions={filterOptions}
        tableName="Assigned_Audits"
      />
    </div>
  );
};

export default AssignedAudits;
