/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import tailwindConfig from './tailwind.config.js';

export default {
    plugins: [tailwindcss(tailwindConfig), autoprefixer()],
}