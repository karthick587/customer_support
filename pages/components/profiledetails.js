export  default Profiledetails ;
import FormDialog from './dialogsform';
import Axios from 'axios';
import React,{ useState } from 'react';
import {useRouter} from 'next/router';

function Profiledetails(props) {
	let router = useRouter();
		console.log(props.id);
		var[phoneno,setPhoneNo] = useState();
		var[url,setUrl] = useState('');
		var[address,setAddress] = useState('');
		var[about,setAbout] = useState('');

	function handleUpdate(){
		
		Axios.put(`http://localhost:3001/adminlogin/${props.id}`,{
		phoneno : phoneno,
		url : url,
		address : address,
		about : about
		}).then((response)=>console.log(response)
		(handleClose = () => {
			setOpen(false);
		  })
		)
	}

	
    return (

<div class="container">
<div class="row gutters">
<div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">

</div>
<div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
<div class="card h-100">
	<div class="card-body">
    <div class="row gutters ">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div className="float-end">
					
					<FormDialog
					dialogtitle="Update Profile"
					dialogbody={
						<div className="form dialog">
						<div className="form-toggle"></div>
						<div className="form-panel update one">
						  <div className="form-header">
							<h1>Update profile</h1>
						  </div>
						  <div className="form-content">
							<form> 
							  <div className="form-group">
							  <label className="col">Phone Number</label>
											  <input className="col-sm-3" name="phone number" type="text" value={phoneno} onChange={(e)=>setPhoneNo(e.target.value)} />
											 
							  </div>
							  <div className="form-group">
							  <label className="col">Website URL</label>
											  <input className="col-sm-3" name="website url"  type="text"  value={url} onChange={(e)=>setUrl(e.target.value)} />
							  </div>
							  <div className="form-group">
							  <label className="col">office address</label>
											  <input className="col-sm-3" name="office address"  type="text"  value={address} onChange={(e)=>setAddress(e.target.value)} />
							  </div>
							  <div className="form-group">
							  <label className="col">About You</label>
											  <textarea className="col-sm-3" name="about you"   type="text"  value={about} onChange={(e)=>setAbout(e.target.value)} />
							  </div>
							
                               <button type="submit" onClick={handleUpdate} className="button float-end"> <a className="nav-link text-white">Submit</a></button>
      
     
        
     
							
							
							</form>
						  </div>
						  <h4 className="alert1"></h4>
						</div>
					   
					  </div>
					}
					 />
				</div>
			</div>
		</div>
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h6 class="mb-2 text-primary">Personal Details</h6>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="fullName">Full Name</label>
					<h5  class="form-control" >{props.profilename}</h5>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="eMail">Email</label>
					<h5  class="form-control">{props.profileemail}</h5>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="phone">Phone</label>
					<h5  class="form-control" >{props.profilenumber}</h5>
				</div>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<label for="website">Website URL</label>
					<h5  class="form-control">{props.profileweburl}</h5>
				</div>
			</div>
		</div>
		<div class="row gutters">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h6 class="mt-3 mb-2 text-primary">Address</h6>
			</div>
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div class="form-group">
					<h5 class="form-control" id="Street">{props.profileaddress}</h5>
				</div>
			</div>
			
		
	
	</div>
</div>
</div>
</div>
</div>
</div>
);
}
