Echoes.Views.Playlist = Backbone.View.extend({
	el: '#now-playlist',

	initialize: function() {
		this.views = [];
		this.$list = this.$('.now-playlist-list');
		this.model.on('change:mediaId', this.render, this);
	},

	render: function(model, selectedMediaId) {
		if (!model.get('data')) {
			return;
		}
		this.selectedMediaId = selectedMediaId;
		this.cleanViews();
		this.$list.empty();

		_.each(model.get('data').items, function(model) {
			var index = this.views.length;
			this.views.push( new Echoes.Views.PlaylistItem({ model: model, selectedId: selectedMediaId }) );
			this.views[index].on('selected', this.updateSelected, this);
			this.$list.append( this.views[index].render().el );
		}, this);

		this.scrollToItem();
	},

	cleanViews: function() {
		_.invoke(this.views, 'destroy');
		this.views = [];
	},

	getSelected: function() {
		return this.$el.find("a[href*='"+ this.selectedMediaId + "']");
	},

	removeSelected: function() {
		this.getSelected().parent().removeClass('active');
	},

	updateSelected: function(mediaId) {
		this.removeSelected();
		this.selectedMediaId = mediaId;
	},

	scrollToItem: function() {
		this.$list.get(0).scrollTop = this.$list.scrollTop() + this.getSelected().parent().position().top;
	}
});