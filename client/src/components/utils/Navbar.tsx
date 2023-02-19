import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full py-4 pl-8 text-4xl font-bold text-white bg-blue-500">
      <Link href="/">Project Management Tool</Link>
    </div>
  );
}
