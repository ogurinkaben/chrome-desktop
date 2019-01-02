function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
  function check() {
    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = h + ":" + m ;
      document.getElementById("date").innerHTML=today.toLocaleDateString("en-US", options);
    t = setInterval(function() {
      check()
    }, 60000);
  }
  
  check();
  var time = new Date();
  var ch = time.getHours();
  if (ch >= 18 && ch <=23) {
    document.getElementById("msg").innerHTML="Having a sublime night?";
  }
  else if (ch >= 12 && ch < 18) {
      document.getElementById("msg").innerHTML="Having a good day?";
  } 
  else {
    document.getElementById("msg").innerHTML="Good Morning";
}
