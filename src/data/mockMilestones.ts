import { Milestone } from '@/components/features/MilestoneTracker';

export const mockMilestones: Milestone[] = [
  {
    id: 'm1',
    title: 'Complete MVP Development',
    description: 'Finalize core features and prepare for beta testing with early adopters',
    dueDate: 'Apr 15',
    status: 'in-progress',
    progress: 65,
    category: 'product',
    assignees: ['user1', 'user2', 'user3'],
    dependencies: ['m3']
  },
  {
    id: 'm2',
    title: 'Secure Seed Funding',
    description: 'Close seed round with target of $1.5M from angel investors and early VCs',
    dueDate: 'Mar 30',
    status: 'at-risk',
    progress: 40,
    category: 'funding',
    assignees: ['user1'],
    dependencies: []
  },
  {
    id: 'm3',
    title: 'Launch Marketing Campaign',
    description: 'Execute pre-launch marketing strategy across digital channels',
    dueDate: 'Apr 5',
    status: 'upcoming',
    progress: 20,
    category: 'marketing',
    assignees: ['user4', 'user5'],
    dependencies: []
  },
  {
    id: 'm4',
    title: 'File Provisional Patent',
    description: 'Submit provisional patent application for core technology',
    dueDate: 'Mar 20',
    status: 'completed',
    progress: 100,
    category: 'legal',
    assignees: ['user1', 'user6'],
    dependencies: []
  },
  {
    id: 'm5',
    title: 'Hire Technical Lead',
    description: 'Recruit senior technical lead with expertise in AI and machine learning',
    dueDate: 'Apr 10',
    status: 'in-progress',
    progress: 75,
    category: 'operations',
    assignees: ['user1'],
    dependencies: ['m2']
  },
  {
    id: 'm6',
    title: 'Beta Testing Program',
    description: 'Launch beta testing program with 50 selected users',
    dueDate: 'Apr 25',
    status: 'upcoming',
    progress: 10,
    category: 'product',
    assignees: ['user2', 'user3'],
    dependencies: ['m1', 'm3']
  },
  {
    id: 'm7',
    title: 'Finalize Pricing Strategy',
    description: 'Define pricing tiers and go-to-market strategy',
    dueDate: 'Apr 20',
    status: 'upcoming',
    progress: 30,
    category: 'marketing',
    assignees: ['user4', 'user1'],
    dependencies: ['m3']
  }
];
