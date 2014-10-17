Spectre
====

A node package to profile those webpages from the command line. Built on top of phantomjs goodness.

**Usage**

1. Checkout this repository (Once I publish this to npm, whenever that will be, doing an `npm install spectre` will be supported)
2. `cd` into the package directory
3. Run `npm install -d`
4. Profile webpages using the following command
`./bin/profile <webpage address> [options]`

**Supported Options**

`--loop`
The number of times the profiling should be performed.

`--out`
The file to which the CSV output should be written. The CSV file will have 4 columns. Initial page load timestamp, Resource URL, Time (in ms) after the initial page load that the resource request was made & Response time for the said resource.

`--cookieFile`
If the webpage requires authentication then this option can be used to specify the file containing the valid cookies.

`--cookieDomain`
The domain associated with the cookies.


