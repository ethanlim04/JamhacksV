## Inspiration

Our original goal was to build a hack that helps people shopping. After extensive ideation, we settled on a project to save time: the most important resource. We've all experienced waiting in a terribly long line at the grocery store, be it Costco, Food Basics, or even Domino's.

Drawing inspiration from various other established tools such as google maps, we strived to improve on the feedback users get regarding how busy stores are. Solving the issue of waiting on stores which are packed-full of customers by knowing the line, before you arrive.

## What it does

Through user-submitted reviews of how busy these stores are, we can provide accurate data to busy adults or teens who don't like waiting for entrance.

Our web application is actually a PWA (progressive web application) which means users can actually install this web application on their phone or homescreen.

## How we built it

Built from the ground up in react, we've designed this website from the start to cater to busy individuals. We bootstraped out application with create-react-app, as well as bootstrap, scss, Typescript, and some other utilities. Our backend was built from vanilla javascript using Node 14 features, expressjs, and multer. We used the built-in `fetch` API to interact with the API endpoints.

## Challenges we ran into

-   Map integration
    -   The map was difficult to put together due to some quirks with the google API. It took a lot of trial and error to make it work.
-   Image upload
    -   Multer was difficult to work with, but we mostly figured it out at the end.
-   Collaboration
    -   Live share was a pain in the backside to use. Files didn't save sometimes, or would not sync properly and would break things.

## Accomplishments that we're proud of

We're extremely happy with the user feedback on the store location. A list of stores means less than a list of stores with attached locations. Another accomplishment we're proud of is the image upload and display. This was something that was very difficult to do. We also are proud of being able to get the distance between 2 points of longitude and latitude using the haversine formula. Finally, we're happy with the fact that we have a MVP in 24 hours.

## What we learned

As a team, we've gained valuable experience working with both backend and frontend web development, as well as delivering a solid pitch.

## What's next for Busy Watch

The only required feature missing in this demonstration version is the capability for user accounts. We'd want to set up authorization and account information for added personalization.
