import Link from "next/link";
export default function Ghar() {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Welcome to Ghar Page</h1>
        <p>This is a new page in Next.js.</p>
        <Link href="/">Go Back to Home</Link>
      </div>
    );
  }