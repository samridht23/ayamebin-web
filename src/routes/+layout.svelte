<script>
	import Navbar from '$lib/components/Navbar.svelte';
    import "../app.css";
</script>

<div>
	<Navbar />

	<div class="px-4 w-full lg:w-3/5 m-auto">
	<slot />
    </div>
</div>
