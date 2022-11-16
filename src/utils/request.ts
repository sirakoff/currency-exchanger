const controller:AbortController = new AbortController()


function fixerRequest<TResponse>(
    url: string,
    config: RequestInit = {},
    timeout?: number
  ): Promise<TResponse> {

    const timeoutId = setTimeout(() => controller.abort(), timeout || 8000);


    return fetch(url, {...config,
      signal: controller.signal,
      headers:{
        ...config.headers,
        "apikey": (process.env.REACT_APP_FIXER_API_KEY as string)}
      })
      .then((response) => {

        clearTimeout(timeoutId);

        return response.json();

      })
      .then((data) => data as TResponse);
  }

  export {fixerRequest};