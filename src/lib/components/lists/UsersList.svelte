<script lang="ts">
	import type { User } from '$types';

	export let users: User[] = [];
</script>

<section class="px-4 w-full">
	<h2 class="text-lg text-gray-800">Users list</h2>

	<p class="mt-1 text-sm text-gray-500">The list of users in the LDAP.</p>

	<div class="flex flex-col mt-6 w-full">
		<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 w-full">
			<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
				<div class="overflow-hidden border border-gray-200 md:rounded-lg">
					<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-gray-50">
							<tr>
								<th
									scope="col"
									class="px-12 py-2 text-sm font-normal text-left rtl:text-right text-gray-500"
								>
									CN
								</th>
								<th
									scope="col"
									class="py-2 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
								>
									UID
								</th>

								<th
									scope="col"
									class="px-4 py-2 text-sm font-normal text-left rtl:text-right text-gray-500"
								>
									sn
								</th>

								<th
									scope="col"
									class="px-4 py-2 text-sm font-normal text-left rtl:text-right text-gray-500"
									>givenName</th
								>
								<th
									scope="col"
									class="px-4 py-2 text-sm font-normal text-left rtl:text-right text-gray-500"
									>displayName</th
								>
								<th
									scope="col"
									class="px-4 py-2 text-sm font-normal text-left rtl:text-right text-gray-500"
									>mobile</th
								>
								<th
									scope="col"
									class="px-4 py-2 text-sm font-normal text-left rtl:text-right text-gray-500"
									>mail</th
								>

								<th scope="col" class="relative py-2 px-4">
									<span class="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							{#each users as user}
								<tr>
									<td class="px-4 py-3 text-sm whitespace-nowrap">
										{user.cn ?? ''}
									</td>
									<td class="px-4 py-3 text-sm whitespace-nowrap">
										{user.uid ?? ''}
									</td>
									<td class="px-4 py-3 text-sm whitespace-nowrap">
										{user.sn ?? ''}
									</td>
									<td class="px-4 py-3 text-sm whitespace-nowrap">
										{user.givenName ?? ''}
									</td>
									<td class="px-4 py-3 text-sm whitespace-nowrap">
										{user.displayName ?? ''}
									</td>
									<td class="px-4 py-3 text-sm whitespace-nowrap">
										{user.mobile ?? ''}
									</td>
									<td class="px-4 py-3 text-sm whitespace-nowrap">
										{user.mail ?? ''}
									</td>

									<td class="px-4 py-3 text-sm whitespace-nowrap">
										<button
											class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg hover:bg-gray-100"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												class="w-6 h-6"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
												/>
											</svg>
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</section>
