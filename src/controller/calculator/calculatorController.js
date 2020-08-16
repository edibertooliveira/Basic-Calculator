class calculatorController {

  //OBJECT FROM CALCULATOR
  constructor(calculatorRules, date, time, buttons){
    this._displayCalcElements = document.getElementById(calculatorRules);
    this._displayDataElements = document.getElementById(date);
    this._displayTimeElements = document.getElementById(time);
    this._clickButtons = document.querySelectorAll("#" + buttons + " [name]");
    this._audio = new Audio('./src/assets/sound/click.mp3');
    this._audioOnOff = false;
    this._lastOperator = '';
    this._lastNumber = '';
    this._operation = [];
    this._currentDate;
    this._locale = "pt-BR"
    this.DisplayNow();
    this.buttonsEvents();
    this.pressedKeyboard();
  }

  //DISPLAY INFORMATION
  DisplayNow(){
    setInterval(() =>{
      this.displayDate = this.currentDate.toLocaleDateString(this._locale);
      this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    },1000);
    this.setLastNumberToDisplay();
    this.pasteFromClipboard();

    document.querySelectorAll('.btn-ac').forEach(btn=>{
      btn.addEventListener('dblclick', e=>{
        this.toggleAudio();
      });
    });
  }
  //Audio
  toggleAudio(){
    this._audioOnOff = !this._audioOnOff;
  }

  playAudio(){
    if (this._audioOnOff){
      this._audio.currentTime = (0);
      this._audio.play();
    }
  }

  //BUTTONS CALCULATOR
  addEventListenerAll(element, events, fn){
    events.split(' ').forEach(event => {
      element.addEventListener(event, fn, false);
    });
  }

  clearAllDisplay(){
    this._operation = [];
    this._lastNumber = '';
    this._lastOperator = '';
    this.setLastNumberToDisplay();
  }

  clearEntry(){
    this._operation.pop();
    this.setLastNumberToDisplay();
  }
  setError(){
    this.displayCalc = "ERROR";
  }

  getLestOperation(){
    return this._operation[this._operation.length-1];
  }

  isOperator(value){
    return (['+','-','*','%','/'].indexOf(value) > -1);
  }

  setLastOperation(value){
    this._operation[this._operation.length-1] = value;
  }

  pushOperation(value){
    this._operation.push(value);
    if(this._operation.length > 3){
      this.calculatorRules()
    }
  }

  getResult(){
    try{
      return eval(this._operation.join(""));
    }catch(e){
      // console.log(e);
      setTimeout(() =>{
        this.setError();
      },500);
    
    }
  }

  calculatorRules(){
    let last;
    
    this._lastOperator = this.getLastItem();

    if (this._operation.length < 3){
      let firstItem = this._operation[0];
      this._operation = [firstItem, this._lastOperator, this._lastNumber];
    }

    if(this._operation.length > 3){

      last = this._operation.pop();
      this._lastNumber = this.getResult();

    }
    else if(this._operation.length == 3){
      this._lastNumber = this.getLastItem(false);

    }

    let result = this.getResult();

    if(last == '%'){
      result /= 100;
      this._operation = [result];
    }
    else{
      this._operation = [result];
      if(last) this._operation.push(last);
    }
    this.setLastNumberToDisplay();
  }

  getLastItem(isOperator = true){
    let lastItem;
    for(let i = this._operation.length-1; i >= 0; i--){
        if(this.isOperator(this._operation[i]) == isOperator){
          lastItem = this._operation[i];
          break;
        }
    }

    if(!lastItem){
      lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
    }
    return lastItem;
  }

  setLastNumberToDisplay(){
    let lastNumbers;
    for(let i = this._operation.length-1; i >= 0; i--){
      if(!this.isOperator(this._operation[i])){
        lastNumbers = this._operation[i];
        break;
      }
    }
    if(!lastNumbers) lastNumbers = 0;
    this.displayCalc = lastNumbers; 
  }

  // se for string
  addOperation(value){
    if (isNaN(this.getLestOperation())){
      // troca o operador
      if(this.isOperator(value)){
        this.setLastOperation(value);
      // se não add
      }else if(isNaN(value)){
        
      }else{
        this.pushOperation(value);
        this.setLastNumberToDisplay();
      }
    }else{
      if(this.isOperator(value)){
        this.pushOperation(value);
      }else{
        let newValue = this.getLestOperation().toString() + value.toString();
        this.setLastOperation(newValue);

        this.setLastNumberToDisplay();
      }
    }
  }

  addDot(){
    let lastOperation = this.getLestOperation();

    if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

    if(this.isOperator(lastOperation) || !lastOperation){
      this.pushOperation('0.');
    }else{
      this.setLastOperation(lastOperation.toString()+'.');
    }
    this.setLastNumberToDisplay();

  }

  execButton(value){
    this.playAudio();
    switch (value) {
      case 'Del':
        this.clearAllDisplay();
        break;
      case '+':
        this.addOperation('+');
        break;
      case '-':
        this.addOperation('-');
        break;
      case '/':
        this.addOperation('/');
        break;
      case 'x':
        this.addOperation('*');
        break;
      case '%':
        this.addOperation('%');
        break;
      case '=':
        this.calculatorRules();
        break;
      case '.':
        this.addDot();
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.addOperation(parseInt(value));
        break;
      
      default:
        this.setError();
        break;
    }
  }

  buttonsEvents(){

    this._clickButtons.forEach((btn, index) => {
      this.addEventListenerAll(btn, "click drag", e => {
        let numbersSymbols= btn.innerHTML;
        this.execButton(numbersSymbols);
      });

      this.addEventListenerAll(btn, "mouseover mouseup mousedown", e=>{
        btn.style.cursor = "pointer"
      });
    });
  }

  //init keyboard

  copyToClipboard(){
    let input = document.createElement('input');
    input.value = this.displayCalc;

    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy')
    input.remove();
  }

  pasteFromClipboard(){
    document.addEventListener('paste', e=>{
      let text = e.clipboardData.getData('text');

      this.displayCalc = parseFloat(text);
    });
  }

  pressedKeyboard(){

    document.addEventListener('keyup', e =>{
      this.playAudio();
      switch (e.key) {
        case 'Escape':
          this.clearAllDisplay();
          break;
        case ' ':
          this.clearEntry();
          break;
        case '+':
        case '-':
        case '*':
        case '/':
        case '%':
          this.addOperation(e.key);
          break;
        case 'Enter':
        case '=':
          this.calculatorRules();
          break;
        case '.':
        case ',':
          this.addDot();
          break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          this.addOperation(parseInt(e.key));
          break;
        case 'c':
          if (e.ctrlKey) this.copyToClipboard();
          break;
      }
    });
  }

//SHOWS DISPLAY VALUE
  get displayCalc(){
    return this._displayCalcElements.innerHTML;
  }
  //CHANGE DISPLAY VALUE
  set displayCalc(value){
    if(value.toString().length > 9){
      this.setError();
      return false;
    }
    this._displayCalcElements.innerHTML = value;
  }

  get displayDate(){
    return this._displayDataElements.innerHTML;
  }
  set displayDate(value){
    this._displayDataElements.innerHTML = value;
  }

  get displayTime(){
    return this._displayTimeElements.innerHTML;
  }
  set displayTime(value){
    this._displayTimeElements.innerHTML = value
  }

  get currentDate(){
    return new Date();
  }
  set currentDate(value){
    this._currentDate = value;
  }
}





