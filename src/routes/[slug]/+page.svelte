<script lang="ts">
	import FileIcon from '$lib/icons/FileIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import DownloadIcon from '$lib/icons/DownloadIcon.svelte';
	import SecurityIcon from '$lib/icons/SecurityIcon.svelte';
	import { decryptData } from '$lib/utils/encrypt';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	let content = ``;
	let file_key = $page.url.pathname.split('/')[1];
	let key = $page.url.hash.split('#key=')[1];
	console.log(key);
	console.log(file_key);
	function base64ToArrayBuffer(base64: string): ArrayBuffer {
		var binaryString = atob(base64);
		var bytes = new Uint8Array(binaryString.length);
		for (var i = 0; i < binaryString.length; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}
		return bytes.buffer;
	}
	const keyAndBufferDecryption = async (encryptedData: ArrayBuffer): Promise<string> => {
		try {
			const decryptionKey = await window.crypto.subtle.importKey(
				'jwk',
				{
					k: key,
					alg: 'A128GCM',
					ext: true,
					key_ops: ['encrypt', 'decrypt'],
					kty: 'oct'
				},
				{ name: 'AES-GCM', length: 128 },
				false, // extractable
				['decrypt']
			);
			const content = await decryptData(encryptedData, decryptionKey);
			return content;
		} catch (err) {
			console.error('Error during Key and Buffer description');
			throw err;
		}
	};
	const fetchData = async () => {
		try {
			await fetch('http://localhost:8080?file_key=' + file_key, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Origin: 'http://localhost:5173'
				}
			})
				.then((response) => response.json())
				.then((data) => {
					const encryptedData = data.encryptedData;
					const encryptedBuffer = base64ToArrayBuffer(encryptedData);
					const result = keyAndBufferDecryption(encryptedBuffer);
					console.log(result);
				})
				.catch((err) => {
					console.error('Error fetching data');
					console.error(err);
					throw err;
				});
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
		<div>
			<FileIcon size={20} color="#808080" />
		</div>
		<div class="flex items-center space-x-4">
			<div class="flex divide-x divide-zinc-600 border border-zinc-600 rounded bg-[#333238]">
				<button class="p-1 bg-transparent"><CopyIcon size={20} color="#808080" /></button>
				<button class="p-1 bg-transparent"><FileIcon size={20} color="#808080" /></button>
				<button class="p-1 bg-transparent"><DownloadIcon size={20} color="#808080" /></button>
			</div>
			<a href="#">
				<div class="border border-zinc-600 rounded p-1 bg-[#333238]">
					<SecurityIcon size={20} color="#808080" />
				</div>
			</a>
		</div>
	</div>
	<div class="p-4 rounded text-sm bg-[#1D1F21] text-white">
		{content}
	</div>
</div>
