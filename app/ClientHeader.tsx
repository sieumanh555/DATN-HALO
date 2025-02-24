"use client";

import { usePathname } from "next/navigation";
import Header from "./components/header";
import Marquee from "./components/marquee";

const ClientHeader = () => {
  const pathname = usePathname();
  const isRegisterPage = pathname === "/pages/dangky";
  return !isRegisterPage ? (
    <>
      <Header />
      <Marquee />
    </>
  ) : null;
};

export default ClientHeader;
