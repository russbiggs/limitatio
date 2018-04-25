import grid from '@turf/square-grid';
import { featureCollection, lineString, point } from '@turf/helpers';
import transformRotate from '@turf/transform-rotate';
import distance from '@turf/distance';
import cheapRuler from 'cheap-ruler';

// constant roman measurements in meters
const actus = 35.5;
const pes = 0.296;

export default function(groma, bearing) {

    const coords = groma.geometry.coordinates;
    const ruler = cheapRuler(coords[1], 'meters');
    const decumanusUltra = ruler.destination(coords, 10 * actus, -90);
    const decumanusCitra = ruler.destination(coords, 10 * actus, 90);
    const cardoDextera = ruler.destination(coords, 10 * actus, 0);
    const cardoSinistra = ruler.destination(coords, 10 * actus, 180);
    const extent = [
        decumanusUltra[0], cardoSinistra[1],
        decumanusCitra[0], cardoDextera[1]
    ];

    function viae() {
        //cardo and decumanus
        let cardoMaximus = lineString([cardoDextera, cardoSinistra], { name: 'cardo maximus', width: 20 * pes });
        let decumanusMaximus = lineString([decumanusUltra, decumanusCitra], { name: 'decumanus maximus', width: 40 * pes });

        //limites quintarii
        let ultraSinistra = [decumanusUltra[0], cardoSinistra[1]];
        let ultraDextera = [decumanusUltra[0], cardoDextera[1]];
        let citraDextera = [decumanusCitra[0], cardoDextera[1]];
        let citraSinistra = [decumanusCitra[0], cardoSinistra[1]];

        let limites = { name: 'limite quintarius', width: 8 * pes };
        let limiteUltra = lineString([ultraSinistra, ultraDextera], limites);
        let limiteCitra = lineString([citraSinistra, citraDextera], limites);
        let limiteDextera = lineString([ultraDextera, citraDextera], limites);
        let limiteSinistra = lineString([ultraSinistra, citraSinistra], limites);
        let fc = transformRotate(featureCollection([cardoMaximus, decumanusMaximus, limiteUltra, limiteCitra, limiteDextera, limiteSinistra]), bearing);
        return fc;
    };

    function heredia() {
        let h = _height();
        let w = _width();
        let cellSize = h > w ? w : h;
        //round down to deal with lat lng errors
        let rounded = Math.floor((cellSize / 20) * 1000) / 1000;
        let herediaGrid = grid(extent, 2 * (rounded.toFixed(3)), { units: 'meters' });
        let fc = transformRotate(herediaGrid, bearing);
        return fc;
    };

    function _height() {
        let from = point([extent[0], extent[1]]);
        let to = point([extent[0], extent[3]]);
        let options = { units: 'meters' };
        let dist = distance(from, to, options);
        return dist;
    }

    function _width() {
        let from = point([extent[0], extent[1]]);
        let to = point([extent[2], extent[1]]);
        let options = { units: 'meters' };
        let dist = distance(from, to, options);
        return dist;
    }
    let output = [];
    output = output.concat(heredia().features);
    output = output.concat(viae().features);
    return featureCollection(output);
}