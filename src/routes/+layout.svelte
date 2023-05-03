<script>
	//import Menu from '$lib/components/Menu.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';
</script>

<div class="flex flex-col h-screen justify-between">
	<div>
		<Navbar />
		<div class="px-4 w-full lg:w-3/5 m-auto">
			<slot />
		</div>
	</div>
	<div>
		<Footer />
	</div>
</div>
