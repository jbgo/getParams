(function($) {

    $.extend({
        queryParams: queryParams
    });

    var cache = {};

    function query_params(query_string) {
        if ($.type(query_string) != 'string') {
            query_string = window.location.search;
        }
        if (query_string[0] == '?') {
            query_string = query_string.substr(1);
        }
        if (!cache[query_string]) {
            cache[query_string] = split_params(query_string);
        }
        return cache[query_string];
    }

    function split_params(query_string) {
        var i, kv, kfloat, vfloat,
            query_obj = {},
            pairs = query_string.split('&');
        if (pairs[0].length > 0) {
            for (i = 0; i < pairs.length; ++i) {
                kv = pairs[i].split('=');
                if (kv.length > 1) {
                    kfloat = parseFloat(kv[0]);
                    vfloat = parseFloat(kv[1]);
                    kv[0] = kfloat ? kfloat : decodeURIComponent(kv[0]);
                    kv[1] = vfloat ? vfloat : decodeURIComponent(kv[1]);
                    query_obj[kv[0]] = kv[1];
                } else {
                    query_obj[kv[0]] = null;
                }
            }
        }
        return query_obj;
    }

})(jQuery);
