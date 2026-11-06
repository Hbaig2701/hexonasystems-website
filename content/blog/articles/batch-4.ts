import type { Article } from '../types';
import missedCallTextBack from './missed-call-text-back';
import speedToLead from './speed-to-lead';
import databaseReactivation from './database-reactivation';

// Writer batch 4: lead playbooks.
const batch: Article[] = [missedCallTextBack, speedToLead, databaseReactivation];

export default batch;
