import {NextPage} from "next";
import {useAppSelector} from "@/_app/hooks";
import {selectAuthState} from "@/_app/feature/auth";
import {useRouter} from "next/navigation";

const withAuth = (Component: NextPage | React.FC) => {
    const Auth = () => {
        const isLoggedIn = useAppSelector(selectAuthState);
        const router = useRouter();
        if (isLoggedIn) {
            router.push("/");
        }
        else{
            return <Component />;
        }
    };

    return Auth;
};

export default withAuth;