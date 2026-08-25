/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
/** @type {import('tailwindcss').Config}*/ 
export default {
  content: [
    "./src/**/*.{html,js,ts}",
    "./index.html",
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
  important: true,
}
