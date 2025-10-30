export async function getPublishedNews(all: Array<any>) {
  const today = new Date().toISOString().slice(0, 10);
  return all
    .filter((p) => p.data.status === "published" && p.data.date <= today)
    .sort((a, b) => b.data.date.localeCompare(a.data.date));
}

export function getPublishedObituaries(all: Array<any>) {
  return all
    .filter((p) => p.data.status === "published")
    .sort((a, b) =>
      (b.data.dateOfDeath || "").localeCompare(a.data.dateOfDeath || "")
    );
}

export function groupCohorts(people: Array<any>) {
  const published = people.filter((p) => p.data.status === "published");
  const years = Array.from(new Set(published.map((p) => p.data.cohort))).sort(
    (a, b) => b - a
  );
  return { years, people: published };
}

export function byCohort(people: Array<any>, year: number) {
  return people
    .filter((p) => p.data.cohort === year)
    .sort((a, b) => (a.data.name || "").localeCompare(b.data.name || ""));
}