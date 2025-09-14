$(document).ready(function(){
    
    
    
    var $pitches = ["A", "A#", "B", "C",
		"C#", "D", "D#", "E",
		    "F", "F#", "G", "G#",
		    "Bb", "Db", "Eb", "Gb", "Ab"];

    var $sevenths = ["7", "m7", "^", "add9"];    
    var $quali = ["dim7", "dim", "sus", "sus2", "aug"];

    function die(sides){
	return Math.floor(Math.random() * ((sides - 1) + 1) + 1);
    }

    function getSeventhChord()  {
	var pitch = $pitches[die($pitches.length) - 1];
	var seventh = $sevenths[die($sevenths.length) - 1];
	return pitch.concat(seventh);
    }
    
    var rotate = function() {
	    $('span#pitch-left').text($('span#pitch-center').text());
	    $('span#pitch-center').text($('span#pitch-right').text());	
	$('span#pitch-right').text(getItem());
    };
   
    var getPitch = function(){
	$i = Math.floor(Math.random() * $pitches.length);
	return $pitches[$i];
    };
    
    
    var getBasicChord = function() {
	$chord = (getPitch)();
	if( Math.random() > .5){
	    $chord = $chord.concat("m");
	}	
	return $chord;
    };


    var getExtendedChord = function() {
	if( Math.random() > .6 ){
	    return getSeventhChord();;
	}	
	$chord = (getPitch)();
	$dice = Math.floor(Math.random() * 7); 
	if( Math.random() > .5){
	    $chord = $chord.concat("m");
	}
	return $chord;
    };


    var getAllChord = function() {
	if( Math.random() > .75 ){
	    return getSeventhChord();;
	}	
	$chord = (getPitch)();
	if( Math.random() > .5){
	    $chord = $chord.concat("m");
	} else {
	    var q = $quali[die($quali.length) -1];
	    return $chord.concat(q);
	} 
	if( Math.random() > .8 ){
	    return $chord.concat("7");
	}
	
	return $chord;
    };




    var modes = [
	getPitch,
	getBasicChord,
	getExtendedChord,
	getAllChord
    ];
    
    var mode = 0;

    function getItem() {
	return (modes[mode])();
    }



    

    console.log("starting...");	
    $('span#pitch-right').text(getItem());
    $('span#pitch-center').text(getItem());
    $('span#pitch-left').text(getItem());

    var $BPM = 120;

    function tempo() {
	return 1000*60*4/$BPM;
    }
    
    var myFunction = function() {
	console.log("rotate...");	
	(rotate)();
	setTimeout(myFunction, tempo());
    }
    setTimeout(myFunction, tempo());




    $( "#speed" ).selectmenu({
	change: function( event, ui ) {
	    mode = ui.item.index;
	    console.log(ui.item.index);
	}
    });


    var handle = $( "#custom-handle" );
    $( "#slider" ).slider({
	max: 200,
	min: 10,
	value: $BPM,
	change: function( event, ui ) {
	    $BPM = ui.value;
	},
	create: function() {
	    handle.text( $( this ).slider( "value" ) );		     
	},
	slide: function( event, ui ) {
	    handle.text( ui.value );
	}
    });
    
});
