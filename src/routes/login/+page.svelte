<script>
	import { signInWithEmailAndPassword } from "firebase/auth";
	import { getFirebaseAuth } from '$lib/firebase/config.js';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	async function handleLogin() {
		const auth = getFirebaseAuth();
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (err) {
			console.log(err);
		}
		console.log(auth);
		if (auth.currentUser) {
			goto("/");
		}
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="card">
		<header class="p-4 flex justify-center items-center space-x-4">
			<h3>Member Login</h3>
		</header>
		<section class="p-4 space-y-4">
			<label class="label">
				<span>Email</span>
				<input bind:value={email} class="input" type="email" placeholder="Enter email" />
			</label>

			<label class="label">
				<span>Password</span>
				<input bind:value={password} class="input" type="password" placeholder="Enter password" />
			</label>

		</section>
		<hr class="opacity-50" />
		<footer class="p-4 flex justify-center items-center space-x-4">
			<button on:click={handleLogin} type="button" class="btn variant-filled">
				<span>Login</span>
			</button>
		</footer>
	</div>
</div>

<style>

</style>