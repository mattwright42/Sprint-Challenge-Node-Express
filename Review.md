# Review Questions

1 - What is Node.js?

    Node.js is a runtime environment used to execute JavaScript applications outside of the browser. This is important because prior to Node, programmers were limited to using C, C++, Java, Python, and other programming languages. It also makes it much easier for code to be shared between the client and the server.

2 - What is Express?

    Express is a framework that adds extra functionality (middleware and routing support) to Node.js - like React, except for the backend.

3 - Mention two parts of Express that you learned about this week.

    We used Express to access middleware (functions that get and operate on objects - like logging and security); we also used routing to break the application into smaller parts for cleaner code and subapplications.

4 - What is Middleware?

    Middleware are functions that get executed in the order they are introduced into the server code. Middleware can be built-in, third party, or custom depending on what is needed. An example of built-in middleware would be "server.use(express.json())", which we used to add support for parsing JSON content out of the request body. An example of third party middleware is cors, which allows for browser/server interaction. Custom middleware is anything that adds functionality that we need which isn't included from Express. We used it this week in the demo code to create a 'gatekeeper' function.

5 - What is a Resource?

    A Resource is part of the REST architectural style. It is the key abstratction of information. A Resource is accessible via a unique URI, and can have multiple representations.

6 - What can the API return to help clients know if a request was successful?

    A request should be followed up with a response, which is the data sent to the client.

7 - How can we partition our application into sub-applications?

    One effective method for this is to break apart your application into single URLs per resource, and executing different code base on the method used. Applications can also be broken into sub-applications based on their CRUD method.

8 - What is express.json() and why do we need it?

    express.json() replaces body-parser, and it adds support for parsing JSON content outside of the request body.
