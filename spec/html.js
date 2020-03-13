const html = `
<!DOCTYPE html>
<html>
<head>
	<title>Express Application</title>
	<link rel="stylesheet" type="text/css" href="../public/css/style.css">
</head>
<body>

	<div class="container">
		<div class="header">
			<h1>VISITORS FORM</h1>
		</div>
		<form id="form" class="body" action="/add-new-visitor" method="post" autocomplete="off">
			<div class="group">
				<input type="text" name="name" placeholder="Visitors Name">
			</div>
			<div class="group">
				<input type="text" name="age" placeholder="Visitors Age">
			</div>
			<div class="group">
				<input type="date" name="date_of_visit" placeholder="Date of visit">
			</div>
			<div class="group">
				<input type="time" name="time_of_visit" placeholder="Time of visit">
			</div>
			<div class="group">
				<input type="text" name="assistant" placeholder="Assisted By">
			</div>
			<div class="group">
				<textarea name="comments" placeholder="Comments"></textarea>
			</div>
			<button>Submit</button>
		</form>		
        <div class="output">
            <table class="table">
            	<thead>
            		<tr>
	            		<th>ID</th>
	            		<th>Visitor</th>
	            		<th>Age</th>
	            		<th>Date</th>
	            		<th>Time</th>
	            		<th>Assistant</th>
	            		<th>Comments</th>
	            		<th>&nbsp;</th>
	            	</tr>
            	</thead>
            	<tbody id="visitors">
            	</tbody>
            </table>
        </div>
	</div>

	<script type="text/javascript" src="../public/js/main.js"></script>
</body>
</html>`;

module.exports = html;