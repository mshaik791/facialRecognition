import React, { Component } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg';
import Navigation from './Components/Navigation/Navigation'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Signin from './Components/Signin/Signin'
import Register from './Components/Register/Register'
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import "./App.css";



///////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
//////////////////////////////////////////////////////////////////////////////////////////////////

const returnClarifaiReqOptions = (imageUrl) => {

  const PAT = '4f7d0da0bca240efb07ae6b755858b5e';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
  const USER_ID = 'mshaik791';       
  const APP_ID = 'face-detection';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw


    
  };


  return requestOptions;




}

// Your PAT (Personal Access Token) can be found in the portal under Authentification

///////////////////////////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
///////////////////////////////////////////////////////////////////////////////////



// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id


const initialState = {
  input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }

}

class App extends Component {
 
 constructor(){

  super();
  this.state = initialState;

 }


loadUser = (data) =>  {

  this.setState(
    {
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined

    }
  })
  console.log("loadUser", data)

}

 componentDidMount() {


    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(console.log)


 }


 // calculateFaceLocation = (data) => {

 //    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
 //    console.log(clarifaiFace);
 //    const image = document.getElementById('inputImage');
 //    const width = Number(image.width)
 //    console.log("width", width);
 //    const height = Number(image.height)
 //    console.log("height", height);

 //     const leftCol = clarifaiFace.left_col * width;
 //     console.log(leftCol);
 //     const topRow = clarifaiFace.top_row * height;
 //     const rightCol = width - (clarifaiFace.right_col * width);
 //     const  bottomRow = height - (clarifaiFace.bottom_row * height);
 //    return {
 //      leftCol: clarifaiFace.left_col * width,
 //      topRow: clarifaiFace.top_row * height,
 //      rightCol: width - (clarifaiFace.right_col * width),
 //      bottomRow: height - (clarifaiFace.bottom_row * height)

 //    }



 // }

 calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

 displayFaceBox = (box) => {

    //console.log(box.topRow);

    this.setState({box: box});

 }

 onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})

    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiReqOptions(this.state.input))
    .then(response => response.json())
    // .then(result => console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
    .then(response =>  {
      if(response){
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })

        })
        .then(response => response.json())
        .then(count => {

          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log);
        
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(error => console.log('error', error));

    //console.log(result.outputs[0].data.regions[0].region_info.bounding_box)

 }

 onInputChange = (event) => {

    this.setState({input: event.target.value });

 }

 onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


  render() {
    

    return (

      <div className="App">

          <ParticlesBg type="cobweb" bg={true} />
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>
          : (
             this.state.route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }

      </div>
    );

  }
}

export default App;
