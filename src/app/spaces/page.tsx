"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function SpacesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading) return <div style={{ padding: '40px 32px', color: 'var(--text-muted)' }}>Loading...</div>;
  if (!user) return null;

  return (
    <main style={{ maxWidth: '1320px', margin: '0 auto', padding: '40px 32px' }}>
      <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)' }}>Spaces</h1>
      <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Welcome to your spaces, {user.username}!</p>
    </main>
  );
}
