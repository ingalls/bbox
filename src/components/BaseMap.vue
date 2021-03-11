<template>
    <div class='col col--12 w-full absolute top bottom'>
        <div class='absolute top left z1 bg-white px12 py12'>
            <input :disabled='!map' v-model='rawbounds' class='input w600 fl h36' placeholder='GeoJSON Bounding Box' :class='{
                "border border--red": !isValid,
            }'/>

            <template v-if='showTiles'>
                <input v-model='zoom' class='input w60 fr h36 ml6' placeholder='z' :class='{
                    "border border--red": !isTileValid,
                }'/>
            </template>
            <button @click='showTiles = !showTiles' class='btn btn--stroke round fr h36 ml6 px12'>
                <svg class='icon'><use xlink:href='#icon-tileset'/></svg>
            </button>
            <button @click='fitBounds' class='btn btn--stroke round fr h36 ml6 px12'>
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
import tc from '@mapbox/tile-cover';

export default {
    name: 'BaseMap',
    data: function() {
        return {
            showTiles: false,
            zoom: 0,
            initial: true,
            rawbounds: '',
            bounds: [],
            map: ''
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
        showTiles: function() {
            if (!this.showtiles) {
                this.map.addSource('tiles', {
                    type: 'geojson',
                    data: { type: 'FeatureCollection', features: [] }
                });
            }
        },
        zoom: function() {
            const tiles = tc.geojson(poly(this.bounds).geometry, {
                min_zoom: this.zoom,
                max_zoom: this.zoom
            });

            console.error(tiles)
            this.map.getSource('tiles').setData(tiles);
        },
        rawbounds: function() {
            this.initial = false;
            if (!this.isValid) return;

            this.bounds = this.rawbounds.trim().split(',').map((bound) => {
                return Number(bound);
            });

            if (this.bounds.length === 4) this.rawbounds = this.bounds.join(', ');
        },
        bounds: function() {
            if (!this.map) return;

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
        }
    },
    mounted: function() {
        this.init();
    },
    methods: {
        init: function() {
            mapboxgl.accessToken = 'pk.eyJ1IjoiaW5nYWxscyIsImEiOiJja2t5OGd0YzkwNDV1MnBwbHMweW16NTY0In0.g_OkZI1t3AOxWgRkmArlBQ';

            this.map = new mapboxgl.Map({
                container: 'map',
                zoom: 1,
                style: 'mapbox://styles/mapbox/light-v9'
            });

            this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

            this.map.on('load', () => {
                this.map.addSource('bounds', {
                    type: 'geojson',
                    data: { type: 'FeatureCollection', features: [] }
                });

                this.map.addSource('tiles', {
                    type: 'geojson',
                    data: { type: 'FeatureCollection', features: [] }
                });

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
                    id: `tiles-poly`,
                    type: 'line',
                    source: 'tiles',
                    paint: {
                        'line-color': '#ffffff'
                    }
                });
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
