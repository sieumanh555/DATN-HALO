import Link from "next/link";

export default function NavItem({href, icon, label}: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 p-3 rounded-lg"
        >
            {icon}
            <span className="font-medium">{label}</span>
        </Link>
    );
}