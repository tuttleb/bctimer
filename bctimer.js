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
             
            $this.data("options", opts);
        }
        //The object is already a bctimer
        else
        {
            opts = $.extend({}, $this.data("options"), options);
            console.log(opts);
            clearInterval($this.data("interval"));
            
            leftBlocker = $this.find(".bctimer-leftblocker").css("background-color", opts.colors[opts.colors.length-1]);
            rightBlocker = $this.find(".bctimer-rightblocker").css("background-color", opts.colors[opts.colors.length-1]);
            $this.css("background-color", opts.colors[0]);
        }
         
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

            if(rotationDegrees >= 359)
            {
                rotationDegrees = rotationDegrees % 359;
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
             
            else if(rotationDegrees > 179)
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
         
        if(opts.mode === "spinner")
        {
            var step = 360 / (opts.cycleLength / opts.updateInterval);
            function spin() {
                rotationDegrees += step;
                rotate();
            }

            $this.data("interval", setInterval(spin, opts.updateInterval));
        }
        else if(opts.mode === "progress")
        {
            if(typeof(opts.progress) !== "number" || opts.progress > 1 || opts.progress < 0)
            {
                console.error("Progress must be a value between 0 and 1 inclusive");
                return;
            }
            rotationDegrees = 359 * opts.progress;
            rotate();
        }
    }
          
    $.fn.bctimer.defaults = {
        mode: "spinner", // countdown | progress
        size: "100px",
        colors: ["black", "white"],
        updateInterval: 30, //milliseconds between each update
        cycleLength: 5000, //milliseconds for a complete rotation
        progress: 0, //between 0 and 1, only used for progress mode
    }
}(jQuery));