<template>
	<div>
		<v-toolbar app dark fixed>
			<v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
			<v-btn icon @click="toggleMini">
				<v-icon v-html="miniFixed ? 'chevron_right' : 'chevron_left'"></v-icon>
			</v-btn>
			<v-spacer></v-spacer>
			<nuxt-link exact to="/home">
				<v-avatar color="primary" size="35px">
					<img :src="avatar" alt="avatar">
				</v-avatar>
			</nuxt-link>
			<v-btn flat @click="logout">
				Logout
			</v-btn>
			<v-toolbar-side-icon class="hidden-lg-and-up" @click.native.stop="drawer = !drawer" />
		</v-toolbar>
		<div @mouseover="setState(false)" @mouseout="setState(true)">
			<v-navigation-drawer
				app
				fixed
				light
				:mini-variant="$store.state.nav.minivariant"
				v-model="drawer">
				<v-list class="pt-0">
					<v-list-tile
						exact
						:key="i"
						router
						:to="item.to"
						v-if="!item.auth || $auth.user[item.auth] || $auth.user[item.secondaryAuth]"
						v-for="(item, i) in items">
						<v-list-tile-action>
							<v-icon v-html="item.icon" />
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title v-text="item.title" />
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
			</v-navigation-drawer>
		</div>
	</div>
</template>

<script>
import util from '~/components/app/util'

export default {
	data () {
		return {
			avatar: util.avatar(this.$auth.user.email),
			drawer: true,
			items: [
				{ icon: 'account_circle', title: 'My Profile', to: '/home' },
				{ icon: 'supervised_user_circle', title: 'Manage Users', to: '/users', auth: 'admin' },
				{ icon: 'dashboard', title: 'Manage Heroes', to: '/heroes' },
			],
			miniFixed: false,
			userMenu: false,
		}
	},
	methods: {
		async logout () {
			await this.$auth.logout()
		},
		setState (bool) {
			if (!this.miniFixed) {
				this.$store.dispatch('nav/setState', bool)
			}
		},
		toggleMini () {
			this.miniFixed = !this.miniFixed
			let bool = !this.miniFixed ? true : false
			this.$store.dispatch('nav/setState', bool)
		},
	},
}
</script>
