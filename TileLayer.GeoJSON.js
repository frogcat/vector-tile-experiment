L.TileLayer.GeoJSON = L.GridLayer.extend({
	initialize : function(url, options, geojsonOptions) {
		this._url = url;
		L.setOptions(this, options);
		this._geojsonOptions = geojsonOptions;
	},
	createTile : function(coords, done) {
		var tile = document.createElement('div');
		var url = L.Util.template(this._url, coords);
		var that = this;
		var x = new XMLHttpRequest();
		x.open("GET", url, true);
		x.onreadystatechange = function() {
			if (done)
				done(null, tile);
			if (x.readyState == 4 && x.status == 200) {
				var json = JSON.parse(x.responseText);
				that._render(json, tile, coords);
			}
		};
		x.send();
		return tile;
	},
	_render : function(json, tile, coords) {
		L.geoJson(json, this._geojsonOptions).addTo(this._map);
	}
});
