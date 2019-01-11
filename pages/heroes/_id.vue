<template>
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
			<v-flex xs12 md9>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import utilities from '~/components/app/util.js'

export default {
	asyncData ({ app, error, params }) {
		return app.$axios.$get('/api/v1/heroes/')
			.then(res => {
				return {
					hero: res.find(hero => hero._id == params.id),
					heroes: res,
					util: utilities
				}
			})
			.catch(err => { error({ statusCode: '404', message: 'Hero info not found' }) })
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
	middleware: 'member',
}
</script>
