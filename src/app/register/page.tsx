"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Registration failed');
        return;
      }
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => router.push('/login'), 1500);
    } catch {
      setError('Network error');
    }
  };

  return (
    <main style={{ maxWidth: '1320px', margin: '0 auto', padding: '40px 32px' }}>
      <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '2rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>Register</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
        <label style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ marginBottom: '1rem', padding: '0.5rem' }} />
        <label style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ marginBottom: '1rem', padding: '0.5rem' }} />
        <label style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ marginBottom: '1rem', padding: '0.5rem' }} />
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        {success && <p style={{ color: 'green', marginBottom: '1rem' }}>{success}</p>}
        <button type="submit" style={{ padding: '0.5rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border)', cursor: 'pointer' }}>Sign Up</button>
      </form>
      <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
        Already have an account? <a href="/login" style={{ color: 'var(--text-primary)' }}>Sign In</a>
      </p>
    </main>
  );
}
