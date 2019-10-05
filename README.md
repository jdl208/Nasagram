# Nasagram
This website has a connection with tha api from NASA. It's a small, easy digestable website which shows 3 kinds of pictures related to space.
* An astronomy photo of the day.
* A picture of earth.
* Pictures taken by the Mars Rovers.

The website can be viewed [here](https://jdl208.github.io/Nasagram/)
## UX
I wanted to make a website with minimal scrolling. So it focusses immediatly on the pictures. When you go to another section, The latest picture made by that camera will immediatly be there.

The users should be able to consume the information with as little clicking as possible.

[The initial design](https://github.com/jdl208/Nasagram/blob/54d11868d6ee4714ca3729ed3d484cee7d3d3859/wireframes/Nasagram%20Initial%20design.png) was a bit different from the end result. I figured it looked better when i made the center of the page one unit instead of 2.
## Features
### Existing features
- Image select - At first the most recent picture is shown. But you can select previous dates to have a view of that image.
- Rover select - You can choose from which rover you want to see the pictures.
### Features left to Implement
- Sometimes there are more pictures on 1 sol. So I want to make a selector for all the pictures in 1 sol made by a mars rover.
- A rover has multiple cameras. I want te make a selector for the selected camera so you only see the pictures made with that camera.
## Technologies
* [HTML](https://www.w3.org/TR/html52/)\
Is used for the semantics of the website.
* [CSS](https://www.w3.org/Style/CSS/)\
The styling of the website is done with CSS
* [Bootstrap](https://getbootstrap.com/)\
Bootstrap is used for the layout of the website and the navbar with the toggler.
* [Font Awesome](https://fontawesome.com/)\
Used to implement some icons on the page.
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)\
Used for the connection with the API and making the website interactive.
* [jQuery](https://jquery.com)\
The project uses JQuery for an easier use of DOM manipulation.
## Testing

All the selection fields cannot select a date beyond the last available date. Because the max attribute will be adjusted to the query that goes with it. In the EPIC section sometimes there hasn't been a picture on a day. So we catch that error and return an image unavailable image.

1. Epic section.
   - Go to the EPIC section
   - Pick a date without an image (5th of june 2019 for instance) and it will return an image is not available.

The website is responsive and adjusts to the different size in a screen while remaining function in the same manner.

When developing the site. The APOD returned a Youtube link on 1-10-2019 instead of an image. I adjusted the code so it would be able to show a video instead of an image.

## Deployment
This site is hosted using GitHub pages, deployed directly from the master branch. The live site updates automatically each time there is a new push to the repository. You can git clone the code to run it locally on your machine.
## Credits
### Content
* The text for the EPIC explanation was copied from the [NASA API site](https://api.nasa.gov/).