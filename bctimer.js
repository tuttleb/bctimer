(function ($)
 {
     $.fn.bctimer = function(options)
     {
         var opts = $.extend({}, $.fn.bctimer.defaults, options);
         
         var $this = this;
         $this.addClass(".bctimer")
             .css("width", opts.size)
             .css("height", opts.size)
             .css("background-color", opts.colors[0]);
         
         var leftBlocker = $("<div>")
             .width($this.width()/2)
             .height($this.height())
             .css("background", opts.colors[opts.colors.length-1]);
         
         var rightBlocker = leftBlocker.clone()
             .addClass("bctimer-rightblocker")
         
         leftBlocker.addClass("bctimer-leftblocker");
         
         $this.append(leftBlocker).append(rightBlocker);
         
         var rotationDegrees = 0;
         var backgroundIndex = 0;
         
         function rotate()
         {
             if(rotationDegrees >= 359)
             {
                 rotationDegrees = rotationDegrees % 360;
                 leftBlocker.css("background", $this.css("background"));
                 rightBlocker.css("background", $this.css("background"));
                 backgroundIndex++;
                 if(backgroundIndex >= opts.colors.length)
                 {
                     backgroundIndex = 0;
                 }
                 $this.css("background", opts.colors[backgroundIndex]);
                 
                 leftBlocker.css({
                     '-webkit-transform' : 'rotate(0deg)',
                     '-moz-transform'    : 'rotate(0deg)',
                     '-ms-transform'     : 'rotate(0deg)',
                     '-o-transform'      : 'rotate(0deg)',
                     'transform'         : 'rotate(0deg)'
                 });
                 
                 rightBlocker.css({
                     '-webkit-transform' : 'rotate(' + rotationDegrees + 'deg)',
                     '-moz-transform'    : 'rotate(' + rotationDegrees + 'deg)',
                     '-ms-transform'     : 'rotate(' + rotationDegrees + 'deg)',
                     '-o-transform'      : 'rotate(' + rotationDegrees + 'deg)',
                     'transform'         : 'rotate(' + rotationDegrees + 'deg)'
                 });
             }
             
             else if(rotationDegrees > 179)
             {
                 leftBlocker.css({
                     '-webkit-transform' : 'rotate(' + (rotationDegrees - 180) + 'deg)',
                     '-moz-transform'    : 'rotate(' + (rotationDegrees - 180) + 'deg)',
                     '-ms-transform'     : 'rotate(' + (rotationDegrees - 180) + 'deg)',
                     '-o-transform'      : 'rotate(' + (rotationDegrees - 180) + 'deg)',
                     'transform'         : 'rotate(' + (rotationDegrees - 180) + 'deg)' 
                 });
                 
                 rightBlocker.css({
                     '-webkit-transform' : 'rotate(0deg)',
                     '-moz-transform'    : 'rotate(0deg)',
                     '-ms-transform'     : 'rotate(0deg)',
                     '-o-transform'      : 'rotate(0deg)',
                     'transform'         : 'rotate(0deg)'
                 });
                 rightBlocker.css("background", $this.css("background"));
             }
             else
             {
                 leftBlocker.css({
                     '-webkit-transform' : 'rotate(0deg)',
                     '-moz-transform'    : 'rotate(0deg)',
                     '-ms-transform'     : 'rotate(0deg)',
                     '-o-transform'      : 'rotate(0deg)',
                     'transform'         : 'rotate(0deg)'
                 });
                 rightBlocker.css({
                     '-webkit-transform' : 'rotate(' + rotationDegrees + 'deg)',
                     '-moz-transform'    : 'rotate(' + rotationDegrees + 'deg)',
                     '-ms-transform'     : 'rotate(' + rotationDegrees + 'deg)',
                     '-o-transform'      : 'rotate(' + rotationDegrees + 'deg)',
                     'transform'         : 'rotate(' + rotationDegrees + 'deg)'
                 });
             }
         }
         
         if(opts.mode === "spinner")
         {
             var step = 360 / (opts.cycleLength / opts.updateInterval);
             function spin() {
                 console.log("spin " + rotationDegrees);
                 rotationDegrees += step;
                 rotate();
                 setTimeout(spin, opts.updateInterval);
             }
             
             spin();
         }
     }
     
     $.fn.bctimer.defaults = {
         mode: "spinner", // countdown | progress
         size: "100px",
         colors: ["black", "white"],
         updateInterval: 25, //milliseconds between each update
         cycleLength: 2500, //milliseconds for a complete rotation
     }
 }(jQuery));