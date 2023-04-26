<script lang="ts">
	import { onDestroy } from 'svelte';
	import { DataStore } from '../../store/DataStore';
	import { createId } from '@paralleldrive/cuid2';
	import DownIcon from '$lib/icons/DownIcon.svelte';
	import { encryptData } from '$lib/utils/encrypt';
	import { goto } from '$app/navigation';
	let textareavalue: string = '';
	const unsubscribe = DataStore.subscribe((value) => {
		textareavalue = value.textareavalue;
	});
	interface Option {
		label: string;
		expiry: number;
	}
	onDestroy(() => {
		unsubscribe();
	});
	let expiry: number;
	let options: Option[] = [
		{
			label: 'Burn after read',
			expiry: 0
		},
		{
			label: 'Expire in 1 day',
			expiry: 1
		},
		{
			label: 'Expire in 10 days',
			expiry: 10
		},
		{
			label: 'Expire in 30 days',
			expiry: 30
		},
		{
			label: 'Expire in 6 months',
			expiry: 182.5
		},
		{
			label: 'Expire in 1 year',
			expiry: 365
		}
	];
	const uploadData = async () => {
		try {
			let uniqueId = createId();
			// make arrayBuffer to base64 string code modular
			// decrypt key is the key required to decrypt the data from s3
			let { encryptedData, decryptKey } = await encryptData(textareavalue);
			let binaryString = String.fromCharCode(...new Uint8Array(encryptedData));
			let base64String = btoa(binaryString);
			const stringifiedDecryptKey = (await window.crypto.subtle.exportKey('jwk', decryptKey)).k;
			// remove this code after the project has been compleleted
			console.log(base64String);
			await fetch('http://localhost:8080', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Origin: 'http://localhost:5173'
				},
				body: JSON.stringify({ expiry, base64String, uniqueId })
			})
				.then((response) => {
					if (response.ok) {
						goto('/' + uniqueId + '#key=' + stringifiedDecryptKey);
					}
				})
				.catch((err) => {
					console.error('Error Uploading Data');
					console.error(err);
					throw err;
				});
		} catch (err) {
			throw err;
		}
	};
</script>

<div class="flex flex-row py-2 items-center justify-between">
	<div class="flex flex-row space-x-4 justify-center border rounded border-gray-800">
		<button class="rounded py-2 px-1 md:p-2 text-white text-sm bg-blue-800 text-gray-300" disabled
			>Clone Paste</button
		>
	</div>
	<div class="flex space-x-1 md:space-x-4">
		<div class="relative text-sm flex space-x-2 items-center">
			<select
				bind:value={expiry}
				class="w-40 lg:w-44 outline-none p-2 border border-zinc-600 rounded bg-[#333238] appearance-none text-white"
			>
				{#each options as option}
					<option value={option.expiry} class="bg-gray-200">{option.label}</option>
				{/each}
			</select>
			<div
				class="absolute border-black right-1 flex pointer-events-none cursor-pointer bg-[#333238]"
			>
				<DownIcon size={20} color="white" />
			</div>
		</div>
		<div class="flex flex-row space-x-4 justify-center border rounded border-gray-800">
			<button on:click={uploadData} class="rounded p-2 text-white text-sm bg-green-600"
				>Create Paste</button
			>
		</div>
	</div>
</div>
