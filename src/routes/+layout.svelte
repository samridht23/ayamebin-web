<script>
	import Menu from '$lib/components/Menu.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
</script>

<div>
	<Navbar />
	<div class="px-4 w-full lg:w-3/5 m-auto">
		<div class="mt-12 mb-1 flex flex-col">
			<Menu />
		</div>
		<div>
			<slot />
		</div>
	</div>
</div>
