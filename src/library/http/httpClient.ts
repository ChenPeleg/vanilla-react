export interface HttpClientConfig {
    url?: string;
    mode?: RequestMode | undefined;
    cache?: RequestCache | undefined;
    credentials?: RequestCredentials | undefined;
    redirect?: RequestRedirect | undefined;
    referrerPolicy?: ReferrerPolicy | undefined;
    baseURL?: string;
    headers?: Record<string, string>;
    params?: never;
    timeout?: number;
    withCredentials?: boolean;
    auth?: never;
}

export class HttpClient {
    config: HttpClientConfig;
    constructor(config: HttpClientConfig) {
        this.config = {
            mode: 'cors', // no-cors, *cors,  same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
            ...config,
        };
        this.config.headers = config.headers || {};
        this.config.headers['Content-Type'] =
            this.config.headers['Content-Type'] || 'application/json';
    }
    interceptors = {
        use: (
            onFulfilled?: (value: Promise<Response>) => Promise<Response>,
            onRejected?: (error: Promise<Response>) => Promise<Response>
        ) => {
            this._interceptors.onFulfilled =
                onFulfilled || this._interceptors.onFulfilled;
            this._interceptors.onRejected =
                onRejected || this._interceptors.onRejected;
        },
    };
    private _interceptors = {
        onFulfilled: (value: Promise<Response>) => value,
        onRejected: (error: Promise<Response>) => error,
    };

    static create(config: HttpClientConfig) {
        return new HttpClient(config);
    }
    async request({
        url,
        method,
        body,
        options,
    }: {
        url: string;
        method: string;
        body: any;
        options?: RequestInit;
    }) {
        try {
            const fetchConfig: RequestInit = this.buildFetchConfig(
                method,
                body,
                options
            );

            const response = HttpClient.fetchWrapper(
                (this.config.baseURL || '') + url,
                fetchConfig
            );
            return this.responseWrapper(response);
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw error;
        }
    }
    async get(url: string, options?: any) {
        return this.request({ url, method: 'GET', body: undefined, options });
    }
    async post(url: string, body: any, options?: RequestInit) {
        return this.request({ url, method: 'POST', body, options });
    }
    async put(url: string, body: any, options?: RequestInit) {
        return this.request({ url, method: 'PUT', body, options });
    }
    async delete(url: string, options?: RequestInit) {
        return this.request({
            url,
            method: 'DELETE',
            body: undefined,
            options,
        });
    }
    static async fetchWrapper(input: RequestInfo | URL, init?: RequestInit) {
        return fetch(input, init);
    }
    async responseWrapper(response: Promise<Response>) {
        if (response instanceof Error) {
            return this._interceptors.onRejected(response);
        } else {
            response = this._interceptors.onFulfilled(response);
        }
        if (
            this.config?.headers &&
            this.config.headers['Content-Type'] === 'application/json'
        ) {
            return (await response).json();
        }
        return response;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    buildFetchConfig(
        method: string = 'GET',
        data: any,
        _options?: RequestInit
    ): RequestInit {
        const { headers, mode, cache, credentials, redirect, referrerPolicy } =
            this.config;
        return {
            method,
            mode,
            cache,
            credentials,
            headers,
            redirect,
            referrerPolicy,
            body: data ? JSON.stringify(data) : undefined, // body data type must match "Content-Type" header
            ..._options,
        };
    }
}
