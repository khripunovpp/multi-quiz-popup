var Util = {
    randomInteger: function(min, max) {
        var rand = min + Math.random() * (max - min);
        rand = Math.round(rand);
        return rand;
    },
    scrollToEl: function(el, offset, target) {
        $(target ? target : "html,body").animate({ scrollTop: el.offset().top + (offset || 0) }, 700);
    },
    trimString: function(string) {
        return string.split(' ').join('');
    }
};

var Quiz = function() {
    var _t = this;
    (function() {
        _t['quiz'] = $('.quiz');
        _t['greetingSlide'] = $('.quiz__main');
        _t['quizClose'] = $('.quiz__close');
        _t['quizBack'] = $('.quiz__back');
        _t['startBtn'] = $('.quiz__start');
        _t['quizTrigger'] = $('.quiz__item');
        _t['qustionContainer'] = $('.quiz__questions');
        _t['qustionList'] = $('.quiz__questionsList');

        _t.startBtn.on('click', function(event) {
            event.preventDefault();
            Util.scrollToEl($('.quiz__list'), 0, _t.quiz);
        });

        _t.quizClose.on('click', function(event) {
            event.preventDefault();
            _t.close();
        });

        _t.quizTrigger.on('click', function(event) {
            event.preventDefault();
            _t.quiz.addClass('loading');
            _t.greetingSlide.fadeOut(0);
            _t.quiz.addClass('answering');
            _t.qustionContainer.show();
            Util.scrollToEl($('.quiz'), 0, _t.quiz);
            var data = $(this).closest(_t.quizTrigger).attr("data-settings");
            _parseData(data, function() {
                _t.quiz.removeClass('loading');
            })
        });

        $('body').on('click', '.quiz__question-answer', function(event) {
            event.preventDefault();
            $(this).addClass('selected');
            if(!_t.actriveQuestion.multi) $(this).siblings().removeClass('selected')
        });
    })()
    this.open = function() {
        _t.quiz.fadeIn(400, function() {
            $(this).addClass('opened');
        });
    };
    this.close = _close;

    function _close() {
        _t.quiz.fadeOut(400, function() {
            $(this).removeClass('opened');
        });
    };

    function _parseData(data, cb) {
        try {
            _t['activeQuiz'] = JSON.parse(data);

            var questionsArr = _t.activeQuiz.data.questions;
            questionsArr.forEach(function(question, i) {
                var questionEl = _makeQuestion(question, i);
                _t.qustionList.append(questionEl);
            })

            _t['actriveQuestion'] = JSON.parse($('.quiz__question.active').attr('data-settings'))
            
            setTimeout(function() {
                cb();
            }, 1000)
        } catch (e) {
            console.log(e);
        }
    }

    function _makeQuestion(question, i) {
        var caption = question.caption,
            answersArr = question.answers;

        var captionEl = $('<p>').addClass('quiz__question-caption').html(caption),
            questionEl = $('<div>').addClass('quiz__question');

        questionEl.append(captionEl);
        questionEl.append(_makeAnswers(answersArr));
        questionEl.attr("data-settings", JSON.stringify(question));

        if(i === 0) questionEl.addClass('active')

        return questionEl;
    }

    function _makeAnswers(answers) {
        var answersEl = $('<div>').addClass('quiz__question-answers');
        answers.forEach(function(answer, i) {
            answersEl.append(_makeAnswer(answer, i));
        })
        return answersEl
    }

    function _makeAnswer(data) {
        var value = data.value,
            description = data.description,
            image = data.image,
            reset = data.reset,
            answersEl = $('<p>').addClass('quiz__question-answer');

        var valueEl = $('<b>').html(value),
            descriptionEl = description.length ? $('<span>').html(description) : '',
            imageEl = image.length ? $('<i>').css('background-image', 'url(' + image + ')') : '';

        answersEl.html(valueEl).append(descriptionEl);
        imageEl && answersEl.addClass('quiz__question-answer--has-image').append(imageEl);
        reset && answersEl.attr('data-reset-answers', reset);

        return answersEl;
    }
}

$(function() {
    var q = new Quiz();
    q.open();
})