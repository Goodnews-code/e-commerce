import { initializeDatabase } from './db';

async function init() {
  console.log('Initializing database...');
  await initializeDatabase();
  console.log('Database initialized successfully!');
  process.exit(0);
}

init().catch((err) => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
