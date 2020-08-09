class calculatorController {

  constructor(object, date, time, value){
    this._buttons = document.querySelectorAll("#" + object + " [name]");
    this._inputCurrent = document.getElementById(value);
    this._dataDisplay = document.getElementById(date);
    this._timeDisplay = document.getElementById(time);
    this._currentDate;
    this._valueCurrent = 0;
    this.EventClickButton();
    this.DisplayCurrent();
    console.dir(this._valueCurrent);
  }
 

  //DISPLAY IN LIVE
  DisplayCurrent(){

    setInterval(() => {
      // this.DataDisplay = this.CurrentDate.toLocaleDateString();
      // this.TimeDisplay = this.CurrentDate.toLocaleTimeString();
      this.InputCurrent = this._valueCurrent;
    }, 500);
  }

  // SETTERS AND GETTERS

  set InputCurrent(value){
    this._inputCurrent.innerHTML = value;
  }

  get InputCurrent(){
    this._inputCurrent.innerHTML;
  }

  set DataDisplay(value){
    this._dataDisplay.innerHTML = value;
  }

  get DataDisplay(){
    return this._dataDisplay.innerHTML;
  }


  set TimeDisplay(value){
    this._timeCurrent.innerHTML = value;
  }

  get TimeDisplay(){
    return this._timeCurrent.innerHTML;
  }


  // TODO: DATE AND TIME CURRENT

  set CurrentDate(value){
    this._currentDate.innerHTML = value;
  }

  get CurrentDate(){
    return new Date();
  }

  //? BUTTON EVENTS

  EventClickButton(){
    let buttons = this._buttons;
    let clicked;
    buttons.forEach((event) => {
      event.addEventListener('click',(button) => {  
        clicked = this.ReturnYouFunction(button.currentTarget.name);
      });
    })
    console.log(clicked);
  }

  ReturnYouFunction(field){    
  switch (field){
    case '1':
    case '2':    
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '0':
      this._valueCurrent = field;
      break;
    case '+':
  
      break;
    case '-':
    
      break;
    case '*':
  
      break;
    case '/':
    
      break;
    case '=':
    
      break;
    case 'delete':
    
      break;
    case '%':
      
      break;
    case '.':
        
      break;    
   }
  }
}
