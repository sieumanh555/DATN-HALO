import {useGoogleLogin} from '@react-oauth/google';
import Image from "next/image";

export default function GoogleLoginButton() {
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                }
            });
            const userInfo = await res.json();
            console.log(userInfo);
            window.location.href= "/"
        },
        onError: () => {
            console.log('Login Failed');
        },
    })
    return (
        <button
            onClick={() => login()}
            className={`w-[48%] h-10 border-[2px] rounded flex justify-center items-center gap-2`}>
            <Image
                src={`/assets/images/google-icon.webp`}
                alt={``}
                width={22}
                height={22}
            />
            <p className={`text-sm`}>Google</p>
        </button>
    )
}