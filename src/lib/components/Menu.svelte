<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { DataStore } from '../../store/DataStore';
	import { createId } from '@paralleldrive/cuid2';
	import DownIcon from '$lib/icons/DownIcon.svelte';
	import {
		encryptData,
		genKey,
		arrayBufferToBase64,
		expKey,
		dataEncoder
	} from '$lib/utils/encrypt';
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
	let createPasteState = false;
	const createPaste = () => {
		createPasteState = true;
	};
	const uploadData = async () => {
		try {
			const uniqueId = createId();
			const key = await genKey();
			const exportedKey = await expKey(key);
			const encodedBuffer = await dataEncoder(textareavalue);
			const encryptedBuffer = await encryptData(encodedBuffer, key);
			const encryptedString = await arrayBufferToBase64(encryptedBuffer);
			console.log('Encrypted String going to server', encryptedString);
			await fetch('https://safepasteserver-production.up.railway.app', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Origin: 'https://safepasteserver-production.up.railway.app'
				},
				body: JSON.stringify({ expiry, encryptedString, uniqueId })
			})
				.then((response) => {
					if (response.ok) {
						goto('/' + uniqueId + '#key=' + exportedKey);
						createPaste();
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
		<button
			class="rounded py-2 px-1 md:p-2 text-white text-sm bg-blue-600 disabled:bg-blue-800 text-gray-300"
			disabled>Clone Paste</button
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
			<button
				on:click={uploadData}
				disabled={createPasteState}
				class="rounded p-2 text-white text-sm bg-green-600 disabled:bg-green-800">Create Paste</button
			>
		</div>
	</div>
</div>
