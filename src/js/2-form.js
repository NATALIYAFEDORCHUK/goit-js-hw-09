const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTexttarea = form.querySelector('textarea[name="message"]');

loadFormData();

form.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);

function handleInput(event) {
  const { name, value } = event.target;

  formData[name] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function handleSubmit(event) {
  event.preventDefault();
  const { email, message } = formData;

  if (email.trim() === '' || message.trim() === '') {
    alert('Fill please all fields');
    return;
  }
  console.log('Form submitted with data:', formData);
  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
  formData.email = '';
  formData.message = '';
}

function loadFormData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const data = JSON.parse(saved);
    if (data.email) {
      emailInput.value = data.email;
      formData.email = data.email;
    }
    if (data.message) {
      messageTexttarea.value = data.message;
      formData.message = data.message;
    }
  } catch (error) {
    console.error('Error parsing saved form data:', error);
  }
}
