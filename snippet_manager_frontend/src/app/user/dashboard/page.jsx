'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/user/dashboard?id=${id}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.error("Failed to load user", err));
    }
  }, [id]);

  if (!user) return <p className="text-center mt-10 text-gray-600">Loading your dashboard...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h1>
        <p className="text-gray-700">{user.message}</p>
      </div>
    </div>
  );
}
