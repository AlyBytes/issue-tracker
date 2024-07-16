"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";
import classnames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      {" "}
      {/* <Link href="/">Logo</Link>{" "} */}
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            // className="text-zinc-500 hover:text-zinc-800 transition-colors"
            //  className={`${link.href===currentPath ? 'text-zinc-900' :'text-zinc-500' }  hover:text-zinc-800 transition-colors`}
            className={classnames({
              "text-zinc-900": link.href === currentPath,
              "text-zinc-500": link.href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.href}
          >
            {" "}
            {link.label}
          </Link>
        ))}
        {/* <li ><Link className="text-zinc-500 hover:text-zinc-800 transition-colors" href="/">Dashboard</Link></li> */}
        {/* <li><Link className="text-zinc-500 hover:text-zinc-800 transition-colors" href="/issues"> Issues</Link></li> */}
      </ul>
    </nav>
  );
};

export default NavBar;
