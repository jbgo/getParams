var tests = [
    { 
        input: "",
        output: {}
    },
    {
        input: "foo",
        output: { foo: null }
    },
    {
        input: "foo=bar",
        output: { "foo": "bar" }
    },
    {
        input: "foo=bar&boo=baz&bippity=boppity",
        output: {
            foo: "bar",
            boo: "baz",
            bippity: "boppity"
        }
    },
    {
        input: "foo=1&bar=3&baz=3.14",
        output: {
            foo: 1,
            bar: 3,
            baz: 3.14
        }
    },
    {
        input: "this+string=has%20spaces",
        output: {
            "this+string": "has spaces"
        }
    },
    {
        input: "encoded%5Bparam%5d=42",
        output: {
            "encoded[param]": 42
        }
    },
    {
        input: "?with=question-mark",
        output: {
            "with": "question-mark"
        }
    }
];

function compare(tests, i) {
    return function() {
        printDiagnostics(tests[i]);
        same($.params(tests[i].input), tests[i].output);
    }
};

if (typeof console == 'undefined') {
    console = {
        info: function(message) {
            // don't do anything
        }
    };
}

function printDiagnostics(test) {
    console.info('input:');
    console.info(test.input);
    console.info('expected:');
    console.info(test.output);
    console.info('actual:');
    console.info($.params(test.input));
}

for (var i = 0; i < tests.length; ++i) {
    test('input string: "' + 
         (tests[i].description ? tests[i].description : tests[i].input) +
         '"',
         compare(tests, i));
}

