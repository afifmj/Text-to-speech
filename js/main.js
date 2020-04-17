//SpeechSynth API

const synth = window.speechSynthesis;
 
//DOM selected elements

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector("#rate");
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');
// fetch the voices array

let voices = [];

//arrow function to get the voices

const getVoices = () => {
    voices = synth.getVoices();
    
    //loop through the voices and create an option for each one
    voices.forEach(voice =>{
        //create option element
        const option = document.createElement('option');
        
        //fill option will voice and lang
        option.textContent = voice.name + '(' + voice.lang + ')';

        //set needed option attributes
        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        voiceSelect.appendChild(option);
    });
};

getVoices();
//However, this function alone does not work for some reason, and the voices array remains empty.

//so we add this:
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
  }


  // making it speak
  const speak = () =>{

        
      //check if already speaking
      if(synth.speaking){
          console.error("Already speaking...");
          return;
      }
      if(textInput.value !== ''){
        
        //Add background pac man animation
        body.style.background = '#141414 url(../img/b2.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';

        //get speak text
          const speakText = new SpeechSynthesisUtterance(textInput.value);

          //speak end
          speakText.onend = e =>{
              console.log('Done Speaking...');
              body.style.background = '#141414';
          }
          
          //speak error
          speakText.onerror = e =>{
              console.error("Error...");
          }
          
          //selected voice for speaking by the user
          const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

          //loop through vocies until we get the users choice
          voices.forEach(voice =>{
              if(voice.name == selectedVoice){
                  speakText.voice = voice;
              }
          });

          //set pitch and rate
          speakText.rate = rate.value;
          speakText.pitch = pitch.value;

          //speak
          synth.speak(speakText);
      }
  };

  // event listeners

  // text from submit
  textForm.addEventListener('submit', e=>{
      e.preventDefault();
      speak();
      textInput.blur();
  });

  // Rate value change
  rate.addEventListener('change', e=> rateValue.textContent=rate.value);


  // Pitch value change
  pitch.addEventListener('change', e=> pitchValue.textContent=pitch.value);

  //voice select change
  voiceSelect.addEventListener('change',e => speak());
