# Lifeway Challenge

This was my first project using Next.js, and my first with any testing library.

I spent a good amount of time going through the Next.js and Jest documentation, and am now a fan of both!

## Development
I went through a few iterations of the initial SWAPI call, but ultimately landed on using one function for the initial search call, and using the iniial response to make the next API calls to get the starship, film, and species info. I added a few try/catch statements to make sure it wouldn't break if one of the calls failed. A better way to accomplish this would be to split up the submit function into functions that just handle each API call, but I didn't want to spend the time messing with setStates and useEffects.


## Add next?
As mentioned previously, the next step would be to split out the submit statements, but I would also like to spend time doing  more styling outside of just Bootstrap, and also dive more into complitated tests Jest. I currently have a test that is just checking if the page loads. Simulating an API call is not as easy as it sounds, but I found some documentation on similating the call with hard-coding a dummy response, which sounds promising.


## Run this project

To run the project, clone this repo and run 'npm install'. You should be able to 'npm run dev' which will launch the dev version. To run the Jest testing, run 'npm run test'. 

