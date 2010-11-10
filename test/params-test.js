// Add tests here
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

// Checks that the given input produces the expected output for
// a given test case.
function compare(tests, i) {
    return function() {
        printDiagnostics(tests[i]);
        same($.getParams(tests[i].input), tests[i].output);
    }
};

// Don't fail if the console is not available
if (typeof console == 'undefined') {
    console = {
        info: function(message) {
            // don't do anything
        }
    };
}

// For the curious among us...
function printDiagnostics(test) {
    console.info('input:');
    console.info(test.input);
    console.info('expected:');
    console.info(test.output);
    console.info('actual:');
    console.info($.getParams(test.input));
}

// Run all of the tests
for (var i = 0; i < tests.length; ++i) {
    test('input string: "' + 
         (tests[i].description ? tests[i].description : tests[i].input) +
         '"',
         compare(tests, i));
}

