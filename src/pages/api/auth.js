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

    // Redirect back to admin dashboard with success
    const redirectUrl = new URL('/admin/dashboard/', url.origin);
    redirectUrl.searchParams.set('oauth_success', 'true');

    return Response.redirect(redirectUrl.toString(), 302);

  } catch (error) {
    console.error('OAuth error:', error);
    const errorUrl = new URL('/admin/dashboard/', url.origin);
    errorUrl.searchParams.set('oauth_error', 'authentication_failed');
    return Response.redirect(errorUrl.toString(), 302);
  }
}

export async function POST({ request }) {
  try {
    const { code } = await request.json();

    if (!code) {
      return new Response(JSON.stringify({ error: 'No code provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // GitHub OAuth App credentials
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error('Missing GitHub OAuth credentials');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Exchange code for access token
    const auth = createOAuthAppAuth({
      clientId,
      clientSecret,
    });

    const { token } = await auth({
      type: 'oauth-user',
      code,
    });

    // Create Octokit instance to verify token
    const octokit = new Octokit({ auth: token });

    // Get user info
    const { data: user } = await octokit.users.getAuthenticated();

    // Return token and user info
    return new Response(JSON.stringify({
      access_token: token,
      user: {
        name: user.name || user.login,
        login: user.login,
        avatar_url: user.avatar_url,
        id: user.id
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('OAuth POST error:', error);
    return new Response(JSON.stringify({ error: 'Authentication failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}