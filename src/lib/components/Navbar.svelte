<script>
    import GithubLogo from '$lib/icons/GithubLogo.svelte';
    import TwitterLogo from '$lib/icons/TwitterLogo.svelte';
</script>

<div
	class="bg-[#333238] text-white h-[60px] w-full border-b border-zinc-600"
>
	<div class="flex items-center justify-between h-full px-4 w-full lg:w-3/5 m-auto bg-transparent">
		<div class="text-xl text-white bg-transparent">
			<a href="https://svmridh.xyz" class="bg-transparent"> SafePaste</a>
		</div>
		<div class="flex space-x-4 text-sm bg-transparent">
				<a href="https://twitter.com/svmridh" class="bg-transparent"><TwitterLogo size={20} color={"white"}/></a>
				<a href="https://github.com/samridht23" class="bg-transparent"><GithubLogo size={20} color={"white"} /></a>
		</div>
	</div>
</div>
