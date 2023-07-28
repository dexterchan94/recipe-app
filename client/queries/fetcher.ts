export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
) {
  return async (): Promise<TData> => {
    const res = await fetch(
      process.env.BACKEND_API_URL ?? "",
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      },
    );

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      // eslint-disable-next-line no-console
      console.error(message);

      throw new Error(message);
    }

    return json.data;
  };
}
