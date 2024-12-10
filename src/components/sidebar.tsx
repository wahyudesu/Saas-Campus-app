import Link from 'next/link'
import { Home, FileText, Settings, HelpCircle } from 'lucide-react'

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: FileText, label: 'Daftar Tugas', href: '/assignment' },
  { icon: Settings, label: 'Kelas', href: '/kelas' },
  { icon: HelpCircle, label: 'Mahasiswa', href: '/mahasiswa' },
]

export function AppSidebar() {
  return (
    <aside className="w-64 bg-gray-800 shadow-lg">
      {/* Header */}
      <div className=" px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-6"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>DocuStore</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="py-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 rounded-md mr-4 ml-4"
              >
                <item.icon className="h-5 w-5 text-white" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className=" p-4">

      </div>
    </aside>
  )
}
