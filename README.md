## what is this?

this mini project is a built with vanillia typescript and webpack. no frameworks or libraries were used besides webpack and eslint. this repo is an attempt to replicate the problem of how to produce the curves of the graph for another ecg program. the program aims to be a proof of concept satisfying following requirements:

-   how to draw arbitrarily complex ecg's
-   conform to being polynomials
-   individual portions of the ecg's are able to be manipulated in response to user input (2 way data binding)

further this project was an oppurtunity to work on a project in vanilla js/ts with no vue or react to do a lot of the
work, and rolling my own routing, state management and reactivity system in addition to configuring webpack to build
with a modular design was a good learning experience.

## what is the motivation for all this?

the motivation for this project comes from attempting to achieve the above using bezier curves, in which i was not
succesful. i felt the approach i took, using faceted curves, or drawing seemingly smooth curves from infinitesimals,
was rather a nuclear approach and as an alternative to bezier curves, must be the wrong one. however they work, and
while less responsive than with bezier curves, satisfy the requirements for the project.

## what this project isnt?

this project is a minimal reproduction of the fundamental problem of drawing the curves
subject to the requirements of the project. however in reality, where there is only one simple ecg here, there will be
hundreds. theres likely refactoring i havent discovered yet needing to be done, and coupling needing to be abstracted, at this point on 10/27/20.
