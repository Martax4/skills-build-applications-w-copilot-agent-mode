const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

export const getApiUrl = (resource) => {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}/api/${resource}/`;
};

export const normalizeCollectionResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const candidates = [payload.data, payload.results, payload.items, payload.records];

    for (const candidate of candidates) {
      if (Array.isArray(candidate)) {
        return candidate;
      }
    }
  }

  return [];
};
