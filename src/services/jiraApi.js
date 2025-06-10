export async function fetchJiraTasks() {
  // Fake data simulating real Jira API response
  return [
    { id: '1', key: 'T-001', summary: 'Fix urgent login bug' },
    { id: '2', key: 'T-002', summary: 'Plan Q3 roadmap' },
    { id: '3', key: 'T-003', summary: 'Reply to partner email' },
    { id: '4', key: 'T-004', summary: 'Clean email inbox' },
  ];
}
