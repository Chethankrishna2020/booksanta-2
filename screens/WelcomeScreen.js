import React, { Component } from 'react';
import * as firebase from 'firebase'
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Alert,Modal, ScrollView,KeyboardAvoidingView } from 'react-native';
import db from "../config";

export default class WelcomeScreen extends Component {

      constructor (){
        super();
        this.state = {
            email:"",
            password:"",
            firstName:"",
            lastName:"",
            address:"",
            mobileNumber:"",
            confirmPassword:"",
            isModalVisible:false,
        }
          }
  render(){

    return(

    <View style = {styles.container}>
      <View style = {{justifyContent:'center',alignItems:'center'}}>
      </View>
      {this.showModal()}
        <Text style = {styles.title}>
            WelcomeScreen
        </Text>  
        <View>
        <TextInput style = {styles.loginBox}
            placeholder = "example@example.com"
            keyboardType = "email-address"
            onChangeText = {(text)=>{
                this.setState({
                    email:text
                })
            }}>
            
            </TextInput>
            <TextInput style = {styles.loginBox}
            placeholder = "enter password"
            secureTextEntry = {true}
            onChangeText = {(text)=>{
                this.setState({
                    password:text
                })
            }}>
            
            </TextInput>
            <TouchableOpacity style = {styles.loginButton} 
                    onPress = {()=>{
                        this.login(this.state.email,this.state.password);
                    }}>
                        <Text style = {{textAlign:"center"}}>
                            log in
                        </Text>
                    </TouchableOpacity>

            <TouchableOpacity style = {styles.loginButton} 
                    onPress = {()=>{
                      this.setState({isModalVisible:true})
                    }}>
                        <Text style = {{textAlign:"center"}}>
                            sign up
                        </Text>
                    </TouchableOpacity>
        </View> 
    </View>

    )

  }
  userSignUp = (emailId, password,confirmPassword) =>{
    if(password !== confirmPassword){
        return Alert.alert("password doesn't match\nCheck your password.")
    }else{
      firebase.auth().createUserWithEmailAndPassword(emailId, password)
      .then(()=>{
        db.collection('users').add({
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          contact:this.state.mobileNumber,
          email_id:this.state.email,
          address:this.state.address,
        })
        return  Alert.alert(
             'User Added Successfully',
             '',
             [
               {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
             ]
         );
      })
      .catch((error)=> {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
      });
    }
  }
login = async(email,password)=>{
  if (email && password) {
      try{
          const response = await firebase.auth().
          signInWithEmailAndPassword(email,password)
          console.log("response success");
          if(response){
           console.log("user successfullu logged in");
           this.props.navigation.navigate("DonateBooks")
           return Alert.alert("successfully logged in");
          }
        }
        catch(error){
          switch (error.code) {
            case 'auth/user-not-found':
              Alert.alert("user dosen't exists")
              console.log("doesn't exist")
              break
            case 'auth/invalid-email':
              Alert.alert('incorrect email or password')
              console.log('invaild')
              break
          }
        }

  }else {console.log("please enter email and password")}
}
showModal = ()=>{
  return(
  <Modal
    animationType="fade"
    transparent={true}
    visible={this.state.isModalVisible}
    >
    <View style={styles.modalContainer}>
      <ScrollView style={{width:'100%'}}>
        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
        <Text
          style={styles.modalTitle}
          >Registration</Text>
        <TextInput
          style={styles.formTextInput}
          placeholder ={"First Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              mobileNumber: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Email"}
          keyboardType ={'email-address'}
          onChangeText={(text)=>{
            this.setState({
              email: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Confrim Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              confirmPassword: text
            })
          }}
        />
        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={()=>
              this.userSignUp(this.state.email, this.state.password, this.state.confirmPassword)
            }
          >
          <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={()=>this.setState({"isModalVisible":false})}
          >
          <Text style={{color:'#ff5722'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  </Modal>
)
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,

    },
    loginButton:{
        alignItems:'center',
        alignSelf:'center',
        height:30,
        width:90,
        borderWidth:1,
        marginTop:20,
        borderRadius:10,
        paddingTop:5,
    },
    title:{
      paddingBottom:30,
      fontSize:65,
      fontWeight:"bold",
      color:"black",

    },
    modalContainer:{
      flex:1,
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"yellow",
      marginTop:80,
      marginBottom:80,
      marginLeft:30,
      marginRight:30,
    },
    modalTitle:{
      fontSize:30,
      justifyContent:"center",
      alignSelf:"center",
      color:"orange",
      margin:50,
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10
    },
    modalBackButton:{
      width:200,
      height:40,
      alignItems:'center',
      justifyContent:'center',
      borderWidth:1,
      borderRadius:10,
      marginTop:30
    },
    registerButton:{
        width:200,
        height:40,
        alignItems:'center', 
        justifyContent:'center', 
        borderWidth:1,
        borderRadius:10,
        marginTop:30
    },
    registerButtonText:{
      fontSize:15,
      fontWeight:"bold",
      color:"black",
    },

    cancelButton:{
      width:200, 
      height:40, 
      alignItems:'center', 
      justifyContent:'center', 
      borderWidth:1, 
      borderRadius:10, 
      marginTop:30
    },
    KeyboardAvoidingView:{
      flex:1,
      alignContent:"center",
      alignItems:'center',
    }

});