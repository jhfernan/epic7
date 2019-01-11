<template>
	<v-container>
		<c-title :title="hero.name">
			<template slot="lead">
				<v-btn class="mr-3" color="accent" exact fab small to="/heroes">
					<v-icon>first_page</v-icon>
				</v-btn>
			</template>
		</c-title>
		<v-layout row wrap>
			<v-flex xs12 md3>
			</v-flex>
			<v-flex xs12 md3>
				<v-img
					contain
					height="92px"
					:src="`/heroes/portrait/${hero.name.replace(/\s+/g, '-').toLowerCase()}.png`" />
			</v-flex>
			<v-flex xs12 md3>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import utilities from '~/components/app/util.js'

export default {
	asyncData ({ app, error, params }) {
		return app.$axios.$get('/api/v1/heroes/' + params.id)
			.then(res => {
				return { hero: res, util: utilities }
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
	methods: {
		// async deleteUser () {
		// 	this.loader = true
		// 	await this.$axios.$delete('/api/v1/users/' + this.deleteUserInfo._id)
		// 	.then(res => {
		// 		this.users = this.users.filter(e => e._id !== res)
		// 		this.dialog = false
		// 		this.deleteUserInfo = {}
		// 	})
		// 	.catch(err => { this.util.catchErrors(err, 'There was an error deleting the user', this.$store) })
		// 	.finally(() => {
		// 		this.loader = false
		// 	})
		// },
		// async updateBody () {
		// 	await this.$axios.$put(`/api/v1/questions/${this.question._id}`, { body: this.question.body })
		// 	.then(res => {
		// 		this.editingBody = true
		// 		this.highlightAll()
		// 	}).catch(err => {
		// 		err.response
		// 			? this.$store.dispatch('snack/showSnack', `Error ${err.response.data.status}: ${err.response.data.message}`)
		// 			: this.$store.dispatch('snack/showSnack', 'There was an error while trying to update the body')
		// 	})
		// },
	},
	middleware: 'member',
}
</script>
