function startPage(){


  var selectors = ["upper-left", "top", "upper-right", "left", "lower-left", "bottom", "lower-right", "right"];
  
  var audio = {
    "upper-left": "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    "top": "http://soundbible.com/mp3/Realistic_Punch-Mark_DiAngelo-1609462330.mp3",
    "upper-right": "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    "left": "http://soundbible.com/mp3/fire_bow_sound-mike-koenig.mp3",
    /*
    'right': "http://soundbible.com/mp3/glass_ping-Go445-1207030150.mp3",
    */
    "right": "http://soundbible.com/mp3/A-Tone-His_Self-1266414414.mp3",
    'lower-left': "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    'bottom': "http://soundbible.com/mp3/Blop-Mark_DiAngelo-79054334.mp3",
    'lower-right': "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
    /*
    'wrong': "http://soundbible.com/mp3/gentex_cammander_3_code_3_horn-Brandon-938131891.mp3"
    */
    'wrong': "http://soundbible.com/mp3/Annoying_Alarm_Clock-UncleKornicob-420925725.mp3"
  }
  
  var sequence = [];
  
  function getNext() {
    var pos = (Math.floor(Math.random() * 8));
    sequence.push(selectors[pos]);
  }
  
  var checkInd = 0;
  var strict = false
  
  function playGame(id) {
    if (displaySequence === false) {
      if (sequence[checkInd] == id) {
        if (checkInd + 1 == 20) {
          resetAll();
          customAlert();
        }
        $("#middle").text((checkInd + 1).toString());
        checkInd += 1;
      } else {
        $("#middle").text("!!");
        noise("wrong");
        resetLightUp();
        playBoth();
        if (strict == true) {
          $("#middle").text("!!");
          $("#middle").css('font-size', "50px")
          resetAll();
          $("#middle").text("Reset");
          restricted();
        }
      }
    }
  }
  
  function restricted() {
    if (strict == false) {
      strict = true;
      $("#middle").css("background-color", "black")
      $("#middle").css("color", "white");
      $("#middle").css('font-size', "50px")
    } else {
      strict = false;
      $("#middle").css("background-color", '#EEF7FA');
      $("#middle").css("color", "black");
    }
  }
  
  $(".quad, .rectangles").not("#middle").on("click", function() {
    if (displaySequence === false) {
      var id = $(this).attr("id");
      playGame(id);
      if (checkInd == sequence.length) {
        getNext();
        playBoth();
      }
    }
  });
  
  $(".quad, .rectangles").not("#middle").on('click', function() {
    var id = $(this).attr("id");
    noise(id);
  })
  
  $("#middle").click(function() {
    $("#middle").text("");
    $("#middle").css("font-size", "50px");
    if (strict == true) {
      resetAll();
      restricted();
    } else {
      resetAll();
    }
    startGame();
    playBoth();
  });
  
  var startSequence;
  var seqInd = 0;
  
  function lightUp(id) {
    var formattedId = "#" + id;
    $(formattedId).text((seqInd + 1).toString());
    /* By Ian Agpawa */
    $(formattedId).fadeTo(400, 0.1, function() {
      $(formattedId).fadeTo(400, 1);
      $(formattedId).text("");
    });
  }
  
  function noise(id) {
    var thing = "<audio preload='auto' id='now'><source src='" + audio[id] + "' type='audio/mp3'></audio>"
    $("#music").append(thing);
    $("#now")[0].play();
    var time = setTimeout(function() {
      $("#now")[0].pause();
      $("#now")[0].currentTime = 0;
      clearTimeout(time);
      $("#now").remove();
    }, 400);
    if (seqInd == sequence.length) {
      $("#middle").text("GO")
      clearInterval(startSequence);
      clearInterval(startSoundSequence)
      resetLightUp();
    }
  }
  
  var current;
  
  function sequenceSound() {
    current = sequence[seqInd];
    noise(current);
    seqInd += 1;
  }
  
  function sequenceLight() {
    current = sequence[seqInd];
    lightUp(current);
  }
  
  var displaySequence = true;
  var startSoundSequence;
  
  function playSequence() {
    startSequence = setInterval(function() {
      sequenceLight();
    }, 800);
  
  }
  
  function playSoundSequence() {
    startSoundSequence = setInterval(function() {
      sequenceSound();
    }, 800);
  }
  
  function playBoth() {
    displaySequence = true;
    playSequence();
    playSoundSequence();
  }
  
  function resetLightUp() {
    seqInd = -1;
    checkInd = 0;
    displaySequence = false;
  }
  
  function startGame() {
    getNext();
    $("#middle").text("");
    $("#middle").css('font-size', "50px");
  }
  
  $("#reset").on("click", function() {
    $("#reset").fadeTo(300, 0.1, function() {
      $("#reset").fadeTo(300, 1);
    });
    resetAll();
  });
  
  function resetAll() {
    sequence = [];
    checkInd = 0;
    clearInterval(startSequence);
    clearInterval(startSoundSequence);
    displaySequence = true;
    seqInd = 0;
    strict = false;
    $("#middle").text("Click here");
    $("#middle").css("font-size", "30px");
    $("#diag-overlay").css('display', 'none');
    $("#diag-box").css('display', 'none');
    $("#middle").css('background-color', '#EEF7FA');
    $("#middle").css("color", "black");
    $("#win").stop();
  };
  
  function customAlert() {
    var winH = ($(window).height()).toString();
    var diagOverlay = $("#diag-overlay");
    var diagBox = $("#diag-box");
    diagOverlay.css("display", "block");
    diagOverlay.css("height", winH + "px");
    diagBox.css("margin-top", "150px");
    diagBox.css('display', "block");
    $("#diag-box-head").text("GAME OVER");
    $("#play-again").on('click', function() {
      resetAll();
    })
    $("#diag-box-body").text("YOU BEAT THE GAME!");
    $("#win")[0].play();
  }
  
  $("#strict").on("click", function() {
    restricted();
  })

}

$(document).ready(startPage);
$(document).on('page:load', startPage);