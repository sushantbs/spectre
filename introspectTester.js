// Tests to run

var 

// typeof === 'object'
obj0 = null,

obj1 = {
	key1: "This is a string",
	key2: 2,
	key3: null
},

obj2 = {
	key1: function () {
		console.log("obj2.key1");
	},
	key2: [1, 2, 3, 4],
	key3: obj1
},

obj3 = {
	key1: [],
	key2: new Class1(),
	key3: {
		key1: new Class3(),
		key2: function () {
			console.log("obj3.key3.key2");
		}
	}
},

// shit gets real now
obj4 = {
	key1: [
		function () { console.log("obj4.key1.0"); },
		function () { console.log("obj4.key2.1"); }
	],
	what: {
		key1: obj3.key2.objmethod1(),
		key2: function () { console.log("obj4.what.key2"); obj3.key3.key2(); },
		key3: function () { console.log("obj4.what.key3"); obj3.key3.key2(); }
	}
},

// Test Classes
Class1 = function () {
	this.objmethod1 = function () {
		console.log("Class1.objmethod1");
	};
},

Class2 = function () {

	this.objmethod1 = function () {
		console.log("Class2.objmethod1");
	};

	this.objmethod2 = function () {
		console.log("Class2.objmethod2");
	};

	this.objmethod3 = function () {
		console.log("Class2.objmethod3");
		obj4.key1[1]();
	};

},

Class3 = function () {
// continue

},

Class4 = function () {

},

Class5 = function () {

},

options = {

};


// Establish Inheritances
Class1.prototype = new Class2();
Class1.prototype.constructor = Class1;

Class3.prototype = new Class2();
Class3.prototype.constructor = Class3;


// Introspect targets

// Run test code

// Introspect more targets

// Run more test code

// Fuck! No more please!!!

// Arrrrrrrgggghhhhhhhhhh!

// Note: This has been a productive 1hr. I'm going to so enjoy sleeping tonight. 




