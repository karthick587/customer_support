import FormDialog from './common/dialogsform';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
	phoneno: yup.string().required('phone number is a required field'),
	email: yup.string().required(),
	address: yup.string().required()

});
export default function UserProfile({ userId }) {
	var [show, setShow] = useState('');
	const [user, setUser] = useState([]);
	useEffect(() => {
		fetch(`https://mindmadetech.in/api/customer/list/${userId}`)
			.then(res => res.json())
			.then(res => setUser(res));
	}, []);
	let router = useRouter();
	console.log(user);

	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(schema),
	});
	const { errors } = formState;

	function handleUpdate({ phoneno, email, address }) {

		Axios.put(`https://mindmadetech.in/api/customer/update/${userId}`, {
			id: userId,
			phonenumber: phoneno,
			email: email,
			address: address,

		}).then((response) => {

			setShow("update Successfully");
			Router.reload(window.location.pathname)

		});
	}

	return (
		<div className="container">
			{user.map((props) =>
				<div key={props.UserId} className="row gutters">
					<div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
						<div className="card h-100">
							<div className="card-body">
								<div className="row gutters ">
									<div className="profile-Update">
										<FormDialog
											className="btn2"
											dialogtitle="Update Profile"
											dialogbody={
												<div className="form dialog">
													<div className="form-toggle"></div>
													<div className="form-panel update one">
														<div className="form-header">
															<h1>Update profile</h1>
														</div>
														<div >
															<form className="form4">
																<div className="form-group">
																	<label className="label">Phone Number</label>
																	<input className="form-input" name="phoneno" type="text" {...register('phoneno')} />
																	<p className="me-2 text-danger">{errors.phoneno?.message}</p>
																</div>
																<div className="form-group">
																	<label className="label">Email</label>
																	<input className="form-input" name="email" type="text" {...register('email')} />
																	<p className="me-2 text-danger">{errors.email?.message}</p>
																</div>
																<div className="form-group">
																	<label className="label">Address</label>
																	<input className="form-input" name="address" type="text" {...register('address')} />
																	<p className="me-2 text-danger">{errors.address?.message}</p>
																</div>
																<button type="submit" onClick={handleSubmit(handleUpdate)} className="btn2 float-end">Update</button>
															</form>
														</div>
														<h4 className="alert1"></h4>
													</div>
												</div>
											}
										/>
									</div>

									<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

									</div>
								</div>
								<div className="row gutters">
									<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
										<h6 className="mb-2 text-primary">Personal Details</h6>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label htmlFor="fullName">Name</label>
											<h5 className="form-input" >{props.Name}</h5>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label htmlFor="eMail">Email</label>
											<h5 className="form-input">{props.Email}</h5>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label htmlFor="phone">Phonenumber</label>
											<h5 className="form-input" >{props.Phonenumber}</h5>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
										<div className="form-group">
											<label htmlFor="website">Address</label>
											<h5 className="form-input">{props.Address}</h5>
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