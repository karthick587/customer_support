import FormDialog from './dialogsform';
import Axios from 'axios';
import React,{useEffect,useState} from 'react';

import {useRouter} from 'next/router';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';

 const schema = yup.object().shape({
	phoneno : yup.string().required('phone number is a required field'),
	email : yup.string().required(),
	address : yup.string().required()
	
  });

export default function UserProfile({userId}) {
	const[user,setUser]=useState([]);
	useEffect(()=>{
		fetch(`http://localhost:3001/users/${userId}`)
		   .then(res => res.json())
		   .then(res => setUser(res));
   },[]);

	let router = useRouter();
	console.log(user);

	const {register,handleSubmit, formState } = useForm({
			resolver : yupResolver(schema),
	});
	const { errors } = formState;

	function handleUpdate({phoneno,email,address}){
		
		Axios.put(`http://localhost:3001/users/${userId}`,{
			id:userId,
			phonenumber : phoneno,
			email : email,
			address : address,
			
		}).then((response)=>console.log(response));
	}
	
 return (
	<div className="container">
		{user.map((props)=>
		<div key={props.UserId} className="row gutters">
			<div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
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
																<label className="col">Email</label>
																<input className="col-sm-3" name="email"  type="text" {...register('email')} />
																<p className="me-2 text-danger">{errors.email?.message}</p><br />
															</div>
															<div className="form-group">
																<label className="col">Address</label>
																<input className="col-sm-3" name="address"  type="text" {...register('address')} />
																<p className="me-2 text-danger">{errors.address?.message}</p><br/>
															</div>
															<button type="submit" onClick={handleSubmit(handleUpdate)} className="button float-end">Update</button>
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
									<label htmlFor="fullName">Name</label>
									<h5  className="form-control" >{props.Name}</h5>
								</div>
							</div>
							<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
								<div className="form-group">
									<label htmlFor="eMail">Email</label>
									<h5  className="form-control">{props.Email}</h5>
								</div>
							</div>
							<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
								<div className="form-group">
									<label htmlFor="phone">Phonenumber</label>
									<h5  className="form-control" >{props.Phonenumber}</h5>
								</div>
							</div>
							<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
								<div className="form-group">
									<label htmlFor="website">Address</label>
									<h5  className="form-control">{props.Address}</h5>
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