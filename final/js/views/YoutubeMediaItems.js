Echoes.Views.YoutubeMediaItems = Backbone.View.extend({
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
		this.views = this.collection.map(function(item){
			return new Echoes.Views.YoutubeMedia({ model: item });
		});
		this.$el.append(_.map(this.views, function(view){
			return view.render().el;
		}));
		this.$el.delay(200).fadeIn(300);
	},

	cleanViews: function() {
		_.invoke(this.views, 'destroy');
		this.views = [];
	}
});