import {NextPage} from "next";
import {useAppSelector} from "@/_app/hooks";
import {selectAuthState} from "@/_app/feature/auth";
import {useRouter} from "next/navigation";

import { useEffect } from 'react';

const withAuth = (Component: NextPage | React.FC) => {
    const Auth = () => {
        const isLoggedIn = useAppSelector(selectAuthState);
        const router = useRouter();

        useEffect(() => {
            if (isLoggedIn) {
                router.push("/");
            }
        }, [isLoggedIn, router]);

        if (isLoggedIn) {
            return null;
        } else {
            return <Component />;
        }
    };

    return Auth;
};

export default withAuth;