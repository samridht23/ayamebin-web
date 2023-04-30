<script lang="ts">
	import FileIcon from '$lib/icons/FileIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import DownloadIcon from '$lib/icons/DownloadIcon.svelte';
	import SecurityIcon from '$lib/icons/SecurityIcon.svelte';
	import { DataStore } from '../../store/DataStore';
	import { createEventDispatcher } from 'svelte';
	let textareavalue: string;
	const updateValue = () => {
		DataStore.update((storevalue) => {
			return { ...storevalue, textareavalue: textareavalue };
		});
	};
	const dispatch = createEventDispatcher();
	const handleInput = (event: any) => {
		textareavalue = (event.target as HTMLTextAreaElement).value;
		dispatch('input', textareavalue);
	};
</script>

<div class="border border-zinc-600 rounded">
	<div class="flex border-b border-zinc-600 p-2 items-center justify-between rounded-t">
		<div class="stroke-[#808080]">
			<FileIcon size={20} />
		</div>
		<div class="flex items-center space-x-4">
			<div class="flex divide-x divide-zinc-600 border border-zinc-600 rounded bg-[#333238]">
				<button
					class="p-1 bg-transparent hover:bg-zinc-600 stroke-[#808080] hover:stroke-white disabled:bg-transparent disabled:stroke-[#808080]"
					disabled><CopyIcon size={20} /></button
				>
				<button
					class="p-1 bg-transparent hover:bg-zinc-600 stroke-[#808080] hover:stroke-white disabled:bg-transparent disabled:stroke-[#808080]"
					disabled
				>
					<FileIcon size={20} />
				</button>
				<button
					class="p-1 bg-transparent hover:bg-zinc-600 stroke-[#808080] hover:stroke-white disabled:bg-transparent disabled:stroke-[#808080]"
					disabled
				>
					<DownloadIcon size={20} />
				</button>
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
	<div class="p-4 bg-[#1D1F21] rounded">
		<textarea
			class="outline-none w-full resize-none whitespace-pre text-white text-sm bg-[#1D1F21] h-[50vh]"
			placeholder="Enter text here"
			spellCheck={false}
			required
			bind:value={textareavalue}
			on:change={updateValue}
			on:input={handleInput}
		/>
	</div>
</div>
