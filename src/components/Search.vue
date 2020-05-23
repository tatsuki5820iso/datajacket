<template>
	<v-layout column px-4>
		<v-layout wrap align-start>
			<v-layout column>
				<v-layout wrap align-end>
					<v-flex xs6>
						<v-textarea
							label="Fill out your wishes!"
							v-model="sentence"
						></v-textarea>
					</v-flex>
					<v-flex xs3 pb-5 ml-5>
						<v-btn color="gray" rounded outlined @click="search()">Search</v-btn>
					</v-flex>
				</v-layout>
				<v-layout column wrap full-width v-show="keyWords.length > 0">
					<h2 class="animate__animated animate__bounce">You may need...</h2>
					<v-layout row justify-start>
						<v-chip v-for="(word, key) in keyWords" :key="key"
							@click="openAmazon(word)"
							class="mr-2 mb-2">{{word}}</v-chip>
					</v-layout>
				</v-layout>
			</v-layout>
		</v-layout>
	</v-layout>
</template>

<script>
import { requestDJ } from '../data/dataJacketEndpoint'
import { disassemble, toQuery, toRequirementArray } from '../data/wordConverter'

export default {
	data () {
		return {
			sentence: "Make a new house",
			keyWords: []
		}
	},

	methods: {
		async search () {
			var words = disassemble(this.sentence)
			if (words.length == 0) return;
			var query = toQuery(words)
			var result = await this.request(query)
			var requirements = result.data.results.bindings.map(binding => binding.req.value)
			this.keyWords = toRequirementArray(requirements)
		},

		async request (txtQuery) {
			try {
				return await requestDJ(txtQuery)
			} catch (e) {
				console.error(`Error! ${e}`)
			}
		},

		openAmazon (word) {
			open(`https://www.amazon.co.jp/s?k=${word}`)
		}
	}
}
</script>

<style scoped>
</style>