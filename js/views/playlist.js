Echoes.Views.Playlist = Backbone.View.extend({
	el: '#now-playlist',
	
	views: [],	

	initialize: function() {
		this.$list = this.$('.now-playlist-list');
		this.collection = this.model.get('nowPlaylist');
		this.listenTo(this.model, 'change:mediaId', this.addItem);
		this.listenTo(this.collection, 'add', this.renderItem);
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

	renderItem: function(model, collection, options) {
		this.views.push( new Echoes.Views.PlaylistItem({ model: model, selectedId: this.model.get('mediaId') }));
		this.$list.prepend( this.views[this.views.length - 1].render().el );
	},

	addItem: function(model, mediaId) {
		var modelExists = this.collection.get(mediaId);
		if (_.isUndefined(modelExists)) {
			return;
		}
		if (!modelExists) {
			this.collection.push( model.get('results').find(function(media){
				return media.get('id') === mediaId;
			}));
		} else {
			this.updateSelected(mediaId);
			modelExists.set('selected', true);
		}
	},

	cleanViews: function() {
		_.invoke(this.views, 'destroy');
		this.views = [];
	},

	getSelected: function() {
		return this.$el.find("a[href*='"+ this.model.previous('mediaId') + "']");
	},

	removeSelected: function() {
		var selected = this.collection.get(this.model.previous('mediaId'));
		if (selected) {
			selected.set('selected', false);
		}
		this.getSelected().parent().removeClass('active');
	},

	updateSelected: function(mediaId) {
		this.removeSelected();
	},

	scrollToItem: function() {
		this.$list.get(0).scrollTop = this.$list.scrollTop() + this.getSelected().parent().position().top;
	}
});