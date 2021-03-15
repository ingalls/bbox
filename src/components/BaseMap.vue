<template>
    <div class='col col--12 w-full absolute top bottom'>
        <div class='absolute top left z1 bg-white px12 py12'>
            <input :disabled='!ready' v-model='rawbounds' class='input w600 fl h36' placeholder='GeoJSON Bounding Box' :class='{
                "border border--red": !isValid,
            }'/>

            <button :disabled='!ready' @click='start_draw' class='btn btn--stroke round fr h36 ml6 px12 color-gray color-green-on-hover'>
                <svg class='icon'><use xlink:href='#icon-pencil'/></svg>
            </button>
            <button :disabled='!ready || !isValid' @click='show.tiles = !show.tiles' class='dropdown btn btn--stroke round fr h36 ml6 px12' :class='{
                "color-gray": !show.tiles,
                "color-green": show.tiles
            }'>
                <svg class='icon'><use xlink:href='#icon-tileset'/></svg>

                <div class='dropdown-content round bg-transparent'>
                    <div class='triangle--u triangle color-gray ml12'></div>

                    <div class='bg-white border border--gray round shadow px6 py3'>
                        <label>Zoom</label>
                        <input v-model='zoom' class='input w60 h36' placeholder='z' :class='{
                            "border border--red": !isTileValid,
                        }'/>
                    </div>
                </div>
            </button>
            <button :disabled='!ready || !isValid' @click='fitBounds' class='btn btn--stroke round fr h36 ml6 px12 color-gray color-green-on-hover'>
                <svg class='icon'><use xlink:href='#icon-fullscreen'/></svg>
            </button>
        </div>

        <div id="map" class='w-full h-full'></div>
    </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import poly from '@turf/bbox-polygon';
import bbox from '@turf/bbox';
import centroid from '@turf/centroid';
import tc from '@mapbox/tile-cover';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';

export default {
    name: 'BaseMap',
    data: function() {
        return {
            show: {
                tiles: false,
                labels: false
            },
            zoom: 0,
            initial: true,
            rawbounds: '',
            bounds: [],
            map: false,
            draw: false,
            ready: false
        }
    },
    computed: {
        isValid: function() {
            if (this.initial) return true;

            const bounds = this.rawbounds.trim().split(',').map((bound) => {
                return Number(bound);
            });

            if (bounds.length !== 4) return false;

            return true;
        },
        isTileValid: function() {
            return !isNaN(parseInt(this.zoom));
        }
    },
    watch: {
        'show.tiles': function() {
            if (!this.ready) return;

            if (!this.show.tiles) {
                for (const layer of ['tiles', 'tiles-centroid']) {
                    this.map.getSource(layer).setData({
                        type: 'geojson',
                        data: { type: 'FeatureCollection', features: [] }
                    });
                }
            }
        },
        zoom: function() {
            if (!this.ready) return;
            this.tiles();
        },
        rawbounds: function() {
            if (!this.ready) return;
            this.compute_bounds();
        },
        bounds: function() {
            if (!this.ready) return;
            this.show_bounds();
        }
    },
    mounted: function() {
        if (window.location.hash) this.rawbounds = decodeURIComponent(window.location.hash.replace('#', ''));
        this.init();
    },
    methods: {
        start_draw() {
            this.rawbounds = '';
            this.draw.changeMode('draw_rectangle');
        },
        tiles() {
            const tiles = tc.geojson(poly(this.bounds).geometry, {
                min_zoom: parseInt(this.zoom),
                max_zoom: parseInt(this.zoom)
            });

            this.map.getSource('tiles').setData(tiles);

            tiles.features = tiles.features.map((feat) => {
                feat = centroid(feat.geometry);

                feat.properties.tile = tc.tiles(feat.geometry, {
                    min_zoom: parseInt(this.zoom),
                    max_zoom: parseInt(this.zoom)
                })[0].join(' - ');

                return feat;
            });

            this.map.getSource('tiles-centroid').setData(tiles);

        },
        compute_bounds() {
            this.initial = false;
            if (!this.isValid) return this.bounds = false;

            this.bounds = this.rawbounds.trim().split(',').map((bound) => {
                return Number(bound);
            });

            if (this.bounds.length === 4) this.rawbounds = this.bounds.join(', ');
            window.location.hash = this.rawbounds;
        },
        show_bounds() {
            if (this.isValid) {
                this.map.getSource('bounds').setData({
                    type: 'Feature',
                    properties: {},
                    geometry: poly(this.bounds).geometry
                });

                this.fitBounds();
            } else {
                this.map.getSource('bounds').setData({
                    type: 'FeatureCollection',
                    features: []
                });
            }
            this.$emit('bounds', this.bounds);

        },
        init: function() {
            mapboxgl.accessToken = 'pk.eyJ1IjoiaW5nYWxscyIsImEiOiJja2t5OGd0YzkwNDV1MnBwbHMweW16NTY0In0.g_OkZI1t3AOxWgRkmArlBQ';

            this.map = new mapboxgl.Map({
                container: 'map',
                zoom: 1,
                style: 'mapbox://styles/mapbox/light-v9'
            });

            const modes = MapboxDraw.modes;
            modes.draw_rectangle = DrawRectangle
            this.draw = new MapboxDraw({
                displayControlsDefault: false,
                modes: modes
            });

            this.map.addControl(this.draw, 'bottom-right');
            this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

            this.map.on('draw.create', (e) => {
                this.rawbounds = bbox(e.features[0]).join(',');
                this.draw.deleteAll();

            });

            this.map.on('load', () => {
                for (const layer of ['bounds', 'tiles', 'tiles-centroid']) {
                    this.map.addSource(layer, {
                        type: 'geojson',
                        data: { type: 'FeatureCollection', features: [] }
                    });
                }

                this.map.addLayer({
                    id: `bounds-poly`,
                    type: 'fill',
                    source: 'bounds',
                    paint: {
                        'fill-color': '#0b6623',
                        'fill-opacity': 0.8
                    }
                });

                this.map.addLayer({
                    id: `tiles-label`,
                    type: 'symbol',
                    source: 'tiles-centroid',
                    layout: {
                        'text-field': ['get', 'tile'],
                        "text-size": 12
                    },
                    paint: { }
                });

                this.map.addLayer({
                    id: `tiles-poly`,
                    type: 'line',
                    source: 'tiles',
                    paint: {
                        'line-color': '#000'
                    }
                });

                this.ready = true;

                this.compute_bounds();
                this.show_bounds();
            });
        },
        fitBounds: function() {
            if (!this.isValid) return;
            this.map.fitBounds(this.bounds, {
                padding: 100,
                linear: true
            })
        }
    }
}
</script>

<style>
.dropdown {
    position: relative;
    display: inline-block;
}

.shadow {
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}

.dropdown-content {
    display: none;
    position: absolute;
    top: 36px;
    left: 0px;
    z-index: 1;
}

.dropdown:hover .dropdown-content {
    display: block;
}
</style>
