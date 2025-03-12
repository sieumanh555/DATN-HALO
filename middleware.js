import {NextResponse} from "next/server";
import {verify} from "jsonwebtoken";

async function Middleware() {
    const accessToken = request.cookie.access_token;
    const refreshToken = request.cookie.refresh_token;

    // if (!accessToken) {
    //     return NextResponse.redirect(new URL("/pages/login", request.url));
    // }
    //
    // try {
    //     const verifyToken = await verify(accessToken, process.env.JWT_SECRET_KEY);
    // } catch (error) {
    //     console.log(error);
    // }
}

// async function refreshToken(token) {
//     const verifyToken = await verify(token, process.env.JWT_SECRET_KEY);
//     try {
//         if (verifyToken) {
//             const res = await fetch(`http://localhost:3000/refreshToken/${token}`,
//                 {
//                     method: " POST",
//                     headers:
//                         {
//                             "Authorization": `Bearer ${token}`,
//                             "Content-Type": "application/json"
//                         }
//                 }
//             )
//                 .then((res) => {
//                     if (res.ok) {
//                        return res.json();
//                     } else {
//                       return console.log(res.json())
//                     }
//                 })
//                 .then((data) =>{
//                     document.cookie
//                 })
//         }
//     }
//
// }

export const config = {
    matcher: "/pages/checkout"
}
export default Middleware;
