import FormDialog from './dialogsform';
import Axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';

 const schema = yup.object().shape({
	phoneno : yup.string().required('phone number is a required field'),
	url : yup.string().required(),
	address : yup.string().required(),
	about : yup.string().required(),
  });

export default function UserProfile({user,userId}) {

	const {register,handleSubmit, formState } = useForm({
			resolver : yupResolver(schema),
	});
	const { errors } = formState;

	function handleUpdate({phoneno,url,address,about}){

		Axios.put(`http://localhost:3001/userlogin/${userId}`,{
			phoneno : phoneno,
			url : url,
			address : address,
			about : about
		}).then((response)=>console.log(response));
	}
	
 return (
	<div className="container">
		{user.map((props)=>
		<div key={props.id} className="row gutters">
			
			<div>
				<div className="card h-100">
					<div className="card-body">
						<div className="row gutters ">
							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
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
																<input className="col-sm-3" name="phoneno" type="text" {...register('phoneno')} />
																<p className="me-2 text-danger">{errors.phoneno?.message}</p><br />											
															</div>
															<div className="form-group">
																<label className="col">Website URL</label>
																<input className="col-sm-3" name="url"  type="text" {...register('url')} />
																<p className="me-2 text-danger">{errors.url?.message}</p><br />
															</div>
															<div className="form-group">
																<label className="col">office address</label>
																<input className="col-sm-3" name="address"  type="text" {...register('address')} />
																<p className="me-2 text-danger">{errors.address?.message}</p><br />
															</div>
															<div className="form-group">
																<label className="col">About You</label>
																<textarea className="col-sm-3" name="about"   type="text"  {...register('about')} />
																<p className="me-2 text-danger">{errors.about?.message}</p><br />
															</div>
															<button type="submit" onClick={handleSubmit(handleUpdate)} className="button float-end"> <a className="nav-link text-white">Submit</a></button>
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
						<div className="row gutters">
							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
								<h6 className="mb-2 text-primary">Personal Details</h6>
							</div>
							<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
								<div className="form-group">
									<label htmlFor="fullName">Full Name</label>
									<h5  className="form-control" >{props.firstname}</h5>
								</div>
							</div>
							<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
								<div className="form-group">
									<label htmlFor="eMail">Email</label>
									<h5  className="form-control">{props.email}</h5>
								</div>
							</div>
							<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
								<div className="form-group">
									<label htmlFor="phone">Phone</label>
									<h5  className="form-control" >{props.phoneno}</h5>
								</div>
							</div>
							<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
								<div className="form-group">
									<label htmlFor="website">Website URL</label>
									<h5  className="form-control">{props.url}</h5>
								</div>
							</div>
						</div>
						<div className="row gutters">
							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
								<h6 className="mt-3 mb-2 text-primary">Address</h6>
							</div>
							<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
								<div className="form-group">
									<h5 className="form-control" id="Street">{props.address}</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		)}
	</div>
);
}
