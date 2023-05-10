<script>
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { PersonSolid, PersonDressSolid } from 'svelte-awesome-icons';
	import { TelInput } from "svelte-tel-input";
	import { createUserWithEmailAndPassword } from "firebase/auth";
	import { getFirebaseAuth } from '$lib/firebase/config.js';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let confirmPassword = '';
	let sex = 'female';
	let telInputValid = true;
	let telInput = "";

	async function handleRegistration() {
		const auth = getFirebaseAuth();
		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (err) {
			console.log(err);
		}
		if (auth.currentUser) {
			goto("/");
		}
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="card">
		<header class="p-4 flex justify-center items-center space-x-4">
			<h3>Member Register</h3>
		</header>
		<section class="p-4 space-y-4">
			<label class="label">
				<span>Email</span>
				<input bind:value={email} class="input" type="email" placeholder="Enter email" />
			</label>

			<label class="label">
				<span>Name</span>
				<input class="input" type="text" placeholder="Input name please" />
			</label>

			<label class="label">
				<span>Password</span>
				<input bind:value={password} class="input" type="password" placeholder="Enter password" />
			</label>

			<label class="label">
				<span>Confirm password</span>
				<input bind:value={confirmPassword} class="input" type="password" placeholder="Enter confirm password" />
			</label>

			<label class="label">
				<span>Job title</span>
				<select class="select">
					<option value="1">Option 1</option>
					<option value="2">Option 2</option>
					<option value="3">Option 3</option>
					<option value="4">Option 4</option>
					<option value="5">Option 5</option>
				</select>
			</label>
			
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">
				<span>Sex</span>
				<span class="input-sex-div">
					<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
						<RadioItem bind:group={sex} name="justify" value="male">
							<div class="btn">
								<span><PersonSolid /></span>
								<span>Male</span>
							</div>
						</RadioItem>
						<RadioItem bind:group={sex} name="justify" value="female">
							<div class="btn">
								<span><PersonDressSolid /></span>
								<span>Female</span>
							</div>
						</RadioItem>
					</RadioGroup>
				</span>
			</label>

			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="label">
				<span>Tel</span>
				<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
					<div class="input-group-shim">+81</div>
					<TelInput bind:valid={telInputValid} country="JP" bind:value={telInput} class="{!telInputValid && 'input-error'}" />
				</div>
				<!-- <input class="input" type="tel" placeholder="XXX-XXXX-XXXX" /> -->
			</label>
		</section>
		<hr class="opacity-50" />
		<footer class="p-4 flex justify-center items-center space-x-4">
			<button on:click={handleRegistration} type="button" class="btn variant-filled">
				<span>Register</span>
			</button>
		</footer>
	</div>
</div>

<style>
	.input-sex-div {
		display: flex;
		width: fit-content;
	}
</style>