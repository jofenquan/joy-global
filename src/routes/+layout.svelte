<script>
	import { getFirebaseAuth } from '$lib/firebase/config.js';
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	// import other components
	import { AppShell, AppBar, Avatar } from '@skeletonlabs/skeleton';
	import { CircleUserSolid } from 'svelte-awesome-icons';
	import { onMount } from 'svelte';
	import { authStore } from '../store/authStore';
	import { goto } from '$app/navigation';

	let user = getFirebaseAuth().currentUser;

	onMount(() => {
		console.log("layout onMount");
		const unsubscribe = getFirebaseAuth().onAuthStateChanged(async user => {
			authStore.update((curr) => {
				return { ...curr, isLoading: false, currentUser: user };
			});
			console.log("onAuthStateChanged");
			const pathname = window.location.pathname;
			if (!user
				&& pathname !== '/login'
				&& pathname !== '/register'
				&& pathname !== '/') {
				console.log("user is not logged in");
				await goto('/login');	
			}
		});
		return unsubscribe;
	});
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<img src="./favicon.png" alt="logo" class="appbar-logo" />
			</svelte:fragment>
			<h1><span class="gradient-heading">Joy Global</span></h1>
			<svelte:fragment slot="trail">
				{#if user}
				<button type="button" class="btn bg-initial">
					<span><Avatar initials="JD" background="bg-primary-500" /></span>
				</button>
				{:else}
				<button type="button" class="btn bg-initial">
					<span><CircleUserSolid /></span>
					<span><a href="/login">Login</a></span>
				</button>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>
