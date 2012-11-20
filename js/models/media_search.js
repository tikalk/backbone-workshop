Echoes.Models.MediaSearch = Backbone.Model.extend({
	defaults: {
		query: 'pink floyd'
	},

	getQuery: function() {
		return this.get('query');
	}
});