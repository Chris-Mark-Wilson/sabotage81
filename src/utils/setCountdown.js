const setCountdown=()=>{
    if(count>=1) setTimeout(tickdown,1000)
  }
  
  const tickdown=()=>{
    
      if(count===1){
       
        boomTime([[bombX,bombY]])
      };
      count--;
      const bomb=document.getElementById("bomb")
      bomb.textContent=count;
      setCountdown()
  }
  export default setCountdown