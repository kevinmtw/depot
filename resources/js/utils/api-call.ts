import { API_URL } from '@/constants/app-config';
import { getCookie } from './cookie';

export const apiCall = (url: string, method?: string, body?: any) => {
    const XSRF_TOKEN = getCookie('XSRF-TOKEN');
    const headers = {
        'X-XSRF-TOKEN': XSRF_TOKEN,
        'X-Requested-With': 'XMLHttpRequest',
    } as HeadersInit;

    return fetch(`${API_URL}${url}`, {
        method,
        credentials: 'include',
        headers,
        body,
    }).then((response: any) => {
        async function getResponse() {
            const responseJson = await response.json();
            if (!responseJson.success) {
                return Promise.reject(responseJson);
            }
            return responseJson;
        }

        return getResponse();
    });
};
