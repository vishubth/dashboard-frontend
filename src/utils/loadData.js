export async function loadDashboardData() {
  const res = await fetch("/sample_profile.json");
  return await res.json();
}
