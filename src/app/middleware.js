import { NextResponse } from 'next/server';

// Utility function to check if a token is expired
const isTokenExpired = (token) => {
    const [, payload] = token.split('.');
    const { exp } = JSON.parse(Buffer.from(payload, 'base64').toString());
    return Date.now() >= exp * 1000; // Convert seconds to milliseconds
};

export async function middleware(req) {
    const { nextUrl, cookies } = req;
    const accessToken = cookies.get('accessToken');
    const refreshToken = cookies.get('refreshToken');

    // List of protected routes
    const protectedRoutes = ['/dashboard', '/profile', '/login'];

    // If the route is not protected, allow the request
    if (!protectedRoutes.some(route => nextUrl.pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // If no access token, redirect to login
    if (!accessToken) {
        return NextResponse.redirect('/login');
    }

    // Check if the token is expired
    if (isTokenExpired(accessToken)) {
        if (!refreshToken) {
            // If no refresh token, redirect to login
            return NextResponse.redirect('/login');
        }

        // Try to refresh the access token
        try {
            const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/jwt/refresh/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (refreshResponse.ok) {
                const { access } = await refreshResponse.json();
                const res = NextResponse.next();

                // Set the new access token in the cookies
                res.cookies.set('accessToken', access, { httpOnly: true });
                return res;
            } else {
                // Refresh failed, redirect to login
                return NextResponse.redirect('/login');
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            return NextResponse.redirect('/login');
        }
    }

    // Token is valid, continue to the requested page
    return NextResponse.next();
}

