import { createOAuthAppAuth } from '@octokit/auth-oauth-app';
import { Octokit } from '@octokit/rest';

export async function GET({ request, url }) {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code) {
    return new Response('No code provided', { status: 400 });
  }

  try {
    // GitHub OAuth App credentials
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error('Missing GitHub OAuth credentials');
      return new Response('Server configuration error', { status: 500 });
    }

    // Exchange code for access token
    const auth = createOAuthAppAuth({
      clientId,
      clientSecret,
    });

    const { token } = await auth({
      type: 'oauth-user',
      code,
      state,
    });

    // Create Octokit instance to verify token
    const octokit = new Octokit({ auth: token });

    // Get user info
    const { data: user } = await octokit.users.getAuthenticated();

    // Redirect back to admin panel with token
    const redirectUrl = new URL('/admin/', url.origin);
    redirectUrl.searchParams.set('access_token', token);
    redirectUrl.searchParams.set('user', JSON.stringify({
      name: user.name || user.login,
      login: user.login,
      avatar_url: user.avatar_url,
    }));

    return Response.redirect(redirectUrl.toString(), 302);

  } catch (error) {
    console.error('OAuth error:', error);
    return new Response('Authentication failed', { status: 500 });
  }
}