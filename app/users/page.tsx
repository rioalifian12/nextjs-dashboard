// app/users/page.tsx

// (Server Component)
export default async function UsersPage() {
  // This fetch runs on the server (no client-side code needed here)
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return (
    <main>
      <h1>Users</h1>
      <ul>
        {data.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </main>
  );
}
