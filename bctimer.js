(function ($)
{
    $.fn.bctimer = function(options)
    {    
        var $this = this;
        
        var opts = null;
        var leftBlocker = null;
        var rightBlocker = null;
        var rotationDegrees = 0;
        var backgroundIndex = 0;
        
        //This is the first time bctimer is being called on the object
        if(!$this.hasClass("bctimer"))
        {
            opts = $.extend({}, $.fn.bctimer.defaults, options);
            $this.addClass("bctimer")
                .css("width", opts.size)
                .css("height", opts.size)
                .css("background-color", opts.colors[0]);
             
            $this.css({
                        "-webkit-transform" : "rotate(0deg)",
                        "-moz-transform"    : "rotate(0deg)",
                        "-ms-transform"     : "rotate(0deg)",
                        "-o-transform"      : "rotate(0deg)",
                        "transform"         : "rotate(0deg)"
            });
             
            leftBlocker = $("<div>")
                .width($this.width()/2)
                .height($this.height())
                .css("background-color", opts.colors[opts.colors.length-1]);
             
            rightBlocker = leftBlocker.clone()
                .addClass("bctimer-rightblocker")
             
            leftBlocker.addClass("bctimer-leftblocker");
             
            $this.append(leftBlocker).append(rightBlocker);
        }
        //The object is already a bctimer
        else
        {
            opts = $.extend({}, $this.data("options"), options);
            clearInterval($this.data("interval"));
            
            leftBlocker = $this.find(".bctimer-leftblocker").css("background-color", opts.colors[opts.colors.length-1]);
            rightBlocker = $this.find(".bctimer-rightblocker").css("background-color", opts.colors[opts.colors.length-1]);
            $this.css("background-color", opts.colors[0]);
        }
        
        $this.data("options", opts);
        
        /**********************************************
        * Helper functions and objects
        **********************************************/
        
        function rotateTo(blocker, angle)
        {
            blocker.css({
                "-webkit-transform" : "rotate(" + angle + "deg)",
                "-moz-transform"    : "rotate(" + angle + "deg)",
                "-ms-transform"     : "rotate(" + angle + "deg)",
                "-o-transform"      : "rotate(" + angle + "deg)",
                "transform"         : "rotate(" + angle + "deg)"
            });
        }
         
        function rotate()
        {
            if(rotationDegrees >= 360)
            {
                rotationDegrees = rotationDegrees % 360;
                leftBlocker.css("background-color", opts.colors[backgroundIndex]);
                rightBlocker.css("background-color", opts.colors[backgroundIndex]);
                backgroundIndex++;
                if(backgroundIndex >= opts.colors.length)
                {
                    backgroundIndex = 0;
                }
                $this.css("background-color", opts.colors[backgroundIndex]);
                 
                rotateTo(leftBlocker, 0);
                rotateTo(rightBlocker, rotationDegrees);
            }
             
            else if(rotationDegrees >= 180)
            {
                rotateTo(leftBlocker, rotationDegrees - 180);
                rotateTo(rightBlocker, 0);
                
                rightBlocker.css("background-color", opts.colors[backgroundIndex]);
            }
            else
            {
                rotateTo(leftBlocker, 0);
                rotateTo(rightBlocker, rotationDegrees);
                //console.log(backgroundIndex);
                if(backgroundIndex == 0)
                {
                   rightBlocker.css("background-color", opts.colors[opts.colors.length - 1]);
                }
                else
                {
                   rightBlocker.css("background-color", opts.colors[backgroundIndex - 1]);
                }
            }             
        }
        
        function radToDeg(rad)
        {
            return rad * 180 / Math.PI;
        }
        
        /***************************************
        * Implementation of modes
        ***************************************/
        
        if(opts.mode === "spinner")
        {
            var step = 360 / (opts.cycleLength / opts.updateInterval);
            function spin() {
                rotationDegrees += step;
                rotate();
            }

            $this.data("interval", setInterval(spin, opts.updateInterval));
        }
        else if(opts.mode === "manual")
        {
            if(/deg/.test(opts.value))
            {
                rotationDegrees = parseFloat(opts.value.replace("deg", ""));
            }
            else if(/rad/.test(opts.value))
            {
                rotationDegrees = radToDeg(parseFloat(opts.value.replace("rad", "")));
            }
            else if(/%/.test(opts.value))
            {
                rotationDegrees = 3.60 * parseFloat(opts.value.replace("%", ""));
            }
            else
            {
                console.error("Invalid 'value' provided: " + opts.value); 
            }

            rotate();
        }
        
        return $this;
    }
          
    $.fn.bctimer.defaults = {
        mode: "spinner", // countdown(not implemented) | manual | spinner
        size: "100px",
        colors: ["black", "white"],
        updateInterval: 30, //milliseconds between each update
        cycleLength: 5000, //milliseconds for a complete rotation
        value: "0deg", //value used in manual mode. ex: "
        /*
        donut: {
            size: 0,
            color: "white",
        },
        center: "percentage", // degrees | radians | text:value | time*/
    }
}(jQuery));