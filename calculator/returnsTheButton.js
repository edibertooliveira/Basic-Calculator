class Buttons {

  constructor (selector) {
    this._calculator = document.querySelectorAll("#" + selector + " [name]");
    this.returnsTheButton();
  }

  returnsTheButton(){

    this._calculator.forEach((field) =>{
    
      field.addEventListener('click', ()=>{
      
        switch (field.name){
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
            console.log (field.name)
            break;
          case '+':
            console.log (field.name)
            break;
          case '-':
            console.log (field.name)
            break;
          case '*':
            console.log (field.name)
            break;
          case '/':
            console.log (field.name)
            break;
          case '=':
            console.log (field.name)
            break;
          case 'delete':
            console.log (field.name)
            break;
          case '%':
            console.log (field.name)
            break;
          case '.':
            console.log (field.name)  
            break;    
        }
      });
    });
  }
}




