/**
 * Copyright Subin Siby <subinsb.com>
 * Licensed under GNU-GPL 3.0
 * --------------------------
 * Some code from jQuery asuggest plugin
 * Licensed under GNU-GPL 3.0
 * https://github.com/imankulov/asuggest/
 */

//$(document).ready(function() {
    var input = $('#input'),
        minChunkSize = 1,
        cycleOnTab = true,
        stopCharacters = [' ', '\n', '\r', '\t'],
        KEY = {
            UNKNOWN: 0,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            DEL: 46,
            TAB: 9,
            RETURN: 13,
            ESC: 27,
            COMMA: 188,
            PAGEUP: 33,
            PAGEDOWN: 34,
            BACKSPACE: 8,
            SPACE: 32
        };

    var suggestions = [],
        cachedSuggestions = {};

    /**
     * https://stackoverflow.com/a/20042651/1372424
     */
    function getCurrentWordPos() {
        var text = input.val(),
            end = input[0].selectionEnd;
        var textBeforeCursor = text.substr(0, end),
            indexOfDelimiter = -1,
            i,
            d,
            idx;
        for (i = 0; i < stopCharacters.length; i++) {
            d = stopCharacters[i];
            idx = textBeforeCursor.lastIndexOf(d);
            if (idx > indexOfDelimiter) {
                indexOfDelimiter = idx;
            }
        }
        while (end < text.length) {
            if (stopCharacters.indexOf(text[end]) == -1) {
                ++end;
            } else {
                break;
            }
        }
        if (indexOfDelimiter < 0) {
            return [0, end];
        } else {
            return [indexOfDelimiter + 1, end];
        }
    }

    function getChunk() {
        var text = input.val(),
            pos = getCurrentWordPos(),
            start = pos[0],
            end = pos[1];
        return text.substr(start, end - start);
    }

    $.fn.setCursorPosition = function(pos) {
        this.each(function(index, elem) {
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        });
        return this;
    };

    function replaceWord(word) {
        var text = input.val(),
            pos = getCurrentWordPos(),
            start = pos[0],
            end = pos[1];

        input.val(text.substring(0, start) + word + text.substring(end, text.length));
        suggestions = [];
        $('#suggestions-content').html('');
        input.setCursorPosition(start + word.length);
    }

    input.on('keydown', function(e) {
        var hasSpecialKeysOrShift = e.altKey || e.metaKey || e.ctrlKey || e.shiftKey;

        if (hasSpecialKeysOrShift)
            return;

        // numeric keys
        if (e.keyCode >= 48 && e.keyCode <= 57) {
            var i = e.keyCode - 48;

            e.preventDefault();

            if (typeof suggestions[i] !== 'undefined') {
                replaceWord(suggestions[i]);
                var obj = $('#suggestions li').eq(i);
                obj.addClass('green white-text');
                setTimeout(function() {
                    obj.removeClass('green white-text');
                }, 500);
            }
        }

        if (e.keyCode == KEY.SPACE && typeof suggestions[1] !== 'undefined') {
            replaceWord(suggestions[1]);
        }

        localStorage['varnam-input'] = input.val();
    });

    input.on('keyup', function(e) {
        var hasSpecialKeys = e.altKey || e.metaKey || e.ctrlKey,
            hasSpecialKeysOrShift = hasSpecialKeys || e.shiftKey;
        switch (e.keyCode) {
            case KEY.UNKNOWN: // Special key released
            case KEY.SHIFT:
            case KEY.CTRL:
            case KEY.ALT:
            case KEY.RETURN: // we don't want to suggest when RETURN key has pressed (another IE workaround)
                break;
            case KEY.TAB:
                if (!hasSpecialKeysOrShift && cycleOnTab) {
                    break;
                }
            case KEY.ESC:
            case KEY.UP:
            case KEY.DOWN:
            case KEY.LEFT:
            case KEY.RIGHT:
                break;
            default:
                // numkeys & numpad
                if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                    break;
                }
                if (!hasSpecialKeys) {
                    var chunk = getChunk();
                    if (chunk.length >= minChunkSize) {
                        if (!showCachedSuggestions(getChunk())){
                            eel.transliterate(getChunk());
                        }
                    }
                }
                break;
        }
    });

    var html = '';
    function displaySuggestions(word, s) {
        html = '', suggestions = [word];
        $.each(s, function(k, v) {
            if (v == '')
                return
            v = v.trim();
            suggestions.push(v);
            html += '<li class="waves-effect waves-green">' + v + '</li>';
        });
        $('#suggestions-word').html(word);
        $('#suggestions-content').html(html);
    }

    eel.expose(showSuggestions);
    function showSuggestions(word, s) {
        displaySuggestions(word, s);
        cachedSuggestions[word] = s;
    }

    function showCachedSuggestions(word) {
        if (typeof cachedSuggestions[word] !== 'undefined') {
            displaySuggestions(word, cachedSuggestions[word]);
            return true;
        }
        return false;
    }

    $(document).on('click', '#suggestions li', function() {
        if (suggestions.length !== 0) {
            replaceWord($(this).text());
        }
    });

    $('#save-settings').on('click', function() {
        localStorage['varnam-fontsize'] = $('#font-size').val();
        input.css('font-size', localStorage['varnam-fontsize'] + 'px');
    });

    if (typeof localStorage['varnam-input'] !== 'undefined') {
        input.val(localStorage['varnam-input']);
    }

    if (typeof localStorage['varnam-fontsize'] !== 'undefined') {
        input.css('font-size', localStorage['varnam-fontsize'] + 'px');
        $('#font-size').val(localStorage['varnam-fontsize']);
    }

    input.focus().characterCounter();

    $('.modal').modal();
//});