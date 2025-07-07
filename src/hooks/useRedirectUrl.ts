import { useSearchParams } from 'react-router-dom';

const useRedirectUrl = () => {
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get("redirectTo");
    return redirectTo
}

export default useRedirectUrl