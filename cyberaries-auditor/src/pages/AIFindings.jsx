import React from 'react';
import { Link } from 'react-router-dom';
import ExcelTable from '../components/ExcelTable';

const AIFindings = () => {
  const findings = [
    { id: '1', client: 'ABC Securities', controlId: 'PR.AA.56', controlName: 'Password Policy', status: 'Partially Compliant', conf: '91%', priority: 'High', action: 'Review' },
    { id: '2', client: 'XYZ Finance', controlId: 'PR.DS.52', controlName: 'Data Backup', status: 'Compliant', conf: '97%', priority: 'Low', action: 'Review' },
    { id: '3', client: 'PQR Capital', controlId: 'DE.CM.31', controlName: 'VAPT Report', status: 'Non-Compliant', conf: '74%', priority: 'Critical', action: 'Review' },
    { id: '4', client: 'LMN Investments', controlId: 'GV.OC.52', controlName: 'Cyber Policy', status: 'Partially Compliant', conf: '85%', priority: 'Medium', action: 'Review' },
    { id: '5', client: 'RST Global', controlId: 'ID.AM.51', controlName: 'Asset Inventory', status: 'Pending', conf: 'N/A', priority: 'Medium', action: 'Wait' },
  ];

  const columns = [
    { header: 'Client Name', accessor: 'client' },
    {
      header: 'Control ID',
      accessor: 'controlId',
      cell: (row) => (
        <code style={{ fontSize: '12px', background: 'var(--bg-main)', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>
          {row.controlId}
        </code>
      )
    },
    { header: 'Control Name', accessor: 'controlName' },
    { header: 'AI Status', accessor: 'status', isStatus: true },
    {
      header: 'Confidence',
      accessor: 'conf',
      cell: (row) => {
        if (row.conf === 'N/A') return 'N/A';
        const intConf = parseInt(row.conf);
        let progressColor = 'var(--primary)';
        if (intConf > 90) progressColor = '#137333';
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '40px', height: '4px', backgroundColor: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: row.conf, height: '100%', backgroundColor: progressColor }}></div>
            </div>
            <span style={{ fontSize: '12px' }}>{row.conf}</span>
          </div>
        );
      }
    },
    {
      header: 'Action',
      accessor: 'action',
      sortable: false,
      cell: (row) => (
        <div style={{ display: 'flex', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
          {row.action === 'Review' ? (
            <Link to={`/audit-review/${row.id}`} className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '12px' }}>
              Review
            </Link>
          ) : (
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>-</span>
          )}
        </div>
      )
    }
  ];

  const filterOptions = [
    { label: 'Status', key: 'status', options: ['Compliant', 'Partially Compliant', 'Non-Compliant', 'Pending'] },
    { label: 'Client', key: 'client', options: ['ABC Securities', 'XYZ Finance', 'PQR Capital', 'LMN Investments', 'RST Global'] }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">AI Findings</h1>
          <p className="page-subtitle">Review AI-generated compliance analysis across all client controls.</p>
        </div>
      </div>

      <ExcelTable 
        columns={columns}
        data={findings}
        searchPlaceholder="Search controls..."
        searchKeys={['client', 'controlId', 'controlName', 'status', 'conf']}
        filterOptions={filterOptions}
        tableName="AI_Findings"
      />
    </div>
  );
};

export default AIFindings;
