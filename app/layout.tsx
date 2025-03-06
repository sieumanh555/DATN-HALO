import "./globals.css";
import {getServerSession} from "next-auth";
import {authOptions} from "../app/api/auth/[...nextauth]/route"; // File chứa config auth
import SessionProviderWrapper from "../app/components/provider/sessionProvider"; // Import provider
import ReduxProviders from "../redux/Provider";
import Header from "./components/header";
import Marquee from "./components/marquee";
import Breadcrumbs from "./components/breadcrumbs";
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
                <Breadcrumbs/>
                {children}
                <Footer/>
            </ReduxProviders>
        </SessionProviderWrapper>
        </body>
        </html>
    );
}
