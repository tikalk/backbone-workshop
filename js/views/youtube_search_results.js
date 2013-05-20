Echoes.Views.YoutubeSearchResults = Backbone.View.extend({
	el: "#searchResults",

	initialize: function() {
		this.listenTo(this.collection, 'reset', this.render);
		this.views = [];
	},

	render: function() {
		this.$el.fadeOut(300, _.bind(this.renderCollection, this));
	},

	renderCollection: function() {
		this.cleanViews();
		this.$el.empty();
		this.collection.each(function(item){
			var index = this.views.length;
			this.views.push(new Echoes.Views.YoutubeSearchResultItem({ model: item }));
			this.$el.append( this.views[index].render().el );
		}, this);
		this.$el.delay(200).fadeIn(300);
	},

	cleanViews: function() {
		_.invoke(this.views, 'destroy');
		this.views = [];
	}
});