<template>
    <div class='col col--12 w-full absolute top bottom'>
        <div class='absolute top left z1 bg-white px12 py12'>
            <input v-model='bounds' class='input w600' placeholder='GeoJSON Bounding Box'/>
        </div>

        <div id="map" class='w-full h-full'></div>
    </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import poly from '@turf/bbox-polygon';

export default {
    name: 'BaseMap',
    data: function() {
        return {
            bounds: '',
            map: ''
        }
    },
    watch: {
        bounds: function() {
            if (!this.map) return;

            const bounds = this.bounds.trim().split(',').map((bound) => {
                return Number(bound);
            });

            if (bounds.length === 4) {
                this.map.getSource('bounds').setData({
                    type: 'Feature',
                    properties: {},
                    geometry: poly(bounds).geometry
                });

                this.map.fitBounds(bounds)
            } else {
                this.map.getSource('bounds').setData({
                    type: 'FeatureCollection',
                    features: []
                });
            }
            this.$emit('bounds', bounds);
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
                    data: {
                        type: 'FeatureCollection',
                        features: []
                    }
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
            });
        }
    }
}
</script>
