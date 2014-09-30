/* bctimer
 * Brett Tuttle
 * A jQuery plugin to create loading spinners, progress bars, and countdown timers. It acts similar to the countdown
 * timers at the start of old fashioned movies.
 *
 * For example usage see
 *  https://github.com/tuttleb/bctimer
 *  Specifically look at the demo.html file.
 *
 */
;(function ($, window, document, undefined)
{
    function radToDeg(rad)
    {
        return rad * 180 / Math.PI;
    }

    var Blocker;
    Blocker = function (options, container) {
        this.$element = $("<div>")
            .width(container.width() / 2)
            .height(container.height());
        this.setColor(options.colors[options.colors.length - 1]);
    };

    Blocker.prototype.rotateTo = function(angle) {
        this.$element.css({
            "-webkit-transform" : "rotate(" + angle + "deg)",
            "-moz-transform"    : "rotate(" + angle + "deg)",
            "-ms-transform"     : "rotate(" + angle + "deg)",
            "-o-transform"      : "rotate(" + angle + "deg)",
            "transform"         : "rotate(" + angle + "deg)"
        });
    };

    Blocker.prototype.setColor = function(color) {
        this.$element.css("background-color", color);
    };

    $.fn.bctimer = function(options)
    {
        this.each(function() {

            var $this = $(this);

            var opts,
            leftBlocker,
            rightBlocker,
            donut,
            rotationDegrees = 0,
            backgroundIndex = 0,
            donutIndex = 0;

            //This is the first time bctimer is being called on the object
            if (!$this.data("bctimerdata")) {
                opts = $.extend({}, $.fn.bctimer.defaults, options);
                $this.addClass("bctimer")
                    .css({
                        "width": opts.size,
                        "height": opts.size,
                        "background-color": opts.colors[backgroundIndex]
                    });

                $this.css({
                    "-webkit-transform": "rotate(0deg)",
                    "-moz-transform": "rotate(0deg)",
                    "-ms-transform": "rotate(0deg)",
                    "-o-transform": "rotate(0deg)",
                    "transform": "rotate(0deg)"
                });

                leftBlocker = new Blocker(opts, $this);
                rightBlocker = new Blocker(opts, $this);

                leftBlocker.$element.addClass("bctimer-leftblocker");
                rightBlocker.$element.addClass("bctimer-rightblocker");

                $this.append(leftBlocker.$element).append(rightBlocker.$element);

                if(opts.donut)
                {
                    donut = $('<div>')
                        .width(opts.donut.size)
                        .height(opts.donut.size)
                        .addClass("bctimer-donut")
                        .css({
                            "background-color": opts.donut.colors[donutIndex],
                            "top": leftBlocker.$element.height() / 2 - opts.donut.size / 2 + "px",
                            "left": leftBlocker.$element.height() / 2 - opts.donut.size / 2 + "px"
                        });
                    console.log(donut.css('top'));
                    $this.append(donut);
                }

                $this.data("bctimerdata", {
                    leftBlocker: leftBlocker,
                    rightBlocker: rightBlocker,
                    donut: donut,
                    options: opts
                });
            }
            //The object is already a bctimer
            else {
                var data = $this.data("bctimerdata");
                opts = $.extend({}, data.options, options);
                data.options = opts;

                clearInterval(data.interval);

                leftBlocker = data.leftBlocker;
                rightBlocker = data.rightBlocker;
                donut = data.donut;

                leftBlocker.setColor(opts.colors[opts.colors.length - 1]);
                rightBlocker.setColor(opts.colors[opts.colors.length - 1]);

                $this.css("background-color", opts.colors[0]);
            }

            function rotate()
            {
                if(rotationDegrees >= 360)
                {
                    var spins = Math.floor(rotationDegrees/360) - 1; // -1 so the blocker colors are 1 behind
                    rotationDegrees = rotationDegrees % 360;

                    backgroundIndex += spins;
                    backgroundIndex %= opts.colors.length;

                    leftBlocker.setColor(opts.colors[backgroundIndex]);

                    backgroundIndex++;
                    backgroundIndex %= opts.colors.length;

                    donutIndex++;
                    donutIndex %= opts.donut.colors.length;

                    $this.css("background-color", opts.colors[backgroundIndex]);
                    donut.css("background-color", opts.donut.colors[donutIndex]);
                }

                if(rotationDegrees >= 180)
                {
                    leftBlocker.rotateTo(rotationDegrees - 180);
                    rightBlocker.rotateTo(0);

                    rightBlocker.setColor(opts.colors[backgroundIndex]);
                }
                else
                {
                    leftBlocker.rotateTo(0);
                    rightBlocker.rotateTo(rotationDegrees);
                    //console.log(backgroundIndex);
                    if(backgroundIndex == 0)
                    {
                        rightBlocker.setColor(opts.colors[opts.colors.length - 1]);
                    }
                    else
                    {
                        rightBlocker.setColor(opts.colors[backgroundIndex - 1]);
                    }
                }
            }

            /***************************************
             * Implementation of modes
             ***************************************/

            if (opts.mode === "spinner") {
                var step = 360 / (opts.cycleLength / opts.updateInterval);

                function spin() {
                    rotationDegrees += step;
                    rotate();
                }

                $this.data("bctimerdata").interval = setInterval(spin, opts.updateInterval);
            }
            else if (opts.mode === "manual") {
                if (/deg/.test(opts.value)) {
                    rotationDegrees = parseFloat(opts.value.replace("deg", ""));
                }
                else if (/rad/.test(opts.value)) {
                    rotationDegrees = radToDeg(parseFloat(opts.value.replace("rad", "")));
                }
                else if (/%/.test(opts.value)) {
                    rotationDegrees = 3.60 * parseFloat(opts.value.replace("%", ""));
                }
                else {
                    console.error("Invalid 'value' provided: " + opts.value);
                }

                rotate();
            }
        });

        return this;
    };
          
    $.fn.bctimer.defaults = {
        mode: "spinner", // countdown(not implemented) | manual | spinner
        size: "100px",
        colors: ["black", "white"],
        updateInterval: 30, //milliseconds between each update
        cycleLength: 5000, //milliseconds for a complete rotation
        value: "0deg", //value used in manual mode. ex: "
        donut: {
            size: 0,
            colors: ["white"]
        },
        center: "percentage" // degrees | radians | text:value | time*/
    }
}(jQuery, window, document, undefined));