
function ThemeSolar(){
  const selector = document.querySelector('body');
  const confirm = document.querySelector('.theme-confirm');

  selector.classList.add('solar-theme'),
  confirm.classList.add('theme-ok');
  confirm.classList.remove('theme-confirm');
  
}

function ThemeLunar(){
  
  const selector = document.querySelector('body');
  const confirm = document.querySelector('.theme-confirm');

  selector.classList.add('lunar-theme');
  confirm.classList.add('theme-ok');
  confirm.classList.remove('theme-confirm');
}