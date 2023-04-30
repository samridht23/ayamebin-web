<script lang="ts">
	import FileIcon from '$lib/icons/FileIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import DownloadIcon from '$lib/icons/DownloadIcon.svelte';
	import SecurityIcon from '$lib/icons/SecurityIcon.svelte';
	import { impKey, decryptData, base64ToArrayBuffer, dataDecoder } from '$lib/utils/encrypt';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	let file_key: string = $page.url.pathname.split('/')[1];
	let exportedKey: string = $page.url.hash.split('#key=')[1];
	let encryptedString: string;
	let value: string;
	let isLoading = true;
	const fetchData = async () => {
		try {
			const newKey = await impKey(exportedKey);
			await fetch('https://safepasteserver-production.up.railway.app?file_key=' + file_key, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Origin: 'https://safepasteserver-production.up.railway.app'
				}
			})
				.then((response) => response.json())
				.then((data) => {
					encryptedString = data.encryptedString;
				})
				.catch((err) => {
					console.error('Error fetching data');
					console.error(err);
					throw err;
				});
			console.log('Encrypted String fetchin from server and from s3 bucket', encryptedString);
			const newEncryptedBuffer = await base64ToArrayBuffer(encryptedString);
			const decryptedBuffer = await decryptData(newEncryptedBuffer, newKey);
			value = await dataDecoder(decryptedBuffer);
			isLoading = false;
		} catch (err) {
			console.error('Error fetching data', err);
		}
	};
	onMount(() => {
		fetchData();
	});
</script>

<div class="border border-zinc-600 rounded">
	<div class="flex border-b border-zinc-600 p-2 items-center justify-between rounded-t">
		<div class="stroke-[#808080]">
			<FileIcon size={20} />
		</div>
		<div class="flex items-center space-x-4">
			<div class="flex divide-x divide-zinc-600 border border-zinc-600 rounded bg-[#333238]">
				<button class="p-1 bg-transparent hover:bg-zinc-600 stroke-[#808080] hover:stroke-white"
					><CopyIcon size={20} /></button
				>
				<button class="p-1 bg-transparent hover:bg-zinc-600 stroke-[#808080] hover:stroke-white"
					><FileIcon size={20} /></button
				>
				<button class="p-1 bg-transparent hover:bg-zinc-600 stroke-[#808080] hover:stroke-white"
					><DownloadIcon size={20} /></button
				>
			</div>
			<a href="#">
				<div
					class="border border-zinc-600 rounded p-1 bg-[#333238] hover:bg-zinc-600 stroke-[#808080] hover:stroke-white"
				>
					<SecurityIcon size={20} />
				</div>
			</a>
		</div>
	</div>
	<div class="p-4 rounded text-sm bg-[#1D1F21] text-white">
		{#if isLoading}
			<p>Loading...</p>
		{:else}
			{value}
		{/if}
	</div>
</div>
