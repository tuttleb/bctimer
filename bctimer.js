(function ($)
{
    $.fn.bctimer = function(options)
    {
        var opts = $.extend({}, $.fn.bctimer.defaults, options);
         
        var $this = this;
        var leftBlocker = null;
        var rightBlocker = null;
        var rotationDegrees = 0;
        var backgroundIndex = 0;
         
        if(!$this.hasClass("bctimer"))
        {
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
             
            $this.data("colors", opts.colors);
        }
        else
        {
            $this.data("stopped", true);
            leftBlocker = $this.find(".bctimer-leftblocker");
            rightBlocker = $this.find(".bctimer-rightblocker");
            opts.colors = $this.data("colors");
        }
         
        function rotate()
        {
        console.log("rotate");
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
                 
                leftBlocker.css({
                    "-webkit-transform" : "rotate(0deg)",
                    "-moz-transform"    : "rotate(0deg)",
                    "-ms-transform"     : "rotate(0deg)",
                    "-o-transform"      : "rotate(0deg)",
                    "transform"         : "rotate(0deg)"
                });
                
                rightBlocker.css({
                    "-webkit-transform" : "rotate(" + rotationDegrees + "deg)",
                    "-moz-transform"    : "rotate(" + rotationDegrees + "deg)",
                    "-ms-transform"     : "rotate(" + rotationDegrees + "deg)",
                    "-o-transform"      : "rotate(" + rotationDegrees + "deg)",
                    "transform"         : "rotate(" + rotationDegrees + "deg)"
                });
            }
             
            else if(rotationDegrees > 179)
            {
                leftBlocker.css({
                    "-webkit-transform" : "rotate(" + (rotationDegrees - 180) + "deg)",
                    "-moz-transform"    : "rotate(" + (rotationDegrees - 180) + "deg)",
                    "-ms-transform"     : "rotate(" + (rotationDegrees - 180) + "deg)",
                    "-o-transform"      : "rotate(" + (rotationDegrees - 180) + "deg)",
                    "transform"         : "rotate(" + (rotationDegrees - 180) + "deg)" 
                });
                
                rightBlocker.css({
                    "-webkit-transform" : "rotate(0deg)",
                    "-moz-transform"    : "rotate(0deg)",
                    "-ms-transform"     : "rotate(0deg)",
                    "-o-transform"      : "rotate(0deg)",
                    "transform"         : "rotate(0deg)"
                });
                rightBlocker.css("background-color", opts.colors[backgroundIndex]);
            }
            else
            {
                leftBlocker.css({
                    "-webkit-transform" : "rotate(0deg)",
                    "-moz-transform"    : "rotate(0deg)",
                    "-ms-transform"     : "rotate(0deg)",
                    "-o-transform"      : "rotate(0deg)",
                    "transform"         : "rotate(0deg)"
                });
                rightBlocker.css({
                    "-webkit-transform" : "rotate(" + rotationDegrees + "deg)",
                    "-moz-transform"    : "rotate(" + rotationDegrees + "deg)",
                    "-ms-transform"     : "rotate(" + rotationDegrees + "deg)",
                    "-o-transform"      : "rotate(" + rotationDegrees + "deg)",
                    "transform"         : "rotate(" + rotationDegrees + "deg)"
                });
                //console.log(backgroundIndex);
                if(backgroundIndex == 0)
                {
                   rightBlocker.css("background-color", opts.colors[opts.colors.length-1]);
                }
                else
                {
                   rightBlocker.css("background-color", opts.colors[backgroundIndex - 1]);
                }
            }             
        }
         
        if(opts.mode === "spinner")
        {
            $this.data("stopped", false);
            var step = 360 / (opts.cycleLength / opts.updateInterval);
            function spin() {
                rotationDegrees += step;
                rotate();
                if(!$this.data("stopped"))
                {
                    setTimeout(spin, opts.updateInterval);
                }
            }
            setTimeout(spin, opts.updateInterval);
        }
        else if(opts.mode === "progress")
        {
            if(typeof(opts.progress) !== "number" || opts.progress > 1 || opts.progress < 0)
            {
                console.error("Progress must be a value between 0 and 1 inclusive");
                return;
            }
            rotationDegrees = 360 * opts.progress;
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

$(".bctimer").bctimer({updateInterval: 100, cycleLength: 20000});