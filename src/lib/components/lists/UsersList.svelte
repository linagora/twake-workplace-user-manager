<script lang="ts">
	import DisableUserButton from '$components/buttons/DisableUserButton.svelte';
	import EnableUserButton from '$components/buttons/EnableUserButton.svelte';
	import SearchIcon from '$components/icons/SearchIcon.svelte';
	import { toggleForm } from '$store/form';
	import type { User, usersStatusFilter } from '$types';
	import { t } from 'svelte-i18n';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms/client';

	export let users: User[] = [];

	let search: string = '';
	let statusFilter: usersStatusFilter = 'all';
	let enableFormRef: HTMLFormElement;
	let disableFormRef: HTMLFormElement;

	const { form, enhance, submitting, allErrors } = superForm($toggleForm, {
		dataType: 'json'
	});

	const changeTab = (filter: usersStatusFilter) => {
		statusFilter = filter;
	};

	const disable = (cn: string) => {
		$form.cn = cn;

		disableFormRef.requestSubmit();
	};

	const enable = (cn: string) => {
		$form.cn = cn;

		enableFormRef.requestSubmit();
	};

	$: items = users.filter((user) => {
		if (search.length) {
			const searchString = search.toLocaleLowerCase();

			if (
				!user.cn?.toLocaleLowerCase().includes(searchString) &&
				!user.sn?.toLocaleLowerCase().includes(searchString) &&
				!user.givenName?.toLocaleLowerCase().includes(searchString) &&
				!user.mobile?.toLocaleLowerCase().includes(searchString) &&
				!user.mail?.toLocaleLowerCase().includes(searchString)
			) {
				return false;
			}
		}

		if (statusFilter === 'inactive') {
			return user.pwdAccountLockedTime;
		}

		if (statusFilter === 'active') {
			return !user.pwdAccountLockedTime;
		}

		return true;
	});

	$: activeCount = users.filter(({ pwdAccountLockedTime }) => !pwdAccountLockedTime).length;
	$: inactiveCount = users.filter(({ pwdAccountLockedTime }) => pwdAccountLockedTime).length;
	$: $allErrors.map((error) => {
		toast.error(error.messages.join('. '));
	});
</script>

<form class="hidden" method="post" action="?/enable" use:enhance bind:this={enableFormRef}>
	<input type="hidden" name="cn" bind:value={$form.cn} />
</form>

<form class="hidden" method="post" action="?/disable" use:enhance bind:this={disableFormRef}>
	<input type="hidden" name="cn" bind:value={$form.cn} />
</form>

<div class="w-full lg:px-5">
	<div class="flex flex-row items-center justify-center md:justify-start gap-x-3">
		<h2 class="text-lg font-medium text-gray-800">LDAP users list</h2>

		<span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full"
			>{users.length} users</span
		>
	</div>
	<div
		class="flex px-2 py-5 lg:py-2 lg:px-0 flex-col lg:flex-row lg:items-center items-start space-y-5 lg:space-y-0 justify-between w-full"
	>
		<div
			class="flex flex-row overflow-hidden bg-white border divide-x rounded-lg w-full lg:w-auto lg:min-w-96"
		>
			<button
				on:click={() => {
					changeTab('all');
				}}
				class="px-5 w-full py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
				'all'
					? 'bg-gray-100'
					: ''} sm:text-sm"
			>
				{$t('All')}
			</button>
			<button
				on:click={() => {
					changeTab('active');
				}}
				class="px-5 py-2 w-full text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
				'active'
					? 'bg-gray-100'
					: ''} sm:text-sm hover:bg-gray-100"
			>
				{$t('Active')}
				<span
					class="inline-flex items-center justify-center w-auto min-w-5 px-1 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
				>
					{activeCount}
				</span>
			</button>
			<button
				on:click={() => {
					changeTab('inactive');
				}}
				class="px-5 py-2 w-full text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
				'inactive'
					? 'bg-gray-100'
					: ''} sm:text-sm hover:bg-gray-100"
			>
				{$t('Inactive')}
				<span
					class="inline-flex items-center justify-center w-auto min-w-5 px-1 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
				>
					{inactiveCount}
				</span>
			</button>
		</div>
		<div class="w-full md:w-auto md:pb-0">
			<div class="flex items-center mt-0 h-6 relative w-full">
				<button class="absolute left-0 focus:outline-none">
					<SearchIcon />
				</button>
				<input
					bind:value={search}
					placeholder={$t('search-placeholder')}
					type="text"
					class="block w-full pl-10 py-1.5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-[500px] placeholder-gray-400/70 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
				/>
			</div>
		</div>
	</div>

	<div class="flex flex-col w-full px-1 lg:px-0">
		<div class="overflow-x-auto w-full">
			<div class="inline-block min-w-full py-2 align-middle">
				<div class="overflow-clip border border-gray-200 md:rounded-lg">
					<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-gray-50">
							<tr>
								<th
									scope="col"
									class="px-12 py-3 text-sm font-normal text-left rtl:text-right text-gray-500"
								>
									CN
								</th>
								<th
									scope="col"
									class="py-3 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
								>
									UID
								</th>

								<th
									scope="col"
									class="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500"
								>
									sn
								</th>

								<th
									scope="col"
									class="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500"
									>givenName</th
								>
								<th
									scope="col"
									class="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500"
									>displayName</th
								>
								<th
									scope="col"
									class="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500"
									>mobile</th
								>
								<th
									scope="col"
									class="px-4 py-3 text-sm font-normal text-left rtl:text-right text-gray-500"
									>mail</th
								>
								<th scope="col" class="relative py-3 px-4">
									<span class="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							{#each items as user}
								<tr class="hover:bg-slate-200 transition duration-350">
									<td class="px-4 py-2.5 text-sm whitespace-nowrap">
										{user.cn ?? ''}
									</td>
									<td class="px-4 py-2.5 text-sm whitespace-nowrap">
										{user.uid ?? ''}
									</td>
									<td class="px-4 py-2.5 text-sm whitespace-nowrap">
										{user.sn ?? ''}
									</td>
									<td class="px-4 py-2.5 text-sm whitespace-nowrap">
										{user.givenName ?? ''}
									</td>
									<td class="px-4 py-2.5 text-sm whitespace-nowrap">
										{user.displayName ?? ''}
									</td>
									<td class="px-4 py-2.5 text-sm whitespace-nowrap">
										{user.mobile ?? ''}
									</td>
									<td class="px-4 py-2.5 text-sm whitespace-nowrap">
										{user.mail ?? ''}
									</td>
									<td
										class="px-4 py-2.5 text-sm whitespace-nowrap sticky right-0 bg-white/80 lg:bg-transparent"
									>
										<div class="flex rounded-md justify-end items-end w-full" role="group">
											{#if user.pwdAccountLockedTime}
												<EnableUserButton
													disabled={!user.pwdAccountLockedTime}
													loading={$submitting && $form.cn === user.cn}
													handler={() => enable(user.cn)}
												/>
											{:else}
												<DisableUserButton
													disabled={!!user.pwdAccountLockedTime}
													loading={$submitting && $form.cn === user.cn}
													handler={() => disable(user.cn)}
												/>
											{/if}
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
