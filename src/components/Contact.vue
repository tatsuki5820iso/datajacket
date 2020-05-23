<template>
	<v-layout row wrap justify-center align-center>
		{{ text }}
	</v-layout>
</template>

<script>
export default {
	data () {
		return {
			text: "",
			textAll: "Coming soon...",
			interval: null,
		}
	},

	mounted () {
		this.interval = setInterval(() => {
			if (this.text.length >= this.textAll.length) {
				this.text = ""
			} else {
				this.text = this.textAll.slice(0, this.text.length + 1)
			}
		}, 200);
	},

	beforeDestroy () {
		clearInterval(this.interval)
	}
 }
</script>