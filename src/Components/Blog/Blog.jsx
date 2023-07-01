import React from 'react';
import useTitle from '../../Hooks/UseHook';

const Blog = () => {
    useTitle('Bolg')
  return (
    <div>
      <h1 className="mt-5 mb-6 text-5xl font-bold text-amber-500">
        Q/A
      </h1>
      <div className="mt-10 mb-6 shadow-2xl card lg:card-side bg-base-100 text-start">
        <figure>
          <img src="https://placeimg.com/400/400/arch?t=1666876542203" alt="Album" />
        </figure>
        <div className="card-body">
          <h1 className="card-title text-slate-600">What are the different ways to manage  a state in react application?</h1>
          <p className=" w-96">
           To manage a React app properly, there are primarily 4 sorts of state: Local, global, server, URL, and global states are listed in that order. Local (UI) state - The data we handle in one or more components is referred to as local state. The useState hook is most frequently used in React to handle it. Global (UI) state - Data that we manage across several components is referred to as global state. It is required if we wish to obtain and change data throughout our app's various components, if not everywhere. Server state: Information that originates from an outside server and needs to be merged with our UI state. Although it is a straightforward idea, managing it with all of our local and global UI state can be challenging. URL state: Information about our URLs, such as the pathname and query.
          </p>

        </div>
      </div>

      <div className="mb-6 shadow-2xl card lg:card-side text-start bg-base-100">
        <figure>
          <img src="https://placeimg.com/400/400/arch" alt="Album" />
        </figure>
        <div className="card-body">
          <h1 className="card-title text-slate-600">
         How does prototypical inheritance work?
          </h1>
          <p className=" w-96">
            Prototypal Inheritance is a Javascript feature that allows you to add methods and properties to objects. It is a method that allows one object to inherit the properties and methods of another. Object. getPrototypeOf and Object. setPrototypeOf have traditionally been used to get and set the [[Prototype]] of an object.
          </p>

        </div>
      </div>

      <div className="mb-6 shadow-2xl card lg:card-side text-start bg-base-100">
        <figure>
          <img src="https://placeimg.com/400/400/arch?t=1666876542203" alt="Album" />
        </figure>
        <div className="card-body">
          <h1 className="card-title text-slate-600">
           What is a unit tests? why do we write unit tests?
          </h1>
          <p className=" w-96">
            Unit testing is a software testing method in which "units"—individual software components—are tested. Unit tests are written by developers to ensure that their code works properly. This aids in the detection and prevention of bugs in the future.
          </p>

        </div>
      </div>

      <div className="mb-6 shadow-2xl card lg:card-side text-start bg-base-100">
        <figure>
          <img src="https://placeimg.com/400/400/arch?t=1666876542203" alt="Album" />
        </figure>
        <div className="card-body">
          <h1 className="card-title text-slate-600">React vs Angular vs Vue</h1>
          <p className=" w-96">
            Vue is more customizable and thus easier to learn than Angular or React. Furthermore, Vue shares functionality with Angular and React, such as the use of components. As a result, 
          </p>

        </div>
      </div>
    </div>
  );
};

export default Blog;
