# Summarize #

----------
Summarize is work in progress and the key idea here is to extract summary and present synopsis from an article/document. At present the document must be hosted on web and its url is what, summarize expects as input.

Summarize intends to use available ML apis for text processing. As work progresses, summarize may also build new ML models for text processing. 

Latest version is hosted [here](http://summariz.azurewebsites.net/ "Summarize")


## Version log ##
**0.0.1** - Summarize is using Azure ML text processing APIs to determine Sentiment and Key phrases in given document.
 

## Building the project ##
Summarize is built on top of [Wireup](https://github.com/prem9in/wireup "Wireup") client framework, so it leverages all integration build system from [Wireup](https://github.com/prem9in/wireup "Wireup").

Project is being implemented in [ES6](http://exploringjs.com/es6/ch_about-es6.html "ES6") and hence will need transpilation to work in all browsers, until browsers starts supporting all [ES6](http://exploringjs.com/es6/ch_about-es6.html "ES6") features.
For building this project, please ensure you have latest version of [node](https://nodejs.org/en/ "NodeJs") and [npm](https://www.npmjs.com/ "npm") installed on your machine.

- First step is to get all required npm packages. To do this open command prompt and at root folder (where package.json resides) execute
			
		npm install .

Do not forget the dot at the end of command.

- Once all modules are downloaded run the **build.cmd** from command prompt

			build.cmd

Under the hood build.cmd uses [gulp](http://gulpjs.com/ "gulp") streaming build system and [babel](https://babeljs.io/ "babel") compiler through [node](https://nodejs.org/en/ "NodeJs").

- All required files will be dropped in **out** directory as well as alongside the files in app folder.
 
- Run index.html via a http endpoint and application would be running.


> Warning from build 
`fs: re-evaluating native module sources is not supported. If you are using the graceful-fs module, please update it to a more recent version.`
> [graceful-fs](https://www.npmjs.com/package/graceful-fs "graceful-fs") module is used by [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps "gulp-sourcemaps") module. Once sourcemaps module; updates this dependency, our warning will be gone.


## Using Summarize ##
Build drops the required files in **out** folder. Host the contents of out folder on a web server and launch index.html over http.

> Summarize loads the document from a given url using http ajax GET call. 
> Summarize uses [Proxy](https://github.com/prem9in/proxy "proxy") to get past the cross domain call barrier.

> For more details for proxy. Visit [Proxy](https://github.com/prem9in/proxy "proxy")

> In future, summarize may change to use an iframe to avoid a proxy call.



