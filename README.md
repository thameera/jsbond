# JS Bond

Simple two-way data binding library for the browser.

## Install

* With npm: `npm install jsbond`
* With bower: `bower install jsbond`
* Or just download the bond.js file to your project.

## Usage

Include bond.js:

    <script src="bond.js"></script>

JavaScript:

    var city = Bond('city');
    city.set('Colombo');

    console.log( city.get() );

    // Optional initial value
    var gender = Bond('gender', 'Male');
    console.log( gender.get() );

HTML:

    <input type="text" data-bond="city">
    <div>City is <span data-bond="city"></span></div>

    <select data-bond="gender">
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
    </select>

