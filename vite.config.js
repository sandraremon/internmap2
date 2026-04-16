// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
// import react from '@vitejs/plugin-react'; // <-- Add this
// laravel({
//     input: [
//         'resources/css/app.css',
//         'resources/js/app.jsx'
//     ],
//     refresh: true,
// });

// export default defineConfig({
//     plugins: [
//         laravel({
//             input: ['resources/css/app.css', 'resources/js/app.jsx'], // <-- Change to .jsx
//             refresh: true,
//         }),
//         react(), // <-- Add this
//     ],
// });
// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'
// //
// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })
// import { defineConfig } from 'vite'
// import laravel from 'laravel-vite-plugin'
// import react from '@vitejs/plugin-react'
//
// export default defineConfig({
//     plugins: [
//         laravel({
//             input: [
//                 'resources/css/app.css',
//                 'resources/js/app.jsx'
//             ],
//             refresh: true,
//         }),
//         react(),
//     ],
// })
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
