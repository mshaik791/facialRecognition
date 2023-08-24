import React from 'react';


class Signin extends React.Component {


	constructor(props) {

		super(props);
		this.state = {

			signinEmail: '',
			signinPassword: ''

		}

	}



	onEmailChange = (event) => {

		this.setState({signInEmail: event.target.value})

	}
	onPasswordChange = (event) => {

		this.setState({signInPassword: event.target.value})

	}

	onSubmitSignIn = () => {

		fetch('http://localhost:3000/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({

				email: this.state.signInEmail,
				password: this.state.signInPassword

			})

		})
			.then(response => response.json())
			.then(user => {
				if (user.id){
					console.log("onsubmitsignin", user)
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				}

			})

	}



	render() {

		return  (
			<article class="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main class="pa4 black-80">
				  <div class="measure center">
				    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
				      <legend class="f1 fw6 ph0 mh0">Sign In</legend>
				      <div class="mt3">
				        <label class="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
					        class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="email" 
					        name="email-address"  
					        id="email-address" 
					        onChange={this.onEmailChange}/>
				      </div>
				      <div class="mv3">
				        <label class="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
					        class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="password" 
					        name="password"  
					        id="password" 
					        onChange={this.onPasswordChange}/>
				      </div>
				      <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
				    </fieldset>
				    <div class="">
				      <input 
				      	  onClick = {this.onSubmitSignIn}
					      class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					      type="submit" 
					      value="Sign in" 
					      />
				    </div>
				    <div class="lh-copy mt3">
				      <p onClick = {() => this.props.onRouteChange('register')} class="f6 link dim black db pointer">Register</p>
				      {/*<a href="#0" class="f6 link dim black db">Forgot your password?</a>*/}
				    </div>
				  </div>
				</main>
			</article>
			
		);

	}

	
}

export default Signin;