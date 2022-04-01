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

 function getData(user, setUserData){
       console.log('hello world')

       if (navigator.onLine) {
            const indexedDB = window.indexedDB
            data.on('value',  function(snapshot){ 
                  console.log('hello data') 
                  var b = snapshot.child(user.uid).exists();                
                  if (b === true){
                        let obj = snapshot.val() 
                        setUserData(obj[user.uid])
                      
                        if(indexedDB){
                              console.log('hello true')
                              let swoouDB
                              const request = indexedDB.open('swoouData', 1)
                              
                              request.onsuccess = () => {
                                    swoouDB = request.result
                                    console.log(swoouDB)
                                    addData()
                              }
      
                              request.onupgradeneeded = (e) => {
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
                                    const request = objectStore.add(obj[user.uid])
                              }
                        }
                  } else {
                        dataTeachers.on('value', function(snapshot){  
                              var b = snapshot.child(user.uid).exists();
                              console.log('hello false')                
                              if (b === true){
                                    let obj = snapshot.val() 
                                    setUserData(obj[user.uid])
                              } else {
                                    setUserData(null)
                              }
                        })
                  } 
      
                  
            })
          } else {
            const indexedDB = window.indexedDB
         
            if(indexedDB){
            let swoouDB
            const request = indexedDB.open('swoouData', 1)


            request.onsuccess = () => {
                  swoouDB = request.result
                  console.log(swoouDB)
                  readData()
                  
            }
            // request.onupgradeneeded = (e) => {
            //       swoouDB = e.target.result
            //       const objectStore = swoouDB.createObjectStore('swoouData', {
            //             keyPath: 'uid'
            //       })     
            // }

            const readData = () => {
                  
                  const transaction = swoouDB.transaction(['swoouData'], 'readwrite')
                  const objectStore = transaction.objectStore('swoouData')
                  const request = objectStore.openCursor()

                  request.onsuccess = (e) => {
                        const cursor = e.target.result
                        if (cursor) {
                              setUserData(cursor.value)
                              cursor.continue()
                        }else{
                              console.log('no more data')
                        }}
                  
            
            }
          }}





}
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


function dataUser (aName, grade, school, avatar, cell, profesor, premium) {
      const name = auth.currentUser.displayName
      const uid = auth.currentUser.uid
      console.log(name, uid)
      db.ref(`users/${uid}`).set({
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
            date: null,
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
      })
}
function setDataTeachers (aName, grade, school, avatar, cell, profesor, premium) {
      const name = auth.currentUser.displayName
      const id = `${aName.split(' ')[0].toLowerCase()}${cell}`
      const uid = auth.currentUser.uid
      console.log(name, uid)
      db.ref(`teachers/${uid}`).set({
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
      })
      db.ref(`ids/${id}`).set({
            uid,
      })

}
function setProgress (n, account, op) {
      const us = account == true ? 'teachers' : 'users' 
      const uid = auth.currentUser.uid
      switch (op){
            case 's':
                  db.ref(`${us}/${uid}`).update({s: n,})
                  break;
            case 'r':
                  db.ref(`${us}/${uid}`).update({r: n,})
                  break;
            case 'm':
                  db.ref(`${us}/${uid}`).update({m: n,})
                  break;
            case 'd':
                  db.ref(`${us}/${uid}`).update({d: n,})
            default:
                  break;

      }
}
function setErrors (n, account, op) {
      const us = account == true ? 'teachers' : 'users' 
      const uid = auth.currentUser.uid
      switch (op){
            case 's':
                  db.ref(`${us}/${uid}`).update({es: n,})
                  break;
            case 'r':
                  db.ref(`${us}/${uid}`).update({er: n,})
                  break;
            case 'm':
                  db.ref(`${us}/${uid}`).update({em: n,})
                  break;
            case 'd':
                  db.ref(`${us}/${uid}`).update({ed: n,})
            default:
                  break;

      }
}

function avatarUpdate (n, account) {
      const us = account == true ? 'teachers' : 'users' 
      const uid = auth.currentUser.uid
      db.ref(`${us}/${uid}`).update({avatar: n,})
}
function progressReset (account, s, r, m, d, msg, acc) {
      const us = account == true ? 'teachers' : 'users' 
      const uid = auth.currentUser.uid
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
      if (us == 'users') {
            if(s == true){ db.ref(`${us}/${uid}`).update({s: 0, es: 0,}) }
            if(r == true){ db.ref(`${us}/${uid}`).update({r: 0, er: 0,}) }
            if(m == true){ db.ref(`${us}/${uid}`).update({m: 0, em: 0,}) }
            if(d == true){ db.ref(`${us}/${uid}`).update({d: 0, ed: 0,}) }
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
function playDificult (account, dificultObject) {
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
            db.ref(`${us}/${uid}`).update(dificultObject)
      }
}

function newStudent (uid) {
      db.ref(`users/${uid}`).update({nw : false})
}
function progressResetTeacher (mode) {
      console.log(mode)
      const uid = auth.currentUser.uid
      db.ref(`teachers/${uid}`).update({reset : mode})
}
export { query, progressResetTeacher, newStudent, playDificult, userDelete, auth, onAuth, withFacebook, withGoogle, handleSignOut, dataTeachers, dataUser, setDataTeachers, getIds, getProgress, getCode, avatarUpdate, progressReset, setProgress, setErrors }
