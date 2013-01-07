Echoes.Player = Backbone.Router.extend({

	routes: {
		'': 'explore',
		'explore': 'explore',

		'searches/:query': 'search',
		'play/:mediaId': 'playMedia'
	},

	initialize: function(attributes) {
		this.model = attributes.model;
		Backbone.history.start();
	},

	explore: function() {
		this.model.fetch();
	},

	search: function(query) {
		this.model.query({ query: query });
	},

	playMedia: function(mediaId) {
		this.model.play(mediaId);
	}
});