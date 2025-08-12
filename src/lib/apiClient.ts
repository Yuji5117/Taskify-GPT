type RequestOptions = Omit<RequestInit, 'body'> & { body?: object }

const fetchApi = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
  const { body, ...rest } = options

  const hasBody = body !== undefined

  const response = await fetch(url, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...rest.headers,
    },
    body: hasBody ? JSON.stringify(options.body) : undefined,
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  return (await response.json()) as T
}

export const apiClient = {
  get<T>(url: string, options?: Omit<RequestOptions, 'body'>): Promise<T> {
    return fetchApi<T>(url, { ...options, method: 'GET' })
  },
  post<T>(url: string, body: object, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, {
      ...options,
      method: 'POST',
      body,
    })
  },
}
