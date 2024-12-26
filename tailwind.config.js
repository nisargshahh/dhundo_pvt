/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        rubik : ['Rubik-Regular', 'sans-serif'],
        "rubikb" : ['Rubik-Bold', 'sans-serif'],
        "rubikeb" : ['Rubik-ExtraBold', 'sans-serif'],
        "rubiksb": ['Rubik-SemiBold', 'sans-serif'],
        "rubikl" : ['Rubik-Light', 'sans-serif'],
        "rubikm" : ['Rubik-Medium', 'sans-serif'],
      },
      colors: {
        "primary":{
          DEFAULT:"#375E97",
          100:"#375E970a",
          200:"#375E971a",
          300:"#375E972a",
          400:"#375E973a",
          800:"#375E977a"
        },
        "secondary":{
          DEFAULT:"#FB6542",
          100:"#FB65420a",
          200:"#FB65421a",
          300:"#FB65422a",
          400:"#FB65423a",
        },
        "tertiary":{
          DEFAULT:"#FFBB00",
          100:"#FFBB000a",
          200:"#FFBB001a",
          300:"#FFBB002a",
          400:"#FFBB003a",
        },
        "white": "#ffffff",
        "black": {
          DEFAULT : "#000000",
          100 : "#8c8e98",
          200 : "#666876",
          300 : "#191d31",
        },
        "danger" : "#f75555"
      }
    }
  },
  plugins: [],
}