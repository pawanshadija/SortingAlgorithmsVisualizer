window.onload = function(){
	canvas = document.getElementById('visual');
	height = canvas.height;
	width = canvas.width;
	var slider = document.getElementById('myRange');
	document.getElementById("array_size").innerHTML = slider.value; 
	slider.oninput = function() {
		document.getElementById("array_size").innerHTML = slider.value;
		Shuffle();
	}
	Shuffle();
}

function Shuffle() {
	var array_size = document.getElementById("array_size").innerHTML;
	var lines = [];
	for(i = 0 ; i < array_size ; i++){
		var upto = Math.floor(Math.random() * height);
		lines.push(upto);
	}
	draw(lines, 255, 255);
}

function draw(array, color1, color2) {
  	if (canvas.getContext) {
  		array_size = parseInt(document.getElementById("array_size").innerHTML);
  		//alert(array_size);
    	var ctx = canvas.getContext('2d');
		var width = (canvas.width - array_size)/array_size;
		var currX = 0;
		ctx.clearRect(0, 0, canvas.width, canvas.height);	
    	for(var i = 0; i < array.length; i++){
			if(i == color1){
    			ctx.fillStyle = '#FE0000';
    		}else if (i == color2){
    			ctx.fillStyle = '#0BFF01';
    		}else{
    			ctx.fillStyle = 'black';
    		}
			var h = array[i];
			ctx.fillRect(currX, canvas.height - (h), width, h);
			currX += width + 1;
		}
  	}
  	document.getElementById("array").innerHTML = array.toString();
}

function Sort(){
	array = document.getElementById("array").innerHTML.split(",").map(Number);
	speed = document.getElementById('speed').value;
	algorithm = document.getElementById('algorithm').value;
	disable_elements();
	if (algorithm == "bubbleSort") {
		var sort = bubbleSort(array);
	}else if (algorithm == "selectionSort") {
		var sort = selectSort(array);
	}else if (algorithm == "insertionSort") {
		var sort = insertSort(array);
	}else if (algorithm == "shellSort") {
		var sort = shellSort(array);
	}
	function anim(ar){
		sort.next(); // call next iteration of the bubbleSort function
		setTimeout(calling, speed);
	}
	function calling(){
		anim(array);
	}
	calling();
}

function* bubbleSort(array){
	document.getElementById("time").innerHTML = "-";
	var start_time = new Date().getTime();
	var swapped;
		do{
    	swapped = false;
    	for (var i = 0; i < array.length - 1; i++) {
      		if (array[i] > array[i + 1]) {
        		var temp = array[i];
        		array[i] = array[i + 1];
        		array[i + 1] = temp;
			draw(array, i , i+1);
        		swapped = true;
        		yield swapped; // pause here
      		}
    	}
  	} while (swapped);
  	var end_time = new Date().getTime();
  	document.getElementById("time").innerHTML = ((end_time - start_time)/1000);
  	enable_elements();
}

function* selectSort(array){
	document.getElementById("time").innerHTML = "-";
	var start_time = new Date().getTime();
	var min;
    var i = 0;
	do{
        min = i;
        //check the rest of the array to see if anything is smaller
        for (j=i+1; j < array.length; j++){
            if (array[j] < array[min]){
                min = j;
            } 
        }
         //if the minimum isn't in the position, swap it
        if (i != min){
            var temp = array[i];
        	array[i] = array[min];
        	array[min] = temp;
        }
	    draw(array, min, i);
        i++;
        yield i; // pause here
    }while(i < array.length);
    var end_time = new Date().getTime();
  	document.getElementById("time").innerHTML = ((end_time - start_time)/1000);
    enable_elements();
}

function* insertSort(array){
	document.getElementById("time").innerHTML = "-";
	var start_time = new Date().getTime();
	var key;
	var i = 1;
	do{
		key = array[i];
		j = i-1;
		while(j >= 0 && array[j] > key){
			array[j+1] = array[j];
			j--;
		}
		array[j+1] = key;
		draw(array, i, j+1);
		i++;
		yield i;
	}while(i < array.length);
	var end_time = new Date().getTime();
  	document.getElementById("time").innerHTML = ((end_time - start_time)/1000);
	enable_elements();
}

function* shellSort(array){
	document.getElementById("time").innerHTML = "-";
	var start_time = new Date().getTime();
	var n = array.length;
	var count = array.length;
	for(var gap = Math.floor(count/2); gap > 0; gap = Math.floor(gap/2)){
		var i = gap;
	 	do{
			var temp = array[i];
			j = i;
			while(j >= gap){
				if(array[j-gap] > array[j]){
					array[j] = array[j-gap];
					array[j-gap] = temp;
				}else{
					break;
				}
				draw(array,j,j-gap);
				j = j - gap;
				yield j;
			}
			i++;
	 	}while(i < count);
	}
	var end_time = new Date().getTime();
  	document.getElementById("time").innerHTML = ((end_time - start_time)/1000);
	enable_elements();
}

function disable_elements() {
	document.getElementById("sort").disabled = true;
	document.getElementById("shuffle").disabled = true;
	document.getElementById('algorithm').disabled = true;
	document.getElementById('speed').disabled = true;
	document.getElementById('myRange').disabled = true;
}

function enable_elements() {
	document.getElementById("sort").disabled = false;
	document.getElementById("shuffle").disabled = false;
	document.getElementById('algorithm').disabled = false;
	document.getElementById('speed').disabled = false;
	document.getElementById('myRange').disabled = false;
}
