## How to install
* Install latest [Node.js](https://nodejs.org/en/) if you haven't
  * check if Node.js and npm are installed correctly by typing:
  `node -v` and `npm -v` in the terminal, both should return the version installed.
* Clone the project and proceed to the root folder of the project

## How to build
* In the terminal, run `npm install` to install all the dependencies.

## How to run
* In the terminal, run `npm start` to run the program. See example and sample output below:
```
& npm start
> food-truck-finder@1.0.0 start /Users/jack/Documents/personal/redfin/food-truck-finder
> node index.js

╔═══════════════════╤═════════════════════╗
║ NAME              │ ADDRESS             ║
╟───────────────────┼─────────────────────╢
║ Julie's Hot Dogs  │ 2365 MISSION ST     ║
╟───────────────────┼─────────────────────╢
║ M M Catering      │ 1200 MISSISSIPPI ST ║
╟───────────────────┼─────────────────────╢
║ Paradise Catering │ 855 GEARY ST        ║
╟───────────────────┼─────────────────────╢
║ Subs on Hubs      │ 333 08TH ST         ║
╚═══════════════════╧═════════════════════╝
```

* Only 10 results will return at most for each request/page. To get the next 10 results and so on, add the page number at the end of the request, for example: `npm start 2` to get page 2. If the number is not provided, it is by default 1. If no result is found, a `No result found` will be printed.

### additional minor feature for debugging

* By adding `DEBUG=true` at the beginning of the command, start time and end time of will also be printed:
```
$ DEBUG=true npm start

> food-truck-finder@1.0.0 start /Users/jack/Documents/personal/redfin/food-truck-finder
> node index.js

╔═══════════════════╤═════════════════════╤════════════╤══════════╗
║ NAME              │ ADDRESS             │ START TIME │ END TIME ║
╟───────────────────┼─────────────────────┼────────────┼──────────╢
║ Julie's Hot Dogs  │ 2365 MISSION ST     │ 12AM       │ 3AM      ║
╟───────────────────┼─────────────────────┼────────────┼──────────╢
║ M M Catering      │ 1200 MISSISSIPPI ST │ 12AM       │ 5AM      ║
╟───────────────────┼─────────────────────┼────────────┼──────────╢
║ Paradise Catering │ 855 GEARY ST        │ 12AM       │ 1AM      ║
╟───────────────────┼─────────────────────┼────────────┼──────────╢
║ Subs on Hubs      │ 333 08TH ST         │ 12AM       │ 2AM      ║
╚═══════════════════╧═════════════════════╧════════════╧══════════╝

```

* Another caveat is that result is not adjusted by different time zone differences. So running the command in 9:00AM PST will get the same result as 9:00AM EST.

## If this was a web application
The web application is different from command-line program that it will allow remote application to access the feature/API via HTTP protocols. A command-line program, if we want remote access, would require the remote user to access the machine that runs the program, for example, via ssh. 

Depending how extensive we want to build the web application, we may consider storing data into our own database in case the original site that hosted the data went down. It could also reduce latency or throttle of request usage. We may also consider caching data to reduce repeated calls. For example, if we have 1,000 different users sending request at the same time, having the result being cached in the application reduces the time spent to retrieving data for 999 times. A web application may also include a web page, providing a GUI may be more user friendly than command-line program.
