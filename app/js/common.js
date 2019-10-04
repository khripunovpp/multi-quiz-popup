var Util = {
    randomInteger: function(min, max) {
        var rand = min + Math.random() * (max - min)
        rand = Math.round(rand);
        return rand;
    },
    scrollToEl: function(el, offset) {
        $("html,body").animate({ scrollTop: el.offset().top + (offset || 0) }, 700);
    },
    trimString: function(string) {
        return string.split(' ').join('');
    }
}

var Quiz = function() {
    var _t = this
    this.open = function() {

    };
    this.clos = _close

    function _close() {

    };
    $(function() {
        _t['startBtn'] = $('.quiz__start')
        _t.startBtn.on('click', function(event) {
            event.preventDefault();
            console.log(Util)
            Util.scrollToEl($('.quiz__list'), 0)
        });
    })
}

$(function() {
    var q = new Quiz()
    q.open()
})