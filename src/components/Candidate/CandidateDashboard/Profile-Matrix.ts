// data/Profile-Matrix.ts
import { FaBriefcase, FaRegFileAlt, FaRegEnvelope, FaRegBookmark } from 'react-icons/fa'; // Font Awesome icons

interface ProfileMetric {
  id: string;
  label: string;
  value: string;
  icon: React.ElementType; // Now storing the React icon component itself
  iconBgClass: string; // Tailwind class for background color
}

export const profileMetrics: ProfileMetric[] = [
  {
    id: 'applied-jobs',
    label: 'Applied Jobs',
    value: '22',
    icon: FaBriefcase, // Font Awesome Briefcase icon
    iconBgClass: 'bg-blue-500',
  },
  {
    id: 'job-alerts',
    label: 'Job Alerts',
    value: '9382',
    icon: FaRegFileAlt, // Font Awesome File icon
    iconBgClass: 'bg-red-500',
  },
  {
    id: 'messages',
    label: 'Messages',
    value: '74',
    icon: FaRegEnvelope, // Font Awesome Envelope icon
    iconBgClass: 'bg-yellow-500',
  },
  {
    id: 'shortlist',
    label: 'Shortlist',
    value: '32',
    icon: FaRegBookmark, // Font Awesome Bookmark icon
    iconBgClass: 'bg-green-500',
  },
];