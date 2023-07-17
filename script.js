document.getElementById("btn").addEventListener("click",function(params) {
    var city=document.getElementById("city").value
    const url=`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=cf65d0c5f5cfffb9e7c92e59ec5e2e80`
    document.getElementById("invalid").style.display="none"
    document.getElementById("menu").style.display="none"
    fetch(url).then((val)=>{
        return val.json()
    }).then((value)=>{
        console.log(value)
        var lat=value[0]["lat"]
        var lon=value[0]["lon"]
        console.log(lat, lon)
        const t_url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cf65d0c5f5cfffb9e7c92e59ec5e2e80`
        fetch(t_url).then((valueJ)=>{
            return valueJ.json()
        }).then((tvalue)=>{
            console.log(tvalue)
            console.log(tvalue["main"]["temp"])
            console.log(tvalue["weather"][0]["main"])
            document.getElementById("load").className="spinner-grow text-warning"
            document.getElementById("menu").style.display="none"
            setTimeout(() => {
                show()
            }, 2000);
            function show(params) {
                document.getElementById("load").className=""
                document.getElementById("menu").style.display="block"
                document.getElementById("weather").innerText=tvalue["weather"][0]["main"]
                document.getElementById("temp").innerText=Math.round(tvalue["main"]["temp"]-273)
                document.getElementById("feels_like").innerText=Math.round(tvalue["main"]["feels_like"]-273)
                document.getElementById("humid").innerText=tvalue["main"]["humidity"]
                if(value[0]["state"])
                document.getElementById("state").innerHTML=value[0]["state"]
                else
                document.getElementById("state").innerText=""
                document.getElementById("count").innerHTML=value[0]["country"]
            
            }
        })
    }).catch(()=>{
        document.getElementById("invalid").style.display="block"
        document.getElementById("invalid").innerText="🚫Invalid Input🚫"
    })

})

document.getElementById("reset").addEventListener("click",function (params) {
    document.getElementById("temp").innerText=""
    document.getElementById("city").value=""
    document.getElementById("menu").style.display="none"
    document.getElementById("invalid").style.display="none"
})