var firebaseConfig = {
    apiKey: "AIzaSyDzIG6rbthWZooQWDGCIg7DcywFREzP5G0",
    authDomain: "covid-website-d8044.firebaseapp.com",
    databaseURL: "https://covid-website-d8044-default-rtdb.firebaseio.com",
    projectId: "covid-website-d8044",
    storageBucket: "covid-website-d8044.appspot.com",
    messagingSenderId: "1069605992231",
    appId: "1:1069605992231:web:4bba803d1b509112bb9b02"
  };
  firebase.initializeApp(firebaseConfig);
  var UserInputsRef=firebase.database().ref('UserInputs')   
  document.getElementById('testForm').addEventListener('submit',submitForm);
  function submitForm(e){     
    e.preventDefault();     
    var fname =getInputVal('firstname');     
    var lname =getInputVal('lastname');     
    var mobile =getInputVal('mobile');     
    var state =getInputVal('state');
    readState(state);
    var email =getInputVal('email');     
    var emailstatus=validateEmail();     
    var profession =getInputVal('profession');     
    var dateofbirth =getInputVal('dateofbirth');     
    var symptomsList =getSelectedCheckboxValues('symptoms');     
    var selectedOption = document.querySelector('input[name = option]:checked').value;     
    /* function call to store data values in firebase     after email id validation  */    
     if(emailstatus)     
     saveMessages(lname+ " " +fname,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList); 
    }
     /* function to check if email id entered by user is valid */
      function validateEmail()  {  
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(testForm.email.value))   {     
          return (true)   
        }     
          alert("You have entered an invalid email address!")    
          return (false) 
        }
    function saveMessages(name,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList){     
       var newuserInputsRef = UserInputsRef.push();     
       newuserInputsRef.set({
      name:name,
      mobile:mobile,
      email:email,
      profession:profession,
      dateofbirth:dateofbirth,
      state:state,
      selectedOption:selectedOption,
      symptomsList:symptomsList
      })
      alert("Thank You, Find a testing center nearby");
    }
    /* function to accept state value as parameter, read database  to return and display center details on web page */ 
    function readState(state){    
       var centers;     
       var ref = firebase.database().ref(state);     
       ref.on('value', (data) => {      
       centers = data.val();      
       document.getElementById("result").innerHTML ="<br>"+centers.toUpperCase();
       })}

     /* function to return input values as per the id passed as parameter */ 
    function getInputVal(id){
        return document.getElementById(id).value; }
        /* function to return value(s) of selcted checkboxes */ 
    function getSelectedCheckboxValues(name) {     
      const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);    
       let values = [];     
       checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
           });     
      return values; }



