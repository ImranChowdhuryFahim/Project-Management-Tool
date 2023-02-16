import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-indigo-700 text-white w-full font-bold text-4xl pl-8 py-4">
      <Link href="/">Project Management Tool</Link>
    </div>
  );
}
