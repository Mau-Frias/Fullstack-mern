const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000, // 1 hour
    path: '/',
    sameSite: 'strict',
};

console.log('COOKIE_OPTIONS initialized:', COOKIE_OPTIONS); // Debug log

export default COOKIE_OPTIONS;
