<script lang="ts">
	import FileIcon from '$lib/icons/FileIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import DownloadIcon from '$lib/icons/DownloadIcon.svelte';
	import SecurityIcon from '$lib/icons/SecurityIcon.svelte';
	import { DataStore } from '../../store/DataStore';
	let textareavalue: string;
	const updateValue = () => {
		DataStore.update((storevalue) => {
			return { ...storevalue, textareavalue: textareavalue };
		});
	};
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
	<div class="p-4 bg-[#1D1F21] rounded">
		<textarea
			class="outline-none w-full resize-none whitespace-pre text-white text-sm bg-[#1D1F21] h-[50vh]"
			placeholder="Enter text here"
			spellCheck={false}
			required
			bind:value={textareavalue}
			on:change={updateValue}
		/>
	</div>
</div>
