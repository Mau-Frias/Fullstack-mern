import { useState } from 'react';

const useLoginState = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    return { loggedIn, setLoggedIn };
};

export default useLoginState;
