# Calculate Roman Centuriation

### Background

Centuriation was a surveying method used by the Romans during the late Repulican and early empire to divide land into parcels. This module calculates the *heredia* (land allotments) and roads of centuriation given a central survey point or *groma*.


For a more in depth overview of centuriation [wikipedia](https://en.wikipedia.org/wiki/Centuriation) has a good explanation

----

### Installation
```sh
npm install limitatio
```

### in Node
```js
const limitatio = require('limitatio');

const groma = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.592042,
                    45.227991
                ]
            }
        };

let limitatio = limitatio(groma, 9);
/* limitatio now holds the GeoJSON for the heredia and roads

```

### in the Browser

```html
<script src="https://unpkg.com/limitatio.min.js"></script>
```

-----

## Reference

limitatio(groma[, bearing])

#### Parameters

* groma - GeoJSON Point Feature - central survey point

* bearing - number - bearing of the survey in degrees from north clockwise

#### Output

* returns a GeoJSON Feature Collection of the *heredia* grid and roads

