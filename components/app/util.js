import gravatar from "gravatar";

export default {
	// Helpers
	avatar: (email, size = 70) => {
		return gravatar.url(email, { s: size, r: "x", d: "mm" }, true);
	},
	// tabber (event, body) {
	// 	let text = body,
	// 		originalSelectionStart = event.target.selectionStart,
	// 		textStart = text.slice(0, originalSelectionStart),
	// 		textEnd =  text.slice(originalSelectionStart);
	//
	// 	body = `${textStart}\t${textEnd}`
	// 	event.target.value = body
	// 	event.target.selectionEnd = event.target.selectionStart = originalSelectionStart + 1
	// },
	catchErrors: (err, message, store) => {
		err.response
			? store.dispatch(
					"snack/showSnack",
					`${err.response.data.status}: ${err.response.data.message}`
			  )
			: store.dispatch("snack/showSnack", message);
	},
	chartOptions: {
		aspectRatio: 1.4,
		legend: {
			position: "right"
		},
		maintainAspectRatio: false,
		// responsive: true,
		responsiveAnimationDuration: 1500
	},
	topics: [
		{ text: "Business", value: "business" },
		{ text: "C", value: "c" },
		{ text: "CSS", value: "css" },
		{ text: "Database", value: "database" },
		{ text: "Design", value: "design" },
		{ text: "Go", value: "go" },
		{ text: "HTML", value: "html" },
		{ text: "JavaScript", value: "javascript" },
		{ text: "Python", value: "python" },
		{ text: "Ruby", value: "ruby" }
	],
	switchTopicLogos: subject => {
		if (subject == "business") return [true, "business_center"];
		if (subject == "c") return [false, "c.svg"];
		if (subject == "css") return [true, "fab fa-css3"];
		if (subject == "database") return [true, "fas fa-database"];
		if (subject == "design") return [true, "fas fa-pen-fancy"];
		if (subject == "go") return [false, "gopher.svg"];
		if (subject == "html") return [true, "fab fa-html5"];
		if (subject == "javascript") return [true, "fab fa-js-square"];
		if (subject == "python") return [true, "fab fa-python"];
		if (subject == "ruby") return [false, "ruby.svg"];
		return [true, "home"];
	},
	subjectsColorWheel: [
		"#673AB7",
		"#3F51B5",
		"#CDDC39",
		"#F06292",
		"#FFC107",
		"#00ADD8",
		"#E34F26",
		"#F7DF1E",
		"#646464",
		"#9B111E"
	],
	subjectsPrettyPrint: [
		"Business",
		"C",
		"CSS",
		"Database",
		"Design",
		"Go",
		"HTML",
		"JavaScript",
		"Python",
		"Ruby"
	],
	permissions: [
		{ text: "Admin", value: "admin" },
		{ text: "Manager", value: "manager" },
		{ text: "Staff", value: "staff" },
		{ text: "Developer", value: "developer" },
		{ text: "Teacher", value: "teacher" },
		{ text: "Teaching Assistant", value: "teachingAssistant" },
		{ text: "Student", value: "student" }
	],

	// Form rules
	rules: {
		confirmPassword: password => {
			return [
				v => !!v || "This is required",
				v => v === password || "Password does not match"
			];
		},
		email: [
			v => !!v || "E-mail is required",
			v => /.+@.+/.test(v) || "E-mail must be valid"
		],
		emailNotRequired: [v => /.+@.+/.test(v) || !v || "E-mail must be valid"],
		max: length => {
			return [
				v =>
					(v && v.length <= length) ||
					!v ||
					`Must be less than ${length} characters`
			];
		},
		mi: [
			v => (v && v.length < 2) || !v || "Middle initial must be one character"
		],
		name: [
			v => !!v || "This is required",
			v => (v && v.length <= 15) || "Name must be 15 characters or less"
		],
		required: [v => !!v || "This is required"],
		selectOne: [
			v => (v && v.length > 0) || "You must select at least one choice"
		],
		title: [
			v => !!v || "The title is required",
			v => (v && v.length <= 75) || "The title must be 75 characters or less"
		],
		usernamePassword: [
			v =>
				(v && v.length <= 20 && v.length >= 5) ||
				"Must be between 5 and 20 characters"
		],
		usernamePassword: [
			v => !!v || "This is required",
			v =>
				(v && v.length <= 20 && v.length >= 5) ||
				"Must be between 5 and 20 characters"
		]
	}
};
