Swiper.prototype.bindEvent = function () {
    var self = this;

    // Right button click event
    $('.rightBtn', this.wrap).click(function () {
        if (self.animateType == 'animate' && self.lock) {
            self.showIndex++;
            self.lock = false;
            $('.innerWrap', self.wrap).animate({ left: -self.showIndex * self.showWidth }, 300, 'swing', function () {
                if (self.showIndex == self.showImgGorp) {
                    $('.innerWrap', self.wrap).css({ left: 0 });
                }
                if (self.showIndex > self.showImgGorp - 1) {
                    self.showIndex = 0;
                }
                self.changSlideBtn();
                self.lock = true;
            });
        }

        if (self.animateType == 'fade') {
            self.showIndex++;
            if (self.showIndex > self.showImgGorp - 1) {
                self.showIndex = 0;
            }
            $('li', self.wrap).eq(self.showIndex).fadeIn(600, 'swing').end().eq(self.showIndex - 1).fadeOut(600, 'swing');
            self.changSlideBtn();
        }
    });

    // Left button click event
    $('.leftBtn', this.wrap).click(function () {
        if (self.animateType == 'animate' && self.lock) {
            self.showIndex--;
            self.lock = false;
            if (self.showIndex < 0) {
                $('.innerWrap', self.wrap).css({ left: -self.showImgGorp * self.showWidth });
                self.showIndex = self.showImgGorp - 1;
            }
            $('.innerWrap', self.wrap).animate({ left: -self.showIndex * self.showWidth }, 300, 'swing', function () {
                self.changSlideBtn();
                self.lock = true;
            });
        }

        if (self.animateType == 'fade') {
            self.showIndex--;
            if (self.showIndex < 0) {
                self.showIndex = self.showImgGorp - 1;
            }
            $('li', self.wrap).eq(self.showIndex).fadeIn(600, 'swing').end().eq(self.showIndex + 1).fadeOut(600, 'swing');
            self.changSlideBtn();
        }
    });

    // Slide indicator click event
    $('.slideWrap', this.wrap).find('span').click(function () {
        self.showIndex = $(this).index() - 1;
        $('.rightBtn', self.wrap).trigger('click');
    });

    // Start and stop autoplay on hover
    if (self.isAuto) {
        self.time = null; // No autoplay initially

        $(self.wrap)
            .on('mouseenter', function () {
                clearInterval(self.time); // Stop autoplay on hover
            })
            .on('mouseleave', function () {
                self.time = setInterval(function () {
                    $('.rightBtn', self.wrap).trigger('click');
                }, 1000); // Start autoplay on hover leave, with increased speed
            });
    }
};
