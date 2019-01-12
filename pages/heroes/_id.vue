<template>
	<div>
		<v-container>
			<c-title :title="hero.name">
				<template slot="lead">
					<v-btn class="mr-3" color="accent" exact fab small to="/heroes">
						<v-icon>first_page</v-icon>
					</v-btn>
				</template>
				<template slot="trail">
					<div class="e7-icons ml-2">
						<span :class="hero.element"></span>
						<span :class="hero.class.replace(/\s+/g, '-')"></span>
					</div>
				</template>
			</c-title>
			<v-layout row wrap>
				<v-flex xs12 md3>
					<v-img
						:src="`/heroes/portrait/${hero.name.replace(/\s+/g, '-').toLowerCase()}.png`" />
				</v-flex>
				<v-flex class="px-5" xs12 md9>
					<v-layout row wrap>
						<v-flex xs12 md6>
							<h3>Max Stats</h3>
							<template v-for="(stat, i) in stats" v-if="hero.max">
								<p class="mb-0 subheading" :key="`max${stat}`">
									<strong>{{ stat }}</strong>
									<span>: {{ `${hero.max[stat]}${i > 4 ? '%' : ''}` }}</span>
									<span> - ({{ getRank('max', stat, hero.max[stat]) }}%)</span>
								</p>
							</template>
						</v-flex>
						<v-flex xs12 md6>
							<v-flex xs12 md6>
								<h3>Max Awakened Stats</h3>
								<template v-for="(stat, i) in stats" v-if="hero.maxAwakened">
									<p class="mb-0 subheading" :key="`max${stat}`">
										<strong>{{ stat }}</strong>
										<span>: {{ `${hero.maxAwakened[stat]}${i > 4 ? '%' : ''}` }}</span>
										<span> - ({{ getRank('maxAwakened', stat, hero.maxAwakened[stat]) }}%)</span>
									</p>
								</template>
							</v-flex>
						</v-flex>
					</v-layout>
					<div class="mt-3" v-if="!hero.max && !hero.maxAwakened">
						<p><strong>No stats added at the moment</strong></p>
					</div>
					<v-btn @click="dialog = true" color="accent">
						{{ hero.max && hero.maxAwakened ? 'Update Stats' : 'Add Stats' }}
					</v-btn>
				</v-flex>
			</v-layout>


		</v-container>

		<v-dialog max-width="1200" v-model="dialog">
			<v-card>
				<v-card-title class="headline">Update Stats</v-card-title>
				<v-card-text>
					<v-form lazy-validation ref="form" @submit.prevent="updateStats" v-model="valid">
						<v-container grid-list-lg>
							<v-layout row wrap>
								<template v-for="(stat, i) in stats">
									<v-flex :key="`max${stat}`" xs6>
										<h3 v-if="i == 0">Max Stats</h3>
										<v-text-field :label="stat" :rules="util.required" v-model="form.max[stat]"></v-text-field>
									</v-flex>
									<v-flex :key="`maxAwakened${stat}`" xs6>
										<h3 v-if="i == 0">Max Stats</h3>
										<v-text-field :label="stat" :rules="util.required" v-model="form.maxAwakened[stat]"></v-text-field>
									</v-flex>
								</template>
							</v-layout>
						</v-container>
						<v-toolbar color="transparent" flat>
							<v-btn @click="dialog = false">Cancel</v-btn>
							<v-spacer></v-spacer>
							<v-btn @click="updateStats" color="accent" type="submit">
								Update Stats
							</v-btn>
						</v-toolbar>
					</v-form>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import computations from '~/components/app/computations.js'
import utilities from '~/components/app/util.js'

export default {
	asyncData ({ app, error, params }) {
		return app.$axios.$get('/api/v1/heroes/')
			.then(res => {
				return {
					hero: res.find(hero => hero._id == params.id),
					heroes: res,
					statRanking: computations.percentileRanking,
					util: utilities
				}
			})
			.catch(err => { error({ statusCode: '404', message: 'Hero info not found' }) })
	},
	data () {
		return {
			dialog: false,
			form: {
				max: {},
				maxAwakened: {}
			},
			stats: [
				'cp',
				'attack',
				'health',
				'speed',
				'defense',
				'critChance',
				'critDamage',
				'dualChance',
				'effectiveness',
				'effectResist'
			],
			valid: true,
		}
	},
	head () {
		return {
			title: `Question details: ${this.hero.name}`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: `${this.hero.name} info page for members`,
				}
			]
		}
	},
	methods: {
		getRank (level, statType, stat) {
			let array = Array.from(this.heroes, h => h[level] ? h[level][statType] : -1)
			return (computations.percentileRanking(array, stat)).toFixed(0)
		},
		async updateStats () {
			if (this.$refs.form.validate()) {
				await this.$axios.$post(`/api/v1/heroes/${this.hero._id}`, this.form)
				.then(res => {
					this.$router.push('/heroes')
				})
				.catch(err => { this.util.catchErrors(err, 'There was an error trying to update the stats', this.$store) })
			}
		}
	},
	middleware: 'member',
}
</script>
