import { getFirebaseAuth } from '$lib/firebase/config.js';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const user = getFirebaseAuth().currentUser;
    const pathname = event.url.pathname;
    if (pathname !== '/'
        && pathname !== '/login'
        && pathname !== '/register'
        && !user) {
        return new Response(null, {
			status: 303,
			headers: { location: '/login' }
		});
    }
    console.log("normal request");
    return resolve(event);
}