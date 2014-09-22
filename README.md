#bctimer

bctimer is a jQuery plugin that uses css3 to create circular:
- countdown timers (work in progress)
- loading spinners
- progress bars (work in progress)
- potentially more...

This project is nowhere near complete right now, and has only been used in the most recent version of Chrome.

##Usage
###Options
- **mode** - string - Sets the mode of the bctimer (coutdown, spinner, progress). *Only spinner is currently implemented*
- **size** - string - Sets the width and height of the bctimer. Accepts normal css values ("100px", "50%", etc)
- **colors** - string[] - The colors used in the bctimer. At least two colors should be provided. The background starts out as the last color in this list. The first color than rotates around and fills the circle, becoming the new background color. The next color then begins to fill, and so on looping through the list continuously.
- **updateInterval** - int - The number of milliseconds between each update of the bctimer. If this value is set too high then rotations will appear choppy. *This will not apply to the progress mode*
- **cycleLength** - int - The number of milliseconds for a full rotation. At the end of each cycle the colors will change.