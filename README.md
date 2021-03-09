# red-pill-blue-pill
Simple demonstration of the Bandito API presented at https://banditoapi.com/code_snippet_example.html

This demonstration uses two files: **code_snippet_example.html** for the layout and **code_snippet_example.js** for the business logic. The demonstration presents a headline and two buttons: "Red Pill" and "Blue Pill". The user is encouraged to take one of the two pills (by clicking on the button), and Bandito API automatically learns which headlines will produce the desired outcome.

An additional option allows the user to determine which of the two pills the API will learn to encourage.

The amazing ability of Bandito is that it has no pre-conceived notions of how the action (which headline to present) affects the outcome (which pill you take). If a user follows the instructions and it is set to optimize for selecting the blue pill, it will learn to tell them "Take the blue pill". However, if our user has a good deal of sass and always does the opposite, Bandito will learn that too and tell them "Take the red pill", which it now has determined will be summarily ignored. If a user just hits the buttons randomly, Bandito will present the headlines at random as well.

You can also follow the dashboard button to see a real-time updated dashboard of ranked actions and performance.
