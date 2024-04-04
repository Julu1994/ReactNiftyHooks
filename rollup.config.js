import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';


const isDevelopment = process.env.NODE_ENV === 'development';

export default {
 input: 'src/index.ts',
 output: [
  {
   file: 'dist/index.js',
   format: 'esm',
   sourcemap: isDevelopment ? 'inline' : false,
  },
 ],
 plugins: [

  nodeResolve(),

  commonjs(),

  typescript(),

  babel({
   extensions: ['.js', '.jsx', '.ts', '.tsx'],
   exclude: ['node_modules/**'],
   babelHelpers: 'runtime',
   presets: ['@babel/preset-react'],
   plugins: ['@babel/plugin-transform-runtime'],
  }),

  terser({
   ecma: 2020,
   module: true,
   compress: {
    toplevel: true,
    unsafe_arrows: true,
    drop_console: !isDevelopment,
    drop_debugger: !isDevelopment,
   },
   output: { quote_style: 1 },
  }),
 ],

 external: ['react']
};
