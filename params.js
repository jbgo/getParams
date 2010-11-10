(function($) {

    $.extend({
        getParams: getParams
    });

    var cache = {};

    function getParams(queryString) {
        if ($.type(queryString) != 'string') {
            queryString = window.location.search;
        }
        if (queryString[0] == '?') {
            queryString = queryString.substr(1);
        }
        if (!cache[queryString]) {
            cache[queryString] = splitParams(queryString);
        }
        return cache[queryString];
    }

    function splitParams(queryString) {
        var i, kv, kfloat, vfloat,
            queryObj = {},
            pairs = queryString.split('&');
        if (pairs[0].length > 0) {
            for (i = 0; i < pairs.length; ++i) {
                kv = pairs[i].split('=');
                if (kv.length > 1) {
                    kfloat = parseFloat(kv[0]);
                    vfloat = parseFloat(kv[1]);
                    kv[0] = kfloat ? kfloat : decodeURIComponent(kv[0]);
                    kv[1] = vfloat ? vfloat : decodeURIComponent(kv[1]);
                    queryObj[kv[0]] = kv[1];
                } else {
                    queryObj[kv[0]] = null;
                }
            }
        }
        return queryObj;
    }

})(jQuery);
