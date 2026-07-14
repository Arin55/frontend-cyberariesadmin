import React from 'react';
import { FileText, Download, Play } from 'lucide-react';
import ExcelTable from '../components/ExcelTable';

const DraftReports = () => {
  const reports = [
    { id: '1', client: 'ABC Securities', audit: 'CSCRF Audit FY 25', status: 'Draft Ready', date: '06 Jul 2025', action: 'Preview' },
    { id: '2', client: 'XYZ Finance', audit: 'CSCRF Audit FY 26', status: 'In Progress', date: '07 Jul 2025', action: 'Continue' },
    { id: '3', client: 'PQR Capital', audit: 'CSCRF Audit FY 25', status: 'Draft Ready', date: '05 Jul 2025', action: 'Preview' },
    { id: '4', client: 'LMN Investments', audit: 'CSCRF Audit FY 25', status: 'Pending Review', date: '04 Jul 2025', action: 'View' },
  ];

  const columns = [
    { header: 'Client Name', accessor: 'client' },
    { header: 'Audit Name', accessor: 'audit' },
    { header: 'Status', accessor: 'status', isStatus: true },
    { header: 'Last Updated', accessor: 'date' },
    {
      header: 'Action',
      accessor: 'action',
      sortable: false,
      cell: (row) => (
        <div style={{ display: 'flex', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
          {row.action === 'Preview' && (
            <>
              <button 
                className="btn btn-outline" 
                style={{ padding: '6px 12px', fontSize: '12px' }}
                onClick={() => alert(`Previewing Draft Report for ${row.client}`)}
              >
                <FileText size={14} /> Preview
              </button>
              <button 
                className="btn btn-outline" 
                style={{ padding: '6px 12px', fontSize: '12px' }}
                onClick={() => alert(`Downloading Draft Report for ${row.client}`)}
              >
                <Download size={14} />
              </button>
            </>
          )}
          {row.action === 'Continue' && (
            <button 
              className="btn btn-primary" 
              style={{ padding: '6px 12px', fontSize: '12px' }}
              onClick={() => alert(`Continuing Draft compilation for ${row.client}`)}
            >
              <Play size={14} /> Continue
            </button>
          )}
          {row.action === 'View' && (
            <button 
              className="btn btn-outline" 
              style={{ padding: '6px 12px', fontSize: '12px' }}
              onClick={() => alert(`Viewing Draft Report details for ${row.client}`)}
            >
              View
            </button>
          )}
        </div>
      )
    }
  ];

  const filterOptions = [
    { label: 'Status', key: 'status', options: ['Draft Ready', 'In Progress', 'Pending Review'] }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Draft Reports</h1>
          <p className="page-subtitle">Review, edit, and approve final compliance audit reports.</p>
        </div>
      </div>

      <ExcelTable 
        columns={columns}
        data={reports}
        searchPlaceholder="Search reports..."
        searchKeys={['client', 'audit', 'status']}
        filterOptions={filterOptions}
        tableName="Draft_Reports"
      />
    </div>
  );
};

export default DraftReports;
