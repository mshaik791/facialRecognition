import React from 'react';
import { Tilt } from 'react-tilt'
import './ImageLinkForm.css';



// const defaultOptions = {
// 	reverse:        false,  // reverse the tilt direction
// 	max:            25,     // max tilt rotation (degrees)
// 	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
// 	scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
// 	speed:          1000,   // Speed of the enter/exit transition
// 	transition:     true,   // Set a transition on enter/exit.
// 	axis:           null,   // What axis should be disabled. Can be X or Y.
// 	reset:          true,    // If the tilt effect has to be reset on exit.
// 	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
// }


const ImageLinkForm = ({onInputChange, onButtonSubmit})=> {

	return  (
		<div>

			{/*<div>
				<Tilt className="Tilt center br5 shadow-2" options={defaultOptions} style={{ height: 30, width: 1000 }}>
	      			
	    		</Tilt>
			</div>
*/}
			<p className='white f4'>
				{'This Magic Brain will detect faces in your pictures. Give it a try'}
			</p>

			<div className="center">
				<div className='form center pa4 br2 shadow-5'>
					<input className='f4 pa2 w-45 center' type='tex' onChange ={onInputChange}/>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
				</div>
			</div>
				
				

		</div>

	);
}

export default ImageLinkForm;