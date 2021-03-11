# red-pill-blue-pill
Simple demonstration of the Bandito API presented at https://banditoapi.com/code_snippet_example.html. A video demonstration can be found at http://www.youtube.com/watch?v=WgmsYLj3V_s.

Did you know that the New York Times A/B tests multiple copies of headlines for many of the articles that they publish? As documented at https://blog.tjcx.me/p/new-york-times-ab-testing, they can test up to 8 headlines per article. Now, with Bandito API, this functionality can be easily and quickly integrated into ANY website or web app. To demonstrate this functionality, we present the "Red Pill Blue Pill Demonstration", in which we try to steer users to "take the blue pill" with headlines that automatically update based on performance.

This demonstration uses two files: **code_snippet_example.html** for the layout, and **code_snippet_example.js** for the business logic. It depends on the library **bandito.js** for the client-side API, which can be found with documentation at https://github.com/KoyoteScience/BanditoAPI. The demonstration presents a headline and two buttons: "Red Pill" and "Blue Pill". The user is encouraged to take one of the two pills (by clicking on the button), and Bandito API automatically learns which headlines will produce the desired outcome.

An additional option allows the user to determine which of the two pills the API will learn to encourage.

The amazing ability of Bandito is that it has no pre-conceived notions of how the action (which headline to present) affects the outcome (which pill you take). If a user follows the instructions and it is set to optimize for selecting the blue pill, it will learn to tell them "Take the blue pill". However, if our user has a good deal of sass and always does the opposite, Bandito will learn that too and tell them "Take the red pill", which it now has determined will be summarily ignored. If a user just hits the buttons randomly, Bandito will present the headlines at random as well.

You can also follow the dashboard button to see a real-time updated dashboard of ranked actions and performance.
