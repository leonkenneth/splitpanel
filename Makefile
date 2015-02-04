build/index.js: lib/*.js
	./node_modules/.bin/duo < lib/index.js > build/index.js

build/index.css: lib/*.css
	./node_modules/.bin/duo < lib/index.css > build/index.css

all: index

index: build/index.js build/index.css
