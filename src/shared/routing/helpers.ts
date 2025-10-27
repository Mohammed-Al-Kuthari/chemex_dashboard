type RouteParams = Record<string, string | number | boolean>;

type RouteQuery = Record<string, string | number | boolean | undefined>;

const replaceParams = (path: string, params?: RouteParams) => {
  if (!params) {
    return path;
  }

  return Object.entries(params).reduce((acc, [key, value]) => {
    const token = `:${key}`;
    return acc.replaceAll(token, encodeURIComponent(String(value)));
  }, path);
};

const buildQueryString = (query?: RouteQuery) => {
  if (!query) {
    return "";
  }

  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }

    searchParams.append(key, String(value));
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};

export const createRoutePath = (path: string, params?: RouteParams, query?: RouteQuery) => {
  const withParams = replaceParams(path, params);
  const queryString = buildQueryString(query);

  return `${withParams}${queryString}`;
};
