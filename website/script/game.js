$(function () {
	var replayName = getGET("replay");

	if(replayName != null && replayName != undefined) {
		var data = byteArrayFromURL(replayName, function(data) {
			console.log(data)
			if(data != null) {
				showGame(data, true);
			}	
		});
	} else {
		var $dropZone = $("<div class='col-md-12' id='dropZone'><h1>Drop a replay file here!</h1></div>");
		$("#pageContent").append($dropZone);

		$dropZone.on('dragover', function(e) {
			e.stopPropagation();
			e.preventDefault();
		});
		$dropZone.on('drop', function(e) {
			e.stopPropagation();
			e.preventDefault();
			var files = e.originalEvent.dataTransfer.files; // Array of all files
			for(var i=0, file; file=files[i]; i++) {
				console.log(file)
				var reader = new FileReader();

				reader.onload = function(e2) { // finished reading file data.
					$dropZone.remove();
					showGame(byteArrayToGame(new Uint8Array(e2.target.result)), true);
				};
				reader.readAsArrayBuffer(file); // start reading the file data.
			}
		});	
	}
})