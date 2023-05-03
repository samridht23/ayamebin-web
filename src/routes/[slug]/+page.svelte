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
	const copyToClipboard = async () => {
		try {
			navigator.clipboard.writeText(value).then(
				() => {
					console.log('copied');
				},
				(err) => {
					console.log('not copied',err);
				}
			);
		} catch (err) {
			throw err;
		}
	};
	const downloadValue = async () => {
		try {
			const blob = new Blob([value], { type: 'text/plain' });
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = file_key+'.txt';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		} catch (err) {
			throw err;
		}
	};
	onMount(() => {
		fetchData();
	});
</script>

<div class="mt-12">
	<div class="flex flex-row py-2 items-center justify-end">
		<div class="flex space-x-1 md:space-x-4">
			<div class="flex flex-row space-x-4 justify-center">
				<button class="rounded p-2 text-white text-sm bg-blue-600 disabled:bg-green-800"
					>Clone Paste</button
				>
				<button class="rounded p-2 text-white text-sm bg-green-600 disabled:bg-green-800"
					>+ New Paste</button
				>
			</div>
		</div>
	</div>
	<div class="border border-zinc-600 rounded">
		<div class="flex border-b border-zinc-600 p-2 items-center justify-between rounded-t">
			<div class="stroke-[#808080]">
				<FileIcon size={20} />
			</div>
			<div class="flex items-center space-x-4">
				<div class="flex divide-x divide-zinc-600 border border-zinc-600 rounded bg-[#333238]">
					<button
						class="p-1 bg-transparent hover:bg-zinc-600 stroke-[#808080] hover:stroke-white"
						on:click={copyToClipboard}><CopyIcon size={20} /></button
					>
					<button class="p-1 bg-transparent hover:bg-zinc-600 stroke-[#808080] hover:stroke-white"
                    on:click={downloadValue}
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
</div>
