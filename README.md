# social-media-tracker

The purpose of the app is to show how many social posts are being posted during the week. Based on the chart we can analyze which period of time has the most traffic.

Data comes from Upfluence data stream which is a publicly available HTTP API endpoint streaming some of the posts processed by Upfluence system in real-time (It uses SSE technology). Data comes from apps like YouTube, Instagram, Twitter, Pinterest, Facebook.

## TODO in the upcoming versions

* install Sinon.JS to stub data in tests (I've ran to the issues when installing dependency. It has probably to do with Ember version 4.11. Maybe changeing Ember.JS version will be helpful).
* add feature to the chart when hover on bubble show a pie chart where user can see from what platform data comes from on the specific hour of day.
* implement Ember-Data to handle all data related actions.
* follow a11y guidelines to make the app accessible.
* make the app readable on mobile screen sizes. For now chart has a lot of data which overlap and is not readable on mobile sized screens.
* think of a way do store the data even when the app is closed. For now during the page reload all data that was on the chart is lost.
* make the app SEO "friendly"

## Trade-offs

For now each time when the chart is updated, data from the endpoint that is already on the chart is deleted. 
I picked up that approach because apart from chart there are no places in the app where the data is used. This approach speeds up the app.
If there will be more features in the future that uses the endpoint data it may be resonable to store all the data.
## Technical Choices

* I've used the newest Ember.JS stable version.
* I am not using any css pre-compiler because the styling is not for now complicated. No need to add another library at that point.
* I've used Chart.js library to create the chart. It's for sure easier and more redable that creating the bubble chart on my own.
* I didn't used Ember-Data cause my knowledge about Ember-Data at this point is not sufficient to develop the app quickly.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://cli.emberjs.com/release/)

## Installation

* `git clone <repository-url>` this repository
* `cd social-media-tracker`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Running Tests

* `ember test`
* `ember test --server`

## Useful Links

* [Chart.js](https://www.chartjs.org/)
* [Sinon.JS](https://sinonjs.org/)
* [EmberData](https://guides.emberjs.com/release/models/)
* [ember.js](https://emberjs.com/)
* [ember-cli](https://cli.emberjs.com/release/)
