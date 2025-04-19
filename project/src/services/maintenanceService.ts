import { MaintenanceIssue } from '../types';

// Mock maintenance issues data
const MOCK_ISSUES: MaintenanceIssue[] = [
  {
    id: '1',
    reporterId: '1',
    roomId: '1',
    title: 'Projector not working',
    description: 'The projector in Room 101 is not turning on when connected to a laptop.',
    category: 'electrical',
    priority: 'high',
    status: 'assigned',
    assignedTo: 'maintenance-1',
    reportedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    images: ['https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg']
  },
  {
    id: '2',
    reporterId: '2',
    roomId: '3',
    title: 'Leaking sink',
    description: 'The sink in Computer Lab 1 is leaking and water is pooling on the floor.',
    category: 'plumbing',
    priority: 'urgent',
    status: 'in-progress',
    assignedTo: 'maintenance-2',
    reportedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    images: ['https://images.pexels.com/photos/2098696/pexels-photo-2098696.jpeg']
  },
  {
    id: '3',
    reporterId: '1',
    roomId: '4',
    title: 'Broken chair',
    description: 'One of the chairs in Study Room 3 has a broken leg and is unsafe to use.',
    category: 'furniture',
    priority: 'medium',
    status: 'reported',
    reportedAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
  }
];

// Maintenance service functions
const getAllIssues = (): Promise<MaintenanceIssue[]> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      resolve(MOCK_ISSUES);
    }, 500);
  });
};

const getIssueById = (id: string): Promise<MaintenanceIssue | undefined> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      const issue = MOCK_ISSUES.find(issue => issue.id === id);
      resolve(issue);
    }, 300);
  });
};

const getUserIssues = (userId: string): Promise<MaintenanceIssue[]> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      const userIssues = MOCK_ISSUES.filter(issue => issue.reporterId === userId);
      resolve(userIssues);
    }, 500);
  });
};

const createIssue = (
  issueData: Omit<MaintenanceIssue, 'id' | 'status' | 'reportedAt' | 'resolvedAt'>
): Promise<MaintenanceIssue> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      const newIssue: MaintenanceIssue = {
        ...issueData,
        id: `issue-${Date.now()}`,
        status: 'reported',
        reportedAt: new Date().toISOString()
      };

      // In a real app, this would add to the database
      resolve(newIssue);
    }, 500);
  });
};

const updateIssueStatus = (
  id: string, 
  status: MaintenanceIssue['status'], 
  assignedTo?: string
): Promise<void> => {
  return new Promise(resolve => {
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would update the database
      resolve();
    }, 300);
  });
};

export const maintenanceService = {
  getAllIssues,
  getIssueById,
  getUserIssues,
  createIssue,
  updateIssueStatus
};