$(document).ready(function(){
    
    

    // Constant declarations
    
    const $pitches = ["A", "A#", "B", "C",
		"C#", "D", "D#", "E",
		    "F", "F#", "G", "G#",
		    "Bb", "Db", "Eb", "Gb", "Ab"];

    const $sevenths = ["7", "m7", "^", "add9"];    
    const $quali = ["dim7", "dim", "sus", "sus2", "aug"];


    

    // Utility functions
    

    function die(sides){
	return Math.floor(Math.random() * ((sides - 1) + 1) + 1);
    }



    
    // Chord construction functions

    
    function getSeventhChord()  {
	var pitch = $pitches[die($pitches.length) - 1];
	var seventh = $sevenths[die($sevenths.length) - 1];
	return pitch.concat(seventh);
    }


    const rotate = function() {
	$('span#pitch-left').text($('span#pitch-center').text());
	$('span#pitch-center').text($('span#pitch-right').text());	
	$('span#pitch-right').text(getItem());
	metronomeClicks();
    };
   
    const getPitch = function(){
	$i = Math.floor(Math.random() * $pitches.length);
	return $pitches[$i];
    };
    
    
    const getBasicChord = function() {
	$chord = (getPitch)();
	if( Math.random() > .5){
	    $chord = $chord.concat("m");
	}	
	return $chord;
    };


    const getExtendedChord = function() {
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


    const getAllChord = function() {
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





    const modes = [
	getPitch,
	getBasicChord,
	getExtendedChord,
	getAllChord
    ];
    
    var mode = 0;

    function getItem() {
	return (modes[mode])();
    }



    

    $('span#pitch-right').text(getItem());
    $('span#pitch-center').text(getItem());
    $('span#pitch-left').text(getItem());

    var $BPM = 120;

    function getBPMms() {
	return 1000*60/$BPM;
    }

    function tempo() {
	return getBPMms() * 4;
    }

    var audio = new Audio('click.wav');
    var metronomeON = 0;

    var metronomeIO = $( "#metronomeIO" ).button();

    $( "#metronomeIO" ).on( "click", function() {
	if( metronomeON == 0 ) {
	    metronomeON = 1;
	} else {
	    metronomeON = 0;
	}
    });




    function metronomeClicks() {
	console.log();
	if( metronomeON == 1 ) {
	    var ms = getBPMms();
	    try {
		audio.play();
		for (let i = 1; i < 4; i++) {
		    setTimeout(function(){
			audio.play();
		    }, ms * i);
		}
	    } catch(err) {}
	}
    }

    
    var myFunction = function() {
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
