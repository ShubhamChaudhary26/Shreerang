// app/page.tsx (or whichever page you want to display this on)

import CandidateProfileForm from '../Candidate/CandidateProfileEdit/CandidateProfileForm';
import JobListings from './JobListings'; // Adjust path if needed

export default function HomePage() {
  return (
    <>
      <JobListings/>
    </>
  );
}