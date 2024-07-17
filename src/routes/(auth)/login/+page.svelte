<script lang="ts">
	import type { PageData } from './$types';
	import { t } from 'svelte-i18n';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms/client';
	import SubmitButton from '$components/buttons/SubmitButton.svelte';
	import TextInput from '$components/inputs/TextInput.svelte';
	import PasswordInput from '$components/inputs/PasswordInput.svelte';
	import TwakeWorkplaceLogo from '$components/logos/TwakeWorkplaceLogo.svelte';

	export let data: PageData;

	const { form, enhance, submitting, allErrors } = superForm(data.form, {
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success($t('logged-in'));
			}
		}
	});

	$: $allErrors.map((error) => {
		toast.error(error.messages.join('. '));
	});
</script>

<div class="w-full max-w-lg p-6 m-auto mx-auto bg-white rounded lg:shadow-2xl flex flex-col">
	<div class="flex justify-center lg:mx-auto">
		<TwakeWorkplaceLogo />
	</div>

	<form class="mt-6" use:enhance method="post">
		<TextInput
			name="username"
			placeholder={$t('Username')}
			bind:value={$form.username}
			label={$t('Username')}
			required
		/>

		<PasswordInput name="password" label={$t('Password')} bind:value={$form.password} required />

		<div class="mt-6">
			<SubmitButton loading={$submitting} disabled={$submitting} ariaLabel={$t('Login')}
				>{$t('Login')}</SubmitButton
			>
		</div>
	</form>
</div>
