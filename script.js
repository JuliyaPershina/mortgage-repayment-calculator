const wrappers = document.querySelectorAll('.input-wrapper');
const resultsEmpty = document.getElementById('resultsEmpty');
const resultsCompleted = document.getElementById('resultsCompleted');


//підсвітка полів input
wrappers.forEach((wrapper) => {
    const input = wrapper.querySelector('input');
    
    console.log(input.validity);
    
  const errorMessage = wrapper.querySelector('input+.error-message');

  input.addEventListener('focus', () => {
    wrapper.classList.add('focused');
    wrapper.classList.remove('errored');
    errorMessage.classList.remove('error-message-errored');

      input.addEventListener('blur', () => {
          const errorText = getValidationError(input);
          console.log(errorText);
          
        
      console.log(input.value);
      wrapper.classList.remove('focused');
      if (errorText) {
        wrapper.classList.add('errored');
        errorMessage.classList.add('error-message-errored');
      }
    //   if (isTextErrore(input)) {
    //     wrapper.classList.add('errored');
    //     errorMessage.classList.add('error-message-errored');
    //   }
    });
  });

  document.getElementById('clear-all').addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.getElementById('mortgage-form');
    form.reset();
    resultsCompleted.classList.add('displayNone');
    resultsEmpty.classList.remove('displayNone');
    wrapper.classList.remove('errored');
    errorMessage.classList.remove('error-message-errored');
  });


  function isTextErrore(input) {
      // return input.value.trim() === '';
      return errorText === true;
    }
    

    // Валідація
    
    function getValidationError(input) {
        const v = input.validity;
    
        if (v.valueMissing) return 'Це поле обовʼязкове';
        if (v.rangeUnderflow) return `Мінімальне значення — ${input.min}`;
        if (v.rangeOverflow) return `Максимальне значення — ${input.max}`;
        return '';
    }
});


// Розрахунок Repayment

function calculateRepayment(amount, termYears, annualRate) {
  const n = termYears * 12;
  const r = annualRate / 100 / 12;
  const numerator = amount * r * Math.pow(1 + r, n);
  const denominator = Math.pow(1 + r, n) - 1;
  const monthlyPayment = numerator / denominator;
  const totalRepayment = monthlyPayment * n;
  return {
    monthlyPayment: +monthlyPayment.toFixed(2),
    totalPaid: +totalRepayment.toFixed(2),
  };
}

// Розрахунок Interest Only

function calculateInterestOnly(amount, termYears, annualRate) {
  const n = termYears * 12;
  const r = annualRate / 100 / 12;
  const monthlyPayment = amount * r;
  const totalPaid = monthlyPayment * n;
  return {
    monthlyPayment: +monthlyPayment.toFixed(2),
    totalPaid: +totalPaid.toFixed(2),
  };
}

// Обираємо тип розрахунку

function checkMortageType() {
  const calculateButton = document.querySelector('.submit');
  calculateButton.addEventListener('click', (e) => {
    e.preventDefault();
    resultsCompleted.classList.remove('displayNone');
    resultsEmpty.classList.add('displayNone');
    const mortageType = document.querySelector(
      'input[type="radio"]:checked'
    ).id;
    const amount = +document.getElementById('amount').value;

    const termYears = +document.getElementById('term').value;
    const annualRate = +document.getElementById('rate').value;

    let calculations;

    if (mortageType === 'repayment') {
      calculations = calculateRepayment(amount, termYears, annualRate);
    } else {
      calculations = calculateInterestOnly(amount, termYears, annualRate);
    }
    document.getElementById(
      'monthly-repayment'
    ).textContent = `£${calculations.monthlyPayment}`;
    document.getElementById(
      'total-repayment'
    ).textContent = `£${calculations.totalPaid}`;
    console.log(calculations.monthlyPayment, calculations.totalPaid);
  });
}
checkMortageType();
