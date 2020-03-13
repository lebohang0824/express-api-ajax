describe("Testing express api end points", () => {

	const axios = require('axios');
	const visitor = {
		name: 'John Blues',
		age: 19,
		date_of_visit: '1/8/2000',
		time_of_visit: '12:00:00',
		assistant: 'Lebohang Mokoena',
		comments: 'No Comment'
	}
	const updatedVisitor = {
		name: 'Jonas Singer Blue',
		age: 19,
		date_of_visit: '1/8/2000',
		time_of_visit: '12:00:00',
		assistant: 'Lebohang Mokoena',
		comments: 'What a wonderful time.'
	}

	let visitor_id;
		
	it('Should add new visitor', async () => {
		const res = await axios.post('http://127.0.0.1:3000/add-new-visitor', visitor);

		objVisitor = res.data.visitor;
		visitor_id = objVisitor.id;

		expect(res.data.status).toBe('ok');
		expect(objVisitor.id).toEqual(visitor_id);
		expect(objVisitor.name).toEqual(visitor.name);
		expect(objVisitor.age).toEqual(visitor.age);
		expect(new Date(objVisitor.date_of_visit)).toEqual(new Date(visitor.date_of_visit));
		expect(objVisitor.time_of_visit).toEqual(visitor.time_of_visit);
		expect(objVisitor.assistant).toEqual(visitor.assistant);
		expect(objVisitor.comments).toEqual(visitor.comments);
	});

	it('Should view visitors', async () => {
		const res = await axios.get('http://127.0.0.1:3000/view-visitors');

		objVisitor = res.data.visitor;

		expect(res.data.status).toBe('ok');
		expect(res.data.visitors).not.toBe([]);
	});
		
	it('Should delete visitor', async () => {
		const res = await axios.delete(`http://127.0.0.1:3000/delete-visitor/${visitor_id}`);

		objVisitor = res.data.visitor;

		expect(res.data.status).toBe('ok');
		expect(res.data.visitors).not.toEqual([]);
	});

});

describe("Testing express api ajax dom manipulation", () => {
	const jsdom = require('jsdom'),
		  html  = require('./html');
		
	const visitor = {
		name: 'John Blues',
		age: 19,
		date_of_visit: '1/8/2000',
		time_of_visit: '12:00:00',
		assistant: 'Lebohang Mokoena',
		comments: 'No Comment'
	}

	beforeEach(() => {
		dom      = new jsdom.JSDOM(html);
	  	window = dom.window;
	  	document = window.document;

	  	fetch = require("node-fetch");
	  	main  = require('../public/js/main');
	});

	let visitor_id;

	// onSubmit form simulator
	const onSubmit = form => {
		form.addEventListener('onFormSubmit', e => {
	     	;
	  	});

	  	const e = new dom.window.Event("onFormSubmit");

	  	form.dispatchEvent(e);
   	}

   	it('Should add new visitor', async () => {
   		const form = document.forms[0];

   		const res = await main.submitForm(visitor);
   		const row  = document.getElementById(`visitor-${res.visitor.id}`);

   		visitor_id = res.visitor.id;

   		expect(res.visitor.id.toString()).toEqual(row.childNodes[0].innerHTML);
   		expect(res.visitor.name).toEqual(row.childNodes[1].innerHTML);
   		expect(res.visitor.age.toString()).toEqual(row.childNodes[2].innerHTML);
   		expect(new Date(res.visitor.date_of_visit).toLocaleDateString()).toEqual(row.childNodes[3].innerHTML);
   		expect(res.visitor.time_of_visit).toEqual(row.childNodes[4].innerHTML);
   		expect(res.visitor.assistant).toEqual(row.childNodes[5].innerHTML);
   		expect(res.visitor.comments).toEqual(row.childNodes[6].innerHTML);
   	});

   	it('Should remove visitor', async () => {

   		main.deleteTableRow(visitor_id);
   		const row = document.getElementById(`visitor-${visitor_id}`);

   		expect(row).toBeNull();
   	});
});