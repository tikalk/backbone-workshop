Echoes.Views.YoutubeSearchResultItem = Backbone.View.extend({
	tagName: 'li',
	
	className: 'well youtube-item span3 nicer-ux',

	events: {
		'click a': 'selectMedia',
		'click .media-desc': 'toggleInformation'
	},

	initialize: function() {
		this.model.on('change', this.render, this);
		this.template = _.template($('#youtube-item-search-result').html());
	},

	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
		this.$el.find('.twipsy').tooltip();
		return this;
	},

	selectMedia: function(ev) {
		this.trigger('media-clicked', this.model.toJSON());
	},

	toggleInformation: function() {
		this.$el.toggleClass('show-description');
		this.$el.find('.icon-white').toggleClass('icon-chevron-up').toggleClass('icon-chevron-down');
	},

	destroy: function() {
		this.undelegateEvents();
		this.$el.remove();
	}
});