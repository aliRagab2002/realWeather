let form = document.getElementById('form1')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log(document.getElementById('input1').value)
    weatherFunction()
    form.reset()
})

let errorf =document.getElementById('error')
let locationf = document.getElementById('location')
let forecastF = document.getElementById('forecast')

const weatherFunction = async()=>{
    try{
        const address = document.getElementById('input1').value
        const url1 = await fetch('http://127.0.0.1:3000/weather?address='+address)
        const data = await url1.json()
        console.log(data)
        if(data.error){
            errorf.innerText = data.error
            locationf.innerText=""
            forecastF.innerText=""

        }
        else{
            locationf.innerText = data.location
            forecastF.innerText = data.forecast
            errorf.innerText =""
        }
    }
    catch(e)
    {
        console.log(e)

    }
}


