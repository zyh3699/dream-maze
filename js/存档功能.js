var curlife
var curattack
var curdefend
curlife=localStorage.getItem('temp')
curattack=localStorage.getItem('attack')
curdefend=localStorage.getItem('defend')
function save(){
    var tempurl
    tempurl=window.location.href
    localStorage.setItem('tempurl',tempurl)
    window.location.href="../选择档位页面.html"
}