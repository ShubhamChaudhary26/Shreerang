// data/Notifications.ts

interface Notification {
  [x: string]: string;
  id: string;
  userName: string;
  jobTitle: string;
  jobCategory: string;
  time: string;
  avatarUrl?: string; // Optional: URL for user avatar
}

export const notifications: Notification[] = [
  {
    id: 'notif1',
    userName: 'Henry Wilson',
    jobTitle: 'Product Designer',
    jobCategory: 'Design',
    time: '2 hours ago',
    avatarUrl: 'https://via.placeholder.com/40/FF5733/FFFFFF?text=HW',
  },
  {
    id: 'notif2',
    userName: 'Raul Costa',
    jobTitle: 'Product Manager',
    jobCategory: 'Risk',
    time: '4 hours ago',
    avatarUrl: 'https://via.placeholder.com/40/33FF57/FFFFFF?text=RC',
  },
  {
    id: 'notif3',
    userName: 'Jack Milk',
    jobTitle: 'Technical Architect',
    jobCategory: 'IT',
    time: 'Yesterday',
    avatarUrl: 'https://via.placeholder.com/40/3357FF/FFFFFF?text=JM',
  },
  {
    id: 'notif4',
    userName: 'Michel Arian',
    jobTitle: 'Software Engineer',
    jobCategory: 'Engineering',
    time: '2 days ago',
    avatarUrl: 'https://via.placeholder.com/40/FF33CC/FFFFFF?text=MA',
  },
  {
    id: 'notif5',
    userName: 'Wade Warren',
    jobTitle: 'Web Developer',
    jobCategory: 'Development',
    time: '3 days ago',
    avatarUrl: 'https://via.placeholder.com/40/33CCFF/FFFFFF?text=WW',
  },
  {
    id: 'notif6',
    userName: 'Michel Arian',
    jobTitle: 'Software Engineer',
    jobCategory: 'Engineering',
    time: '4 days ago',
    avatarUrl: 'https://via.placeholder.com/40/FF33CC/FFFFFF?text=MA',
  },
];