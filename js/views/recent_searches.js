Echoes.Views.RecentSearches = Backbone.View.extend({
	el: '#recent-searches',

	template: '#search-query',

	events: {
		'click .icon-remove': 'removeQuery'
	},

	initialize: function() {
		this.$list = this.$('.recent-searches-list');
		this.template = _.template($(this.template).html());
	},

	render: function(data) {
		this.$list.prepend(this.template(data));
		return this;
	},

	add: function(query) {
		this.render({ query: query });
	},

	removeQuery: function(ev) {
		ev.preventDefault();
		$(ev.target).parents('li').fadeOut(function(){
			$(this).remove();
		});
	}
});