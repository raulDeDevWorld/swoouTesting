import firebase from 'firebase/app'
import { firebaseConfig } from './config'
import 'firebase/auth'
import 'firebase/database'

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const providerFacebook = new firebase.auth.FacebookAuthProvider();
const providerGoogle = new firebase.auth.GoogleAuthProvider();

const db = firebase.database();
const data = firebase.database().ref('/users');
const premiumCode = firebase.database().ref('/premiumCode');
const dataTeachers = firebase.database().ref('/teachers');
const ids = firebase.database().ref('/ids')



function onAuth (setUserProfile, setUserData) { 
      return auth.onAuthStateChanged(function(user) {
      if (user) {
            setUserProfile(user)
            getData(user, setUserData)
      } else {
            setUserProfile(user)
      }
    })
}
  

// ---------------------------Login, Sign Up and Sign In------------------------------------

function withFacebook () {
      var sUsrAg = navigator.userAgent;

      if (( sUsrAg.indexOf("FBAN") > -1) || (sUsrAg.indexOf("FBAV") > -1 )) {
            alert("math.swoou.com utiliza tecnologías modernas que FACEBOOK NAVEGATOR no reconoce aun, por favor PRESIONE LOS TRES PUNTOS DEL LATERAL DERECHO Y ELIJA LA OPCIÓN ABRIR EN EL NAVEGADOR o intente directamente desde otro navegador o establezca otro navegador como prederterminado, gracias por su comprensión.");
            return
      }
      auth.signInWithPopup(providerFacebook).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
}

function withGoogle () {
      var sUsrAg = navigator.userAgent;

      if (( sUsrAg.indexOf("FBAN") > -1) || (sUsrAg.indexOf("FBAV") > -1 )) {
            alert("math.swoou.com utiliza tecnologías modernas que FACEBOOK NAVEGATOR no reconoce aun, por favor PRESIONE LOS TRES PUNTOS DEL LATERAL DERECHO Y ELIJA LA OPCIÓN ABRIR EN EL NAVEGADOR o intente directamente desde otro navegador o establezca otro navegador como prederterminado, gracias por su comprensión.");
            return
      }
      auth.signInWithPopup(providerGoogle).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
}

function handleSignOut() {
      auth.signOut().then(function() {
            // Sign-out successful.
      }).catch(function(error) {
            // An error happened.
      });     
}

//----------------------------Data Register------------------------------

function dataUser (aName, grade, school, avatar, cell, profesor, premium) {
      const name = auth.currentUser.displayName
      const uid = auth.currentUser.uid
      const userDB = {
            name,
            aName,
            grade,
            school,
            avatar,
            progress: 0,
            errors: 0,
            premium,
            cell,
            profesor,
            id: null,
            play: 0,
            robot: 0,
            date: Date(),
            s: 0,
            r: 0,
            m: 0,
            d: 0,
            es: 0,
            er: 0,
            em: 0,
            ed: 0,
            uid,
            sumaConfig: 99,
            restaConfig: 99,
            multiplicacionConfig: 10,
            divisionConfig: 10,
      }
      createIndexedDB(userDB)
      return db.ref(`users/${uid}`).set(userDB)
      
}
function setDataTeachers (aName, grade, school, avatar, cell, profesor, premium) {
      const name = auth.currentUser.displayName
      const id = `${aName.split(' ')[0].toLowerCase()}${cell}`
      const uid = auth.currentUser.uid
      const userDB = {
            name,
            aName,
            grade,
            school,
            avatar,
            progress: 0,
            errors: 0,
            premium,
            cell,
            profesor,
            id,
            date: Date(),
            s: 0,
            r: 0,
            m: 0,
            d: 0,
            es: 0,
            er: 0,
            em: 0,
            ed: 0,
            reset: true,
            uid,
            sumaConfig: 99,
            restaConfig: 99,
            multiplicacionConfig: 10,
            divisionConfig: 10,
            students: {
                        '5zgXJdzyyxYTUvBbHMaJNndA65m1':'5zgXJdzyyxYTUvBbHMaJNndA65m1',
                        'FnPD0SoqAqa7HZbaXUhVqNy0aTh2':'FnPD0SoqAqa7HZbaXUhVqNy0aTh2'
            }
      }
      createIndexedDB(userDB)
      db.ref(`ids/${id}`).set({uid,})
      return db.ref(`teachers/${uid}`).set(userDB)
      
}

//----------------------------------Data Manage---------------------------------

 function getData(user, setUserData){
       const indexedDB = window.indexedDB
       if (navigator.onLine) {
            data.on('value',  function(snapshot){ 
                  var b = snapshot.child(user.uid).exists();                
                  if (b === true){
                        let obj = snapshot.val() 
                        setUserData(obj[user.uid])
                        if(indexedDB){
                           dataCompare(obj[user.uid])
                        }
                  }else{
                        dataTeachers.on('value', function(snapshot){  
                              var b = snapshot.child(user.uid).exists();               
                              if (b === true){
                                    let obj = snapshot.val() 
                                    setUserData(obj[user.uid])
                                    if(indexedDB){
                                          dataCompare(obj[user.uid])
                                    }
                              } else {
                                    setUserData(null)
                              }
                        })
                  }    
            })
          } else {
            if(indexedDB){
            let swoouDB
            const request = indexedDB.open('swoouData', 1)
            request.onsuccess = () => {
                  swoouDB = request.result
                  console.log(swoouDB)
                  readData()
            }
            const readData = () => {
                  const transaction = swoouDB.transaction(['swoouData'], 'readwrite')
                  const objectStore = transaction.objectStore('swoouData')
                  const request = objectStore.get(auth.currentUser.uid)
                  
                  request.onsuccess = () => {
                        request ? setUserData(request.result) : console.log('no data')
                  }
            }
          }
      }
}

function createIndexedDB(userDB) {
      const indexedDB = window.indexedDB
      if(indexedDB){
            let swoouDB
            const request = indexedDB.open('swoouData', 1)
             request.onsuccess =  (e)  => {
                  swoouDB =  e.target.result 
                  addData()                
            }
            request.onupgradeneeded = (e) => {
                  console.log(e.target.result)
                  swoouDB = e.target.result
                  const objectStore = swoouDB.createObjectStore('swoouData', {
                        keyPath: 'uid'
                  })     
            }       
            request.onerror = (err) => {
                  console.log(err)
            }
            const addData = () => {
                  const transaction = swoouDB.transaction(['swoouData'], 'readwrite')
                  const objectStore = transaction.objectStore('swoouData')
                  const request = objectStore.add(userDB)
            }
      }
}


function dataCompare(firebaseDB) {
      const indexedDB = window.indexedDB
      if(indexedDB){
      let swoouDB
      const request = indexedDB.open('swoouData', 1)

      request.onsuccess = async (e) => {
            swoouDB = e.target.result
            transactionDataCompare ()
      }

      request.onupgradeneeded = (e) => {
            console.log(e.target.result)
            swoouDB = e.target.result
            const objectStore = swoouDB.createObjectStore('swoouData', {
                  keyPath: 'uid'
            })     
      }  
      const addData = () => {
            const transaction = swoouDB.transaction(['swoouData'], 'readwrite')
            const objectStore = transaction.objectStore('swoouData')
            const request = objectStore.add(firebaseDB)
      }

      function transactionDataCompare () {
            const transaction = swoouDB.transaction(['swoouData'], 'readwrite')
            const objectStore = transaction.objectStore('swoouData')
            const requestObjectStore = objectStore.get(auth.currentUser.uid)
            requestObjectStore.onsuccess = () => {
                  const IDB = requestObjectStore.result
                  if ( IDB == undefined ) {
                        addData()
                  } else {
                  const dateIDB = requestObjectStore.result.date
                  if(dateIDB > firebaseDB.date){   
                  db.ref(`users/${auth.currentUser.uid}`).update({...firebaseDB, ...requestObjectStore.result})
                  }else{
                        const objectStoreUpdate = objectStore.put(firebaseDB)
                        objectStoreUpdate.onsuccess = () => {
                             
                        }
                        objectStoreUpdate.onerror = (e) => {
                              console.log(e)
                        }
                  }  
                  }
            }
      }
      }
}

//----------------------------Teacher Data Progress---------------------------

function getProgress (setStudentsProgress, uid ){
      dataTeachers.on('value', function(snapshot){  
            var b = snapshot.child(`${uid}/students`).exists(); 
            if (b === true){
                  const array = []
                  snapshot.child(`${uid}/students`).forEach(function(childSnapshot) { 
                        db.ref(`/users/${childSnapshot.key}`).once('value', function(userSnapshot){
                              const valName = userSnapshot.child('aName').val()
                              const s = userSnapshot.child('s').val()
                              const r = userSnapshot.child('r').val()
                              const m = userSnapshot.child('m').val()
                              const d = userSnapshot.child('d').val()
                              const es = userSnapshot.child('es').val()
                              const er = userSnapshot.child('er').val()
                              const em = userSnapshot.child('em').val()
                              const ed = userSnapshot.child('ed').val()
                              const nw = userSnapshot.child('nw').val()
                              const userUid = userSnapshot.child('uid').val()
                              const obj = {
                                    name: valName,
                                    s,
                                    r,
                                    m,
                                    d,
                                    es,
                                    er,
                                    em,
                                    ed,
                                    nw,
                                    userUid
                              }
                             array.push(obj)
                          }) 
                   })
                   console.log(array)
                   setStudentsProgress(array)
              
            } else {
                   setStudentsProgress(null)
            }
      })
}
  
//------------------------Student Data Progress---------------------------------

function setProgress (n, account, op, setUserData) {

      const us = account == true ? 'teachers' : 'users' 
      const uid = auth.currentUser.uid

            let swoouDB
            const request = indexedDB.open('swoouData', 1)
      
            request.onsuccess = () => {
                  swoouDB = request.result
                  transactionProgressUpdate ()
            }
            function transactionProgressUpdate () {
                  const transaction = swoouDB.transaction(['swoouData'], 'readwrite')
                  const objectStore = transaction.objectStore('swoouData')
                  const requestObjectStore = objectStore.get(auth.currentUser.uid)
                  requestObjectStore.onsuccess = () => {

                        switch (op){
                  
                              case 's':
                                    var newDB = {s: n, date: Date()}
                                    navigator.onLine ? db.ref(`${us}/${uid}`).update(newDB) : ''
                                    objectStore.put({...requestObjectStore.result, ...newDB})
                                    setUserData({...requestObjectStore.result, ...newDB}) 
                                    break;
                              case 'r':
                                    var newDB = {r: n, date: Date()}
                                    navigator.onLine ? db.ref(`${us}/${uid}`).update(newDB) : ''
                                    objectStore.put({...requestObjectStore.result, ...newDB})
                                    setUserData({...requestObjectStore.result, ...newDB}) 
                                    break;
                              case 'm':
                                    var newDB = {m: n, date: Date()}
                                    navigator.onLine ? db.ref(`${us}/${uid}`).update(newDB) : ''
                                    objectStore.put({...requestObjectStore.result, ...newDB})
                                    setUserData({...requestObjectStore.result, ...newDB}) 
                                    break;
                              case 'd':
                                    var newDB = {d: n, date: Date()}
                                    navigator.onLine ? db.ref(`${us}/${uid}`).update(newDB) : ''
                                    objectStore.put({...requestObjectStore.result, ...newDB})
                                    setUserData({...requestObjectStore.result, ...newDB}) 
                              default:
                                    break;
                        }
                  }
            }

}

function setErrors (n, account, op, setUserData) {
      const us = account == true ? 'teachers' : 'users' 
      const uid = auth.currentUser.uid

            let swoouDB
            const request = indexedDB.open('swoouData', 1)
      
            request.onsuccess = () => {
                  swoouDB = request.result
                  transactionProgressUpdate ()
            }
            function transactionProgressUpdate () {
                  const transaction = swoouDB.transaction(['swoouData'], 'readwrite')
                  const objectStore = transaction.objectStore('swoouData')
                  const requestObjectStore = objectStore.get(auth.currentUser.uid)
                  requestObjectStore.onsuccess = () => {

                        switch (op){
                  
                              case 's':
                                    var newDB = {es: n, date: Date()}
                                    navigator.onLine ? db.ref(`${us}/${uid}`).update(newDB) : ''
                                    objectStore.put({...requestObjectStore.result, ...newDB})
                                    setUserData({...requestObjectStore.result, ...newDB}) 
                                    break;
                              case 'r':
                                    var newDB = {er: n, date: Date()}
                                    navigator.onLine ? db.ref(`${us}/${uid}`).update(newDB) : ''
                                    objectStore.put({...requestObjectStore.result, ...newDB})
                                    setUserData({...requestObjectStore.result, ...newDB}) 
                                    break;
                              case 'm':
                                    var newDB = {em: n, date: Date()}
                                    navigator.onLine ? db.ref(`${us}/${uid}`).update(newDB) : ''
                                    objectStore.put({...requestObjectStore.result, ...newDB})
                                    setUserData({...requestObjectStore.result, ...newDB}) 
                                    break;
                              case 'd':
                                    var newDB = {ed: n, date: Date()}
                                    navigator.onLine ? db.ref(`${us}/${uid}`).update(newDB) : ''
                                    objectStore.put({...requestObjectStore.result, ...newDB})
                                    setUserData({...requestObjectStore.result, ...newDB}) 
                              default:
                                    break;
                        }
                  }
            }
}



//----------------------------Updates Config------------------------------------



function avatarUpdate (n, account,setUserData) {

      const us = account == true ? 'teachers' : 'users' 
      const uid = auth.currentUser.uid

      let swoouDB
      const request = indexedDB.open('swoouData', 1)

      request.onsuccess = () => {
            swoouDB = request.result
            transactionProgressUpdate ()
      }


      function transactionProgressUpdate () {
            const transaction = swoouDB.transaction(['swoouData'], 'readwrite')
            const objectStore = transaction.objectStore('swoouData')
            const requestObjectStore = objectStore.get(auth.currentUser.uid)
            requestObjectStore.onsuccess = () => {
                              var newDB = {avatar: n, date: Date()}
                              navigator.onLine ? db.ref(`${us}/${uid}`).update(newDB) : ''
                              objectStore.put({...requestObjectStore.result, ...newDB})
                              setUserData({...requestObjectStore.result, ...newDB}) 
            }
      }
}


function perfilUpdate (aName, grade, school, cell, profesor, setUserData) {
      const us = profesor == true ? 'teachers' : 'users' 
      const uid = auth.currentUser.uid
      let swoouDB
      const request = indexedDB.open('swoouData', 1)

      request.onsuccess = () => {
            swoouDB = request.result
            transactionProgressUpdate ()
      }

      function transactionProgressUpdate () {
            const transaction = swoouDB.transaction(['swoouData'], 'readwrite')
            const objectStore = transaction.objectStore('swoouData')
            const requestObjectStore = objectStore.get(auth.currentUser.uid)
            requestObjectStore.onsuccess = () => {
                  const newDB = {
                        aName,
                        grade,
                        school,
                        cell,
                        date: Date(),
                  }
                  
                  navigator.onLine ? db.ref(`${us}/${uid}`).update(newDB) : ''
                  objectStore.put({...requestObjectStore.result, ...newDB})
                  setUserData({...requestObjectStore.result, ...newDB}) 
            }
      }      
}


function progressReset (account, s, r, m, d, msg, acc, setUserData) {
      const us = account == true ? 'teachers' : 'users' 
      const uid = auth.currentUser.uid


      let swoouDB
      const request = indexedDB.open('swoouData', 1)

      request.onsuccess = () => {
            swoouDB = request.result
            transactionProgressUpdate ()
      }
      function transactionProgressUpdate () {
            const transaction = swoouDB.transaction(['swoouData'], 'readwrite')
            const objectStore = transaction.objectStore('swoouData')
            const requestObjectStore = objectStore.get(auth.currentUser.uid)
            requestObjectStore.onsuccess = () => {

                  if (us == 'users') {
                        const newIDB = {
                              s: s == true ? 0 :requestObjectStore.result.s , es: s == true ? 0 :requestObjectStore.result.es ,
                              r: r == true ? 0 :requestObjectStore.result.r , er: r == true ? 0 :requestObjectStore.result.er ,
                              m: m == true ? 0 :requestObjectStore.result.m , em: m == true ? 0 :requestObjectStore.result.em ,
                              d: d == true ? 0 :requestObjectStore.result.d , ed: d == true ? 0 :requestObjectStore.result.ed ,  
                              date: Date()
                        }
                        if(s == true){ 
                              var newDB = {s: 0, es: 0, date: Date()}
                              navigator.onLine ? db.ref(`${us}/${uid}`).update(newDB) :'' 
                              objectStore.put({...requestObjectStore.result, ...newIDB})
                         
                        }
                        if(r == true){
                              var newDB = {r: 0, er: 0, date: Date()}
                              navigator.onLine ? db.ref(`${us}/${uid}`).update(newDB) :'' 
                              objectStore.put({...requestObjectStore.result, ...newIDB})
                     
                              }
                        if(m == true){
                              var newDB = {m: 0, em: 0, date: Date()}
                              navigator.onLine ? db.ref(`${us}/${uid}`).update(newDB) :'' 
                              objectStore.put({...requestObjectStore.result, ...newIDB})
                     
                              }
                        if(d == true){
                              var newDB = {d: 0, ed: 0, date: Date()}
                              navigator.onLine ? db.ref(`${us}/${uid}`).update(newDB) :'' 
                              objectStore.put({...requestObjectStore.result, ...newIDB})
                              
                              }
                        setUserData({...requestObjectStore.result, ...newIDB})

                  }
            }
      }

      if (us == 'teachers') { 
            db.ref(`${us}/${uid}/students`).once('value', function(snapshot){
                  snapshot.forEach(function(childSnapshot) {
                        if(s == true){ db.ref(`users/${childSnapshot.key}`).update({s: 0, es: 0,}) }
                        if(r == true){ db.ref(`users/${childSnapshot.key}`).update({r: 0, er: 0,}) }
                        if(m == true){ db.ref(`users/${childSnapshot.key}`).update({m: 0, em: 0,}) }
                        if(d == true){ db.ref(`users/${childSnapshot.key}`).update({d: 0, ed: 0,}) }
                  });
            });
        
      }

      if (us == 'teacher' && msg == 'unity') {
            if(s == true){ db.ref(`users/${acc}`).update({s: 0, es: 0,}) }
            if(r == true){ db.ref(`users/${acc}`).update({r: 0, er: 0,}) }
            if(m == true){ db.ref(`users/${acc}`).update({m: 0, em: 0,}) }
            if(d == true){ db.ref(`users/${acc}`).update({d: 0, ed: 0,}) }
      }
     
}



function userDelete (userUid) {
    
      const uid = auth.currentUser.uid
      db.ref(`${'/teachers'}/${uid}/students/${userUid}`).remove()
      db.ref(`${'/users'}/${userUid}`).update({id: 'Te ha eliminado'})

}


function playDificult (account, dificultObject, setUserData) {
      const us = account == true ? 'teachers' : 'users' 
      const uid = auth.currentUser.uid
      if (us == 'teachers') { 
            db.ref(`${us}/${uid}/students`).once('value', function(snapshot){
                  snapshot.forEach(function(childSnapshot) {
                  db.ref(`${'/users'}/${childSnapshot.key}`).update(dificultObject)
                  });
            });
            db.ref(`${us}/${uid}`).update(dificultObject)

      }


      if (us == 'users') { 

            const us = account == true ? 'teachers' : 'users' 
            const uid = auth.currentUser.uid
      
            let swoouDB
            const request = indexedDB.open('swoouData', 1)
      
            request.onsuccess = () => {
                  swoouDB = request.result
                  transactionProgressUpdate ()
            }
            
            function transactionProgressUpdate () {
                  const transaction = swoouDB.transaction(['swoouData'], 'readwrite')
                  const objectStore = transaction.objectStore('swoouData')
                  const requestObjectStore = objectStore.get(auth.currentUser.uid)
                  requestObjectStore.onsuccess = () => {
                        const newDB = {
                              ...dificultObject,
                              date: Date(),
                        }
                        
                        navigator.onLine ? db.ref(`${us}/${uid}`).update(newDB) : ''
                        objectStore.put({...requestObjectStore.result, ...newDB})
                        setUserData({...requestObjectStore.result, ...newDB}) 
                  }
            }    

            
      }
}





function progressResetTeacher (mode) {
      console.log(mode)
      const uid = auth.currentUser.uid
      db.ref(`teachers/${uid}`).update({reset : mode})
}






//----------------------------Estudent Register Teacher ID------------------------



function query(id, setTeacherId, userUid, name, setUserSuccess, setAlert ){
      ids.on('value', function(snapshot){  
            var b = snapshot.child(id).exists(); 
            if (b === true){
                  const val = snapshot.child(`${id}`).child('uid').val()
                  db.ref(`teachers/${val}`).once('value', function(userSnapshot){
                        const reset = userSnapshot.child('reset').val()
                        reset == true ? setAlert(true) : getIds(id, setTeacherId, userUid, name, setUserSuccess, true)
                  })
            } else {
                  setTeacherId(false)
                  setUserSuccess(false)

            }
      })
}

function getIds(id, setTeacherId, userUid, name, setUserSuccess, mode){
      ids.on('value', function(snapshot){  
            var b = snapshot.child(id).exists();     
            if (b === true){
                  const val = snapshot.child(`${id}`).child('uid').val()
                  db.ref(`teachers/${val}`).once('value', function(userSnapshot){
                        const sumaConfig= userSnapshot.child('sumaConfig').val()
                        db.ref(`users/${userUid}`).update({ sumaConfig,})
                  })
                  db.ref(`teachers/${val}`).once('value', function(userSnapshot){
                        const restaConfig= userSnapshot.child('restaConfig').val()
                        db.ref(`users/${userUid}`).update({ restaConfig,})
                  })
                  db.ref(`teachers/${val}`).once('value', function(userSnapshot){
                        const multiplicacionConfig= userSnapshot.child('multiplicacionConfig').val()
                        db.ref(`users/${userUid}`).update({ multiplicacionConfig,})
                  })
                  db.ref(`teachers/${val}`).once('value', function(userSnapshot){
                        const divisionConfig= userSnapshot.child('divisionConfig').val()
                        db.ref(`users/${userUid}`).update({ divisionConfig,})
                  })

                  db.ref(`teachers/${val}`).once('value', function(userSnapshot){
                        const reset = userSnapshot.child('reset').val()
                        reset == true && mode == true 
                        ? db.ref(`users/${userUid}`).update({ 
                              s: 0,
                              r: 0,
                              m: 0,
                              d: 0,
                              es: 0,
                              er: 0,
                              em: 0,
                              ed: 0,
                       })
                       :''
                  })

                  let uidTeacher = snapshot.child(id).child('uid').val()
                  db.ref(`teachers/${uidTeacher}/students/${userUid}`).set({ 
                         name,
                  })
                  db.ref(`users/${userUid}`).update({ 
                        id,
                        nw: true,
                 })
                  setTeacherId(uidTeacher)
                  setUserSuccess(true)
            
            } else {
                  setTeacherId(false)
                  setUserSuccess(false)

            }
      })
}

 

//------------------------------Premium Config-------------------------------
function getCode(code, uid, setUserSuccess, account){
      premiumCode.once('value', function(snapshot){  
            var b = snapshot.child(code).exists();                
            if (b === true ){
                  var val = snapshot.child(code).val();
                  if(val == false) {
                        const us = account == true ? 'teachers' : 'users' 
                        db.ref(`/premiumCode/${code}`).set(true)
                        db.ref(`/${us}/${uid}/premium`).set(code)
                        setUserSuccess(true)
                  }else{
                        console.log('ya esta en uso')
                        setUserSuccess(false)
                  }
            } else {
               console.log('no exist')
               setUserSuccess(false)
            }
      })
}














function newStudent (uid) {
      db.ref(`users/${uid}`).update({nw : false})
}
export { perfilUpdate, dataCompare, query, progressResetTeacher, newStudent, playDificult, userDelete, auth, onAuth, withFacebook, withGoogle, handleSignOut, dataTeachers, dataUser, setDataTeachers, getIds, getProgress, getCode, avatarUpdate, progressReset, setProgress, setErrors }
