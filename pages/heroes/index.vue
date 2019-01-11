<template>
	<v-container fluid>
		<c-title :title="'Manage Heroes'" />
		<v-data-table class="elevation-1 my-3" :headers="headers" :items="heroes" :rows-per-page-items="perPageItems">
			<template slot="items" slot-scope="props">
				<td class="pa-0">
					<v-img :src="`/heroes/portrait/${props.item.name.replace(/\s+/g, '-').toLowerCase()}.png`" />
				</td>
				<td>
					<nuxt-link exact :to="`/heroes/${props.item._id}`">
						<h2>{{ props.item.name }}</h2>
					</nuxt-link>
				</td>
				<td><h2>{{ props.item.stars }}</h2></td>
				<td :class="color(props.item.score.arena)">
					<h2>{{ props.item.score.arena }}</h2>
				</td>
				<td :class="color(props.item.score.hunt)">
					<h2>{{ props.item.score.hunt }}</h2>
				</td>
				<td :class="color(props.item.score.abyss)">
					<h2>{{ props.item.score.abyss }}</h2>
				</td>
				<td :class="color(props.item.score.raid)">
					<h2>{{ props.item.score.raid }}</h2>
				</td>
				<td :class="color(props.item.score.overall)">
					<h2>{{ props.item.score.overall }}</h2>
				</td>
				<td class="text-xs-right">
					<v-btn @click="prompt(props.item)" color="error" icon>
						<v-icon>delete</v-icon>
					</v-btn>
				</td>
			</template>
		</v-data-table>

		<v-btn bottom color="success" fab fixed right router to="/heroes/add">
			<v-icon>person_add</v-icon>
		</v-btn>

		<v-dialog max-width="400px" v-model="dialog">
			<v-card>
				<v-card-title class="headline text-capitalize">
					Delete {{ deleteHeroInfo.name }} Info?
				</v-card-title>
				<v-card-text>
					Are you sure you want to delete this hero? This action is not reversible.
				</v-card-text>
				<v-card-actions>
					<v-btn @click.stop="dialog = false" color="primary" flat>Close</v-btn>
					<v-spacer></v-spacer>
					<v-btn @click="deleteHero" color="error" :disabled="loader" :loading="loader">Delete Hero</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import util from '~/components/app/util.js'

export default {
	asyncData ({ app, error }) {
		return app.$axios.$get('/api/v1/heroes')
		.then(res => {
			let heroes = res.map(v => {
				v.score.overall = (Object.values(v.score).reduce((a, b) => a + b) / 4).toPrecision(2)
				return v
			})
			return { heroes: heroes }
		})
		.catch(err => { error({ statusCode: '404', message: 'Heroes not found' }) })
	},
	data () {
		return {
			deleteHeroInfo: {},
			dialog: false,
			headers: [
				{ text: 'Portrait', sortable: false, value: 'name' },
				{ text: 'Name', align: 'left', sortable: true, value: 'name' },
				{ text: 'Stars', sortable: true, value: 'stars' },
				{ text: 'Arena', sortable: true, value: 'score.arena' },
				{ text: 'Hunt', sortable: true, value: 'score.hunt' },
				{ text: 'Abyss', sortable: true, value: 'score.abyss' },
				{ text: 'Raid', sortable: true, value: 'score.raid' },
				{ text: 'Overall', sortable: true, value: 'score.overall' },
				{ text: 'Actions', align: 'right', value: 'actions' },
			],
			loader: false,
			perPageItems: [15, 30, {"text":"All","value":-1}],
			util: util,
		}
	},
	head () {
		return {
			title: 'Manage Heroes',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'This page is for members to manage heroes' }
			]
		}
	},
	methods: {
		color (score) {
			if (score == 10) {
				return 'blue--text'
			} else if (score >= 9) {
				return 'green--text'
			} else if (score <= 7) {
				return 'red--text'
			} else {
				return ''
			}
		},
		async deleteHero () {
			this.loader = true
			await this.$axios.$delete('/api/v1/heroes/' + this.deleteHeroInfo._id)
			.then(res => {
				this.heroes = this.heroes.filter(e => e._id !== res)
				this.dialog = false
				this.deleteHeroInfo = {}
			})
			.catch(err => { this.util.catchErrors(err, 'There was an error deleting the hero', this.$store) })
			.finally(() => {
				this.loader = false
			})
		},
		prompt (hero) {
			this.deleteHeroInfo = hero
			this.dialog = true
		},
	},
	middleware: 'member',
}
</script>
