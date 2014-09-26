#bctimer

bctimer is a jQuery plugin that was created with the intent of using css3 rotations to make spinning countdown timers similar to those before old movies. So far it cannot be used as a timer at all, but implemented features include:
- spinner mode (a loading spinner for example)
- manual mode allows the fill to be set using degrees, radians, or percentage
- multiple colors so that the color increments with each revolution
- Differing update and revolution rate
- Choose the size of the bctimer whether it is 8px or hundreds of pixels (*Resizing after creation is not currently possible*)

This project is nowhere near complete right now, and definitely will not be compatible with older browsers. For best results use the latest version of Chrome. IE11 and Firefox will work, but both have easily visible issues during the rotations.

##Usage
- **mode** - string - Sets the mode of the bctimer (spinner, manual). *Only spinner is currently implemented*
- **size** - string - Sets the width and height of the bctimer. Accepts normal css values and interprets integers to mean pixels ("100px", "50%", 25 etc)
- **colors** - string[] - The colors used in the bctimer. At least two colors should be provided. The background starts out as the last color in this list. The first color than rotates around and fills the circle, becoming the new background color. The next color then begins to fill, and so on looping through the list continuously.
- **updateInterval** - int - The number of milliseconds between each update of the bctimer. If this value is set too high then rotations will appear choppy. *This will not apply to the manual mode*
- **cycleLength** - int - The number of milliseconds for a full rotation. At the end of each cycle the colors will change. *This will not apply to the manual mode*
- **value** - string - The value to set the bctimer at in manual mode. 
