Echoes.Models.MediaSearch = Backbone.Model.extend({
	defaults: {
		query: 'pink floyd'
	},

	triggerChange: function() {
		this.trigger('change:query', this, this.get('query'));
	}
});