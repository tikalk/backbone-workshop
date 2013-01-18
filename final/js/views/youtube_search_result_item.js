Echoes.Views.YoutubeSearchResultItem = Backbone.View.extend({
	tagName: 'li',
	
	className: 'well youtube-item span3 nicer-ux',

	events: {
		'click .media-desc': 'toggleInformation',
		'click .add-to-playlist': 'addToPlaylist'
	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.template = _.template($('#youtube-item-search-result').html());
	},

	render: function() {
		this.$el.html( this.template(this.model.toJSON()) );
		this.$el.find('.twipsy').tooltip();
		return this;
	},

	toggleInformation: function() {
		this.$el.toggleClass('show-description');
		this.$el.find('.media-desc i').toggleClass('icon-chevron-up').toggleClass('icon-chevron-down');
	},

	addToPlaylist: function(ev) {
		this.model.set('addToPlaylist', true);
	},

	destroy: function() {
		this.undelegateEvents();
		this.remove();
	}
});
