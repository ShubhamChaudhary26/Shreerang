// // File: scripts/migrate-applicants.ts
// import mongoose from 'mongoose';
// import Project from '@/schema/project';

// async function migrateApplicants(): Promise<void> {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     } as mongoose.ConnectOptions);
//     console.log('Connected to MongoDB for migration');

//     const projects = await Project.find({});
//     console.log('Found projects:', projects.length);

//     for (const project of projects) {
//       // Explicitly type applicants as any[] to handle strings
//       const applicants: any[] = project.applicants || [];
//       const updatedApplicants = applicants
//         .filter((id: any) => typeof id === 'string' && mongoose.Types.ObjectId.isValid(id))
//         .map((id: string) => new mongoose.Types.ObjectId(id));
//       project.applicants = updatedApplicants;
//       await project.save();
//       console.log(`Updated project ${project._id} with applicants:`, updatedApplicants);
//     }
//     console.log('Migration completed');
//   } catch (error: any) {
//     console.error('Migration error:', error.message, 'Stack:', error.stack);
//   } finally {
//     await mongoose.connection.close();
//     console.log('Database connection closed');
//   }
// }

// migrateApplicants();