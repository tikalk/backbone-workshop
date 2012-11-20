Echoes.Views.MediaSearch = Backbone.View.extend({
	el: '#media-explorer',

	events: {
		'submit': 'onExplore'
	},

	initialize: function(){
		this.model = new Echoes.Models.MediaSearch();
		this.model.on('change:query', this.render, this);
		// cache input field
		this.$search = this.$el.find('input');
		this.render();
	},

	render: function() {
		this.$search.val(this.model.get('query'));
		return this;
	},

	onExplore: function(ev) {
		ev.preventDefault();
		var query = this.$search.val();
		this.model.set({ query: query }, { silent: true });
		this.trigger('search-request', query);
	},

	getQuery: function() {
		return this.model.get('query');
	},

	setQuery: function(query) {
		this.model.set('query', query);
	}
});