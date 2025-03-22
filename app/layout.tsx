import "./globals.css";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/authOptions"; // File chứa config auth
import SessionProviderWrapper from "../app/components/provider/sessionProvider"; // Import provider
import ReduxProviders from "../app/components/provider/reduxProvider";
import Header from "./components/header";
import Marquee from "./components/marquee";
import Footer from "./components/footer";

export default async function RootLayout({children}: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions); // Lấy session trên server
    return (
        <html lang="en">
        <body className={`antialiased bg-[#F2F4F7]`}>
        <SessionProviderWrapper session={session}>
            <ReduxProviders>
                <Header/>
                <Marquee/>
                {children}
                <Footer/>
            </ReduxProviders>
        </SessionProviderWrapper>
        </body>
        </html>
    );
}
