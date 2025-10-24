import { AUTH_CONFIG } from '../../../config';
import { apiClient, ApiClientError } from '../../../lib/http';
import type { SessionTokens } from '../../../server/auth/session';

export interface AuthorizationRequestOptions {
  state: string;
  codeChallenge: string;
  prompt?: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
}

const ensureAuthConfig = (value: string, key: string) => {
  if (!value) {
    throw new Error(`Missing required auth configuration: ${key}`);
  }
  return value;
};

export const buildAuthorizationUrl = ({ state, codeChallenge, prompt }: AuthorizationRequestOptions): URL => {
  const authorizationEndpoint = ensureAuthConfig(AUTH_CONFIG.authorizationEndpoint, 'AUTHORIZATION_ENDPOINT');
  const redirectUri = ensureAuthConfig(AUTH_CONFIG.redirectUri, 'REDIRECT_URI');
  const clientId = ensureAuthConfig(AUTH_CONFIG.clientId, 'CLIENT_ID');

  const url = new URL(authorizationEndpoint);

  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', AUTH_CONFIG.scope);
  url.searchParams.set('code_challenge', codeChallenge);
  url.searchParams.set('code_challenge_method', 'S256');
  url.searchParams.set('state', state);

  if (prompt) {
    url.searchParams.set('prompt', prompt);
  }

  return url;
};

export const exchangeAuthorizationCode = async (
  code: string,
  codeVerifier: string
): Promise<SessionTokens> => {
  const tokenEndpoint = ensureAuthConfig(AUTH_CONFIG.tokenEndpoint, 'TOKEN_ENDPOINT');
  const redirectUri = ensureAuthConfig(AUTH_CONFIG.redirectUri, 'REDIRECT_URI');
  const clientId = ensureAuthConfig(AUTH_CONFIG.clientId, 'CLIENT_ID');
  const clientSecret = AUTH_CONFIG.clientSecret;
  const headers: HeadersInit | undefined = clientSecret
    ? {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      }
    : undefined;

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    code_verifier: codeVerifier,
    redirect_uri: redirectUri,
    client_id: clientId,
  });

  if (clientSecret) {
    body.set('client_secret', clientSecret);
  }

  try {
    const response = await apiClient.post<TokenResponse>(tokenEndpoint, {
      body,
      headers,
    });

    return {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      expiresIn: response.expires_in,
      tokenType: response.token_type,
      scope: response.scope,
    } satisfies SessionTokens;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    throw new ApiClientError('Failed to exchange authorization code', 500);
  }
};

export const refreshAccessToken = async (refreshToken: string): Promise<SessionTokens> => {
  const tokenEndpoint = ensureAuthConfig(AUTH_CONFIG.tokenEndpoint, 'TOKEN_ENDPOINT');
  const clientId = ensureAuthConfig(AUTH_CONFIG.clientId, 'CLIENT_ID');
  const clientSecret = AUTH_CONFIG.clientSecret;
  const headers: HeadersInit | undefined = clientSecret
    ? {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      }
    : undefined;

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: clientId,
  });

  if (clientSecret) {
    body.set('client_secret', clientSecret);
  }

  try {
    const response = await apiClient.post<TokenResponse>(tokenEndpoint, {
      body,
      headers,
    });

    return {
      accessToken: response.access_token,
      refreshToken: response.refresh_token ?? refreshToken,
      expiresIn: response.expires_in,
      tokenType: response.token_type,
      scope: response.scope,
    } satisfies SessionTokens;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    throw new ApiClientError('Failed to refresh access token', 500);
  }
};
