import React, { createContext, useContext, useState, useEffect } from 'react';

const ClientContext = createContext();

const initialControls = [
  { id: 'CTRL-AC-01', name: 'User Access Authorization', domain: 'Access Control', standard: 'SOC 2 CC6.1 / ISO A.9.1', status: 'Completed', description: 'Ensure all user access requests are formally authorized and reviewed quarterly.', requiredEvidence: 'Access requests forms, quarterly review approval logs', evidenceFile: 'Access_Auth_Review_Q1.pdf', evidenceSize: '1.4 MB', evidenceDate: '2026-05-10' },
  { id: 'CTRL-AC-02', name: 'Multi-Factor Authentication', domain: 'Access Control', standard: 'SOC 2 CC6.3 / ISO A.9.4', status: 'Action Required', description: 'Enforce MFA for all external administrative access to corporate assets.', requiredEvidence: 'Screenshots of AWS IAM MFA settings, AD configuration reports', evidenceFile: null, evidenceSize: null, evidenceDate: null },
  { id: 'CTRL-EN-01', name: 'Encryption of Data at Rest', domain: 'Cryptography', standard: 'SOC 2 CC6.6 / ISO A.18.1', status: 'Completed', description: 'All database assets containing PII must be encrypted using AES-256.', requiredEvidence: 'RDS KMS configuration screenshots, database policy document', evidenceFile: 'Database_KMS_Encryption.png', evidenceSize: '840 KB', evidenceDate: '2026-06-02' },
  { id: 'CTRL-EN-02', name: 'Data in Transit Protection', domain: 'Cryptography', standard: 'SOC 2 CC6.7 / ISO A.10.1', status: 'Completed', description: 'Configure secure transit protocols (TLS 1.3) for external API interfaces.', requiredEvidence: 'Nginx SSL config files, server TLS handshake certificates', evidenceFile: 'Nginx_TLS1.3_Config.txt', evidenceSize: '45 KB', evidenceDate: '2026-06-15' },
  { id: 'CTRL-OP-01', name: 'Daily Backup Operations', domain: 'Operations Security', standard: 'SOC 2 CC7.1 / ISO A.12.3', status: 'Completed', description: 'Retain offsite backups with encryption for at least 7 years.', requiredEvidence: 'S3 lifecycle rule config screenshots, daily backup completion records', evidenceFile: 'S3_Backup_Lifecycle_Rules.png', evidenceSize: '1.2 MB', evidenceDate: '2026-06-20' },
  { id: 'CTRL-RA-01', name: 'Annual Vulnerability Assessments', domain: 'Risk Assessment', standard: 'SOC 2 CC8.1 / ISO A.12.6', status: 'Action Required', description: 'Schedule yearly external penetration tests and remediate critical items within 30 days.', requiredEvidence: 'Latest penetration test executive report, vulnerability scan summary logs', evidenceFile: null, evidenceSize: null, evidenceDate: null },
  { id: 'CTRL-HR-01', name: 'Employee Background Check', domain: 'Human Resources', standard: 'SOC 2 CC2.1 / ISO A.7.1', status: 'In Progress', description: 'Verify education, credentials, and criminal history for all new hires.', requiredEvidence: 'Third-party HR vetting invoices, signed consent forms', evidenceFile: 'Employee_Vetting_Invoice.pdf', evidenceSize: '310 KB', evidenceDate: '2026-07-05' },
];

const initialFindings = [
  {
    id: 'CTRL-AC-02',
    name: 'Multi-Factor Authentication',
    status: 'Pending Response',
    auditor: 'Dr. Evelyn Foster',
    comments: [
      {
        sender: 'Auditor',
        name: 'Dr. Evelyn Foster',
        message: 'Hello. I was reviewing the external console logs and noticed a few administrative users connecting without MFA enabled. Could you please provide the AWS IAM configuration details or a screenshot showing that administrative accounts enforce MFA?',
        timestamp: '2026-07-08T10:30:00Z',
        attachment: null
      }
    ]
  },
  {
    id: 'CTRL-HR-01',
    name: 'Employee Background Check',
    status: 'Pending Response',
    auditor: 'Dr. Evelyn Foster',
    comments: [
      {
        sender: 'Auditor',
        name: 'Dr. Evelyn Foster',
        message: 'The vetting invoice you submitted shows background checks for 2025. Could you upload the current policy document or invoices confirming that background screening is active for Q2 2026 hires?',
        timestamp: '2026-07-09T15:20:00Z',
        attachment: null
      }
    ]
  }
];

const initialActivities = [
  { id: 'ACT-C01', user: 'System', type: 'System', message: 'Client compliance score initialized at 68%.', timestamp: '2026-07-05T09:00:00Z' },
  { id: 'ACT-C02', user: 'Sarah Connor', type: 'Document', message: 'Uploaded evidence file: "Employee_Vetting_Invoice.pdf" for CTRL-HR-01.', timestamp: '2026-07-05T10:15:00Z' },
  { id: 'ACT-C03', user: 'Dr. Evelyn Foster', type: 'Audit', message: 'Raised clarification question for CTRL-HR-01 (Background screening policy).', timestamp: '2026-07-09T15:20:00Z' },
];

const defaultSettings = {
  timezone: 'UTC/GMT +5:30',
  dateFormat: 'YYYY-MM-DD',
  sessionTimeout: '60 minutes',
  alertsEnabled: true,
  weeklyDigest: false,
};

export const ClientProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('cc_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [controls, setControls] = useState(() => {
    const saved = localStorage.getItem('cc_controls');
    return saved ? JSON.parse(saved) : initialControls;
  });

  const [findings, setFindings] = useState(() => {
    const saved = localStorage.getItem('cc_findings');
    return saved ? JSON.parse(saved) : initialFindings;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('cc_activities');
    return saved ? JSON.parse(saved) : initialActivities;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('cc_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('cc_controls', JSON.stringify(controls));
  }, [controls]);

  useEffect(() => {
    localStorage.setItem('cc_findings', JSON.stringify(findings));
  }, [findings]);

  useEffect(() => {
    localStorage.setItem('cc_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('cc_settings', JSON.stringify(settings));
  }, [settings]);

  // Auth Operations
  const login = (email, password) => {
    // Sarah Connor credentials
    if ((email === 'sarah@aether.io' || email === 'client') && password === 'password') {
      const userData = {
        fullName: 'Sarah Connor',
        email: 's.connor@aether.io',
        phone: '+1 (555) 234-5678',
        companyName: 'Aether Technologies',
        industry: 'SaaS / Cloud',
        role: 'Client Officer',
        avatarInitials: 'SC',
      };
      setCurrentUser(userData);
      localStorage.setItem('cc_user', JSON.stringify(userData));
      addActivityLog(userData.fullName, 'System', 'Client logged in successfully.');
      return true;
    }
    return false;
  };

  const logout = () => {
    if (currentUser) {
      addActivityLog(currentUser.fullName, 'System', 'Client logged out.');
    }
    setCurrentUser(null);
    localStorage.removeItem('cc_user');
  };

  // Activity Log helper
  const addActivityLog = (user, type, message) => {
    const newLog = {
      id: `ACT-${Date.now()}`,
      user,
      type,
      message,
      timestamp: new Date().toISOString(),
    };
    setActivities(prev => [newLog, ...prev]);
  };

  // Evidence Management
  const uploadEvidence = (controlId, fileName, fileSize) => {
    setControls(prev => prev.map(c => {
      if (c.id === controlId) {
        return {
          ...c,
          evidenceFile: fileName,
          evidenceSize: fileSize,
          evidenceDate: new Date().toISOString().split('T')[0],
          status: 'In Progress', // Submitting to Auditor Review
        };
      }
      return c;
    }));

    addActivityLog(currentUser?.fullName || 'Client', 'Document', `Uploaded evidence file: "${fileName}" for ${controlId}.`);

    // Auto-resolve any pending findings for this control
    setFindings(prev => prev.map(f => {
      if (f.id === controlId && f.status === 'Pending Response') {
        return {
          ...f,
          status: 'Resolved',
          comments: [
            ...f.comments,
            {
              sender: 'Client',
              name: currentUser?.fullName || 'Sarah Connor',
              message: `I have uploaded the requested evidence file: "${fileName}"`,
              timestamp: new Date().toISOString(),
              attachment: fileName
            }
          ]
        };
      }
      return f;
    }));
  };

  const deleteEvidence = (controlId) => {
    let fileName = '';
    setControls(prev => prev.map(c => {
      if (c.id === controlId) {
        fileName = c.evidenceFile;
        return {
          ...c,
          evidenceFile: null,
          evidenceSize: null,
          evidenceDate: null,
          status: 'Action Required',
        };
      }
      return c;
    }));

    if (fileName) {
      addActivityLog(currentUser?.fullName || 'Client', 'Document', `Removed evidence file: "${fileName}" from ${controlId}.`);
    }
  };

  // Findings Comments
  const addReplyToFinding = (findingId, message, attachment) => {
    setFindings(prev => prev.map(f => {
      if (f.id === findingId) {
        const updatedComments = [
          ...f.comments,
          {
            sender: 'Client',
            name: currentUser?.fullName || 'Sarah Connor',
            message,
            timestamp: new Date().toISOString(),
            attachment
          }
        ];
        return {
          ...f,
          status: 'Resolved', // Resolve finding on reply
          comments: updatedComments
        };
      }
      return f;
    }));

    // If they attached a file, save it to the control as evidence!
    if (attachment) {
      uploadEvidence(findingId, attachment, '1.2 MB');
    } else {
      addActivityLog(currentUser?.fullName || 'Client', 'Audit', `Submitted clarification reply for ${findingId}.`);
    }
  };

  // Profile Form Updates
  const updateProfile = (profileData) => {
    setCurrentUser(prev => {
      const updated = {
        ...prev,
        ...profileData,
        avatarInitials: profileData.fullName ? profileData.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'SC'
      };
      localStorage.setItem('cc_user', JSON.stringify(updated));
      return updated;
    });

    addActivityLog(profileData.fullName || currentUser?.fullName || 'Client', 'System', 'Account profile contact details updated.');
  };

  // Portal Settings Form Toggles
  const updatePreferences = (preferencesData) => {
    setSettings(prev => ({
      ...prev,
      ...preferencesData,
    }));
    addActivityLog(currentUser?.fullName || 'Client', 'System', 'Portal preferences updated.');
  };

  return (
    <ClientContext.Provider value={{
      currentUser,
      controls,
      findings,
      activities,
      settings,
      login,
      logout,
      uploadEvidence,
      deleteEvidence,
      addReplyToFinding,
      updateProfile,
      updatePreferences
    }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => useContext(ClientContext);
