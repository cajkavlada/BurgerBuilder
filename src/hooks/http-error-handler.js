import { useState, useEffect } from 'react';

export default httpClient => {
    const [error, setError] = useState(null);
    
    const {request, response} = httpClient.interceptors;

    const reqInterceptor = request.use(req => {
        setError(null);
        return req;
    });
    const resInterceptor = response.use(res => res, error => {
        setError(error);
    });

    useEffect(() => {
        return () => {
            request.eject(reqInterceptor);
            response.eject(resInterceptor);
        };
    }, [request, response, reqInterceptor, resInterceptor]);

    const clearError = () => {
        setError(null);
    }
    return [error,clearError];
}
