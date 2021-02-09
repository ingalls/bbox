<template>
    <div class='col col--12 w-full absolute top bottom'>
        <div class='absolute top right z1'>
            <input class='input'/>
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
            bounds: false,
            map: ''
        }
    },
    watch: {
        bounds: function() {
            if (!this.bounds) {
                this.map.getSource('bounds').setData({
                    type: 'FeatureCollection',
                    features: []
                });
            } else {
                this.map.getSource('bounds').setData({
                    type: 'Feature',
                    properties: {},
                    geometry: poly(this.bounds)
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
