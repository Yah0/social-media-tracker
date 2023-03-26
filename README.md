# social-media-tracker

The purpose of the app is to show how many social media posts are being posted during the week. Based on the chart, we can analyze which period of time has the most traffic.

The data comes from Upfluence data stream, which is a publicly available HTTP API endpoint that streams some of the posts processed by the Upfluence system in real-time (it uses SSE technology). The data comes from apps like YouTube, Instagram, Twitter, Pinterest, and Facebook.

## TODO in the upcoming versions

* Install Sinon.JS to stub data in tests. (I ran into issues when installing the dependency. It is probably due to Ember version 4.11. Maybe changing the Ember.JS version will be helpful.)
* Add a feature to the chart where hovering on a bubble shows a pie chart that shows from which platform data comes from at a specific hour of the day.
* Implement Ember-Data to handle all data-related actions.
* Follow a11y guidelines to make the app accessible.
* Make the app readable on mobile screen sizes. For now, the chart has a lot of data that overlaps and is not readable on mobile-sized screens.
* Think of a way to store the data even when the app is closed. For now, during the page reload, all data that was on the chart is lost.
* Make the app SEO-friendly.
* Create Restart button to clear all the chart data.
* Create a custom modifier to replace did-insert to update the chart each time when the socialPosts object from service is changed. It should only at the beginning create the chart then after creation just update it when the data has changed.
* Write better test for bubble-chart component.
* Delete setInterval method in the chart component. For now it's running even when the event from service is stopped.

## Trade-offs

For now, each time the chart is updated, data from the endpoint that is already on the chart is deleted.
I chose this approach because, apart from the chart, there are no places in the app where the data is used. This approach speeds up the app.
If there will be more features in the future that use the endpoint data, it may be reasonable to store all the data
## Technical Choices

* I used the newest stable version of Ember.JS.
* I am not using any CSS pre-compiler because the styling is not currently complicated. There is no need to add another library at this point.
* I used the Chart.js library to create the chart. It is easier and more readable than creating the bubble chart on my own.
* I did not use Ember-Data because my knowledge about Ember-Data at this point is not sufficient to develop the app quickly.

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
