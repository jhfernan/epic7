<template>
	<v-container>
		<c-title :title="'Rankings'" />
		<v-data-table :headers="headers" hide-actions :items="heroes">
			<template slot="items" slot-scope="props">
				<td class="pa-0">
					<v-img :src="`/heroes/portrait/${props.item.name.replace(/\s+/g, '-').toLowerCase()}.png`" />
				</td>
				<td><h2>{{ props.item.name }}</h2></td>
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
				<td class="markdown-naked pt-1">
					<markdown v-if="props.item.recommended">{{ props.item.recommended.sets }}</markdown>
				</td>
			</template>
		</v-data-table>
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
			return { heroes: heroes, util: util }
		})
		.catch(err => { error({ statusCode: '404', message: 'Heroes not found' }) })
	},
	data () {
		return {
			headers: [
				{ text: 'Portrait', sortable: false, value: 'name' },
				{ text: 'Name', align: 'left', sortable: true, value: 'name' },
				{ text: 'Stars', sortable: true, value: 'stars' },
				{ text: 'Arena', sortable: true, value: 'score.arena' },
				{ text: 'Hunt', sortable: true, value: 'score.hunt' },
				{ text: 'Abyss', sortable: true, value: 'score.abyss' },
				{ text: 'Raid', sortable: true, value: 'score.raid' },
				{ text: 'Overall', sortable: true, value: 'score.overall' },
				{ text: 'Recommended Sets', sortable: false, value: 'recommended.sets' },
			],
		}
	},
	head () {
		return {
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'Ranking page for play and recommended equipment'
				}
			]
		}
	},
	methods: {
		color (score) {
			return util.color(score)
		},
	},
	middleware: 'guest'
}
</script>
