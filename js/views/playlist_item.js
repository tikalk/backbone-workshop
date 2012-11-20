Echoes.Views.PlaylistItem = Backbone.View.extend({
	tagName: 'li',

	events: {
		'click a': 'select'
	},

	template: '#playlist-media-item',

	initialize: function() {
		this.$el.toggleClass('active', this.options.selectedId === this.model.id);
	},

	render: function() {
		this.$el.html(_.template($(this.template).html(), this.model));
		return this;
	},

	select: function() {
		this.$el.addClass('active');
		this.trigger('selected', this.model.id);
	},

	destroy: function() {
		this.undelegateEvents();
		this.off();
	}
});