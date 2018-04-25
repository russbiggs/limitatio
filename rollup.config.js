import commonjs from 'rollup-plugin-commonjs';
import node from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
    input: './src/index.js',
    output: {
        name: 'limitatio',
        file: './dist/limitatio.js',
        format: "umd",
    },
    plugins: [node(),
        commonjs({
            namedExports: {
                './node_modules/cheapRuler': ['cheap-ruler'],
                './node_modules/@turf/destination/index.js': ['destination'],
                './node_modules/@turf/square-grid/index.js': ['grid'],
                './node_modules/@turf/transform-rotate/index.js': ['transformRotate'],
                './node_modules/@turf/distance/index.js': ['distance'],
            }
        }),
        babel({
            exclude: 'node_modules/**',
        }),
    ]

};